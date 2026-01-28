import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface NotificationPreference {
  id: string;
  user_id: string;
  preference_key: string;
  email_enabled: boolean;
  push_enabled: boolean;
  frequency: 'instant' | 'daily' | 'weekly' | 'never';
  created_at: string;
  updated_at: string;
}

export interface PreferenceConfig {
  key: string;
  category: string;
  title: string;
  description: string;
  icon: string;
  defaultEmailEnabled: boolean;
  defaultFrequency: 'instant' | 'daily' | 'weekly' | 'never';
}

export const DEFAULT_PREFERENCES: PreferenceConfig[] = [
  {
    key: 'order_updates',
    category: 'orders',
    title: 'Order Updates',
    description: 'Get notified about order confirmations, shipping updates, and delivery status',
    icon: 'Package',
    defaultEmailEnabled: true,
    defaultFrequency: 'instant',
  },
  {
    key: 'price_drops',
    category: 'wishlist',
    title: 'Price Drop Alerts',
    description: 'Receive alerts when items in your wishlist go on sale',
    icon: 'TrendingDown',
    defaultEmailEnabled: true,
    defaultFrequency: 'instant',
  },
  {
    key: 'back_in_stock',
    category: 'wishlist',
    title: 'Back in Stock',
    description: 'Get notified when out-of-stock wishlist items become available',
    icon: 'Bell',
    defaultEmailEnabled: true,
    defaultFrequency: 'instant',
  },
  {
    key: 'security_alerts',
    category: 'security',
    title: 'Security Alerts',
    description: 'Important alerts about new logins, password changes, and suspicious activity',
    icon: 'Shield',
    defaultEmailEnabled: true,
    defaultFrequency: 'instant',
  },
  {
    key: 'promotions',
    category: 'marketing',
    title: 'Promotions & Offers',
    description: 'Exclusive deals, seasonal sales, and special offers',
    icon: 'Mail',
    defaultEmailEnabled: false,
    defaultFrequency: 'weekly',
  },
];

export const useNotificationPreferences = () => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPreferences = useCallback(async () => {
    if (!user) {
      setPreferences([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setPreferences((data as NotificationPreference[]) || []);
    } catch (error) {
      console.error('Error fetching notification preferences:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const getPreference = (key: string): NotificationPreference | undefined => {
    return preferences.find((p) => p.preference_key === key);
  };

  const getPreferenceValue = (key: string): { emailEnabled: boolean; pushEnabled: boolean; frequency: string } => {
    const pref = getPreference(key);
    const defaultConfig = DEFAULT_PREFERENCES.find((p) => p.key === key);
    
    if (pref) {
      return {
        emailEnabled: pref.email_enabled,
        pushEnabled: pref.push_enabled,
        frequency: pref.frequency,
      };
    }
    
    return {
      emailEnabled: defaultConfig?.defaultEmailEnabled ?? true,
      pushEnabled: false,
      frequency: defaultConfig?.defaultFrequency ?? 'instant',
    };
  };

  const updatePreference = async (
    key: string,
    updates: Partial<{ email_enabled: boolean; push_enabled: boolean; frequency: string }>
  ) => {
    if (!user) return;

    try {
      const existingPref = getPreference(key);

      if (existingPref) {
        const { error } = await supabase
          .from('notification_preferences')
          .update(updates)
          .eq('id', existingPref.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setPreferences((prev) =>
          prev.map((p) =>
            p.preference_key === key ? { ...p, ...updates } as NotificationPreference : p
          )
        );
      } else {
        const defaultConfig = DEFAULT_PREFERENCES.find((p) => p.key === key);
        const freq = (updates.frequency ?? defaultConfig?.defaultFrequency ?? 'instant') as NotificationPreference['frequency'];
        const newPref = {
          user_id: user.id,
          preference_key: key,
          email_enabled: updates.email_enabled ?? defaultConfig?.defaultEmailEnabled ?? true,
          push_enabled: updates.push_enabled ?? false,
          frequency: freq,
        };

        const { data, error } = await supabase
          .from('notification_preferences')
          .insert(newPref)
          .select()
          .single();

        if (error) throw error;
        setPreferences((prev) => [...prev, data as NotificationPreference]);
      }
    } catch (error) {
      console.error('Error updating notification preference:', error);
      throw error;
    }
  };

  const saveAllPreferences = async (
    updates: { key: string; emailEnabled: boolean; pushEnabled: boolean; frequency: string }[]
  ) => {
    if (!user) return;

    setSaving(true);
    try {
      for (const update of updates) {
        await updatePreference(update.key, {
          email_enabled: update.emailEnabled,
          push_enabled: update.pushEnabled,
          frequency: update.frequency,
        });
      }
      toast.success('Notification preferences saved!');
    } catch (error) {
      toast.error('Failed to save preferences');
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const enableAllEmail = async () => {
    if (!user) return;

    setSaving(true);
    try {
      for (const config of DEFAULT_PREFERENCES) {
        await updatePreference(config.key, { email_enabled: true });
      }
      toast.success('All email notifications enabled');
    } catch (error) {
      toast.error('Failed to enable notifications');
    } finally {
      setSaving(false);
    }
  };

  const disableAllEmail = async () => {
    if (!user) return;

    setSaving(true);
    try {
      for (const config of DEFAULT_PREFERENCES) {
        await updatePreference(config.key, { email_enabled: false });
      }
      toast.success('All email notifications disabled');
    } catch (error) {
      toast.error('Failed to disable notifications');
    } finally {
      setSaving(false);
    }
  };

  return {
    preferences,
    loading,
    saving,
    getPreferenceValue,
    updatePreference,
    saveAllPreferences,
    enableAllEmail,
    disableAllEmail,
    refetch: fetchPreferences,
  };
};
