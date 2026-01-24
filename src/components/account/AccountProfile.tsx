import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, User, Calendar, Shield, Trash2, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AccountProfileProps {
  userName: string;
  onLogout: () => void;
}

const AccountProfile = ({ userName, onLogout }: AccountProfileProps) => {
  const [profile, setProfile] = useState({
    firstName: 'Rahim',
    lastName: 'Khan',
    email: 'rahim@example.com',
    phone: '+880 1712-345678',
    gender: 'male',
    dateOfBirth: '1990-05-15',
    emailVerified: true,
    phoneVerified: false
  });

  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsNotifications: false
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleVerifyPhone = () => {
    toast.info("Verification code sent to your phone");
  };

  const handleDeleteAccount = () => {
    toast.success("Account deletion request submitted");
    onLogout();
  };

  return (
    <div className="space-y-8">
      {/* Profile Photo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6"
      >
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-primary/20">
            <AvatarImage src="/placeholder.svg" alt={userName} />
            <AvatarFallback className="text-2xl font-serif">{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <button className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h2 className="font-serif text-xl">{profile.firstName} {profile.lastName}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <p className="text-xs text-muted-foreground mt-1">Member since January 2024</p>
        </div>
      </motion.div>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <h3 className="font-serif text-lg border-b border-border pb-2">Personal Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              <User className="w-4 h-4 inline mr-2" />
              First Name
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={profile.email}
              readOnly
              className="flex-1 bg-muted border border-border px-4 py-3 text-sm text-muted-foreground rounded-md"
            />
            {profile.emailVerified ? (
              <span className="flex items-center gap-1 px-3 text-sm text-green-600">
                <Check className="w-4 h-4" /> Verified
              </span>
            ) : (
              <button className="px-4 py-2 text-sm text-accent hover:underline">
                Verify
              </button>
            )}
          </div>
          <button className="text-xs text-accent hover:underline mt-2">
            Request email change
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Phone Number
          </label>
          <div className="flex gap-2">
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="flex-1 bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            />
            {profile.phoneVerified ? (
              <span className="flex items-center gap-1 px-3 text-sm text-green-600">
                <Check className="w-4 h-4" /> Verified
              </span>
            ) : (
              <button 
                onClick={handleVerifyPhone}
                className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md"
              >
                Verify
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Gender (Optional)</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date of Birth (Optional)
            </label>
            <input
              type="date"
              value={profile.dateOfBirth}
              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            />
          </div>
        </div>

        <button onClick={handleSaveProfile} className="btn-primary">
          Save Changes
        </button>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg border-b border-border pb-2">
          <Shield className="w-4 h-4 inline mr-2" />
          Change Password
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
              />
            </div>
          </div>
          <button className="btn-outline">Update Password</button>
        </div>
      </motion.div>

      {/* Communication Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg border-b border-border pb-2">Communication Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Order Updates</p>
              <p className="text-xs text-muted-foreground">Receive notifications about your orders</p>
            </div>
            <Switch
              checked={preferences.orderUpdates}
              onCheckedChange={(checked) => setPreferences({ ...preferences, orderUpdates: checked })}
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Promotions & Offers</p>
              <p className="text-xs text-muted-foreground">Get exclusive deals and discounts</p>
            </div>
            <Switch
              checked={preferences.promotions}
              onCheckedChange={(checked) => setPreferences({ ...preferences, promotions: checked })}
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">Newsletter</p>
              <p className="text-xs text-muted-foreground">Weekly fashion tips and new arrivals</p>
            </div>
            <Switch
              checked={preferences.newsletter}
              onCheckedChange={(checked) => setPreferences({ ...preferences, newsletter: checked })}
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-sm">SMS Notifications</p>
              <p className="text-xs text-muted-foreground">Receive updates via SMS</p>
            </div>
            <Switch
              checked={preferences.smsNotifications}
              onCheckedChange={(checked) => setPreferences({ ...preferences, smsNotifications: checked })}
            />
          </div>
        </div>
      </motion.div>

      {/* Delete Account */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-6 border-t border-border"
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="flex items-center gap-2 text-sm text-destructive hover:underline">
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove all your data from our servers including orders, wishlist, and addresses.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteAccount}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>
    </div>
  );
};

export default AccountProfile;
