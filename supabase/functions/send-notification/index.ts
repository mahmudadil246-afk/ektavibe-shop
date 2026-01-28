import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NotificationRequest {
  user_id: string;
  type: "order" | "promo" | "security" | "wishlist";
  title: string;
  message: string;
  metadata?: Record<string, unknown>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body: NotificationRequest | NotificationRequest[] = await req.json();
    const notifications = Array.isArray(body) ? body : [body];

    console.log(`Processing ${notifications.length} notification(s)`);

    // Validate notifications
    for (const notification of notifications) {
      if (!notification.user_id || !notification.type || !notification.title || !notification.message) {
        return new Response(
          JSON.stringify({ error: "Missing required fields: user_id, type, title, message" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      const validTypes = ["order", "promo", "security", "wishlist"];
      if (!validTypes.includes(notification.type)) {
        return new Response(
          JSON.stringify({ error: `Invalid type. Must be one of: ${validTypes.join(", ")}` }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
    }

    // Insert notifications
    const insertData = notifications.map((n) => ({
      user_id: n.user_id,
      type: n.type,
      title: n.title,
      message: n.message,
      metadata: n.metadata || {},
      is_read: false,
    }));

    const { data, error } = await supabase
      .from("user_notifications")
      .insert(insertData)
      .select();

    if (error) {
      console.error("Error inserting notifications:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Successfully created ${data.length} notification(s)`);

    return new Response(
      JSON.stringify({ success: true, notifications: data }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error in send-notification function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
