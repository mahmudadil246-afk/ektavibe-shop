import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Smartphone, 
  Monitor, 
  LogOut, 
  AlertTriangle,
  Check,
  X,
  Key,
  Mail,
  Globe,
  Clock,
  Trash2
} from "lucide-react";
import { mockLoginHistory, LoginHistory } from "@/data/mockAccountData";
import { Badge } from "@/components/ui/badge";
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

interface AccountSecurityProps {
  onLogout: () => void;
}

const AccountSecurity = ({ onLogout }: AccountSecurityProps) => {
  const [sessions, setSessions] = useState<LoginHistory[]>(mockLoginHistory);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [securityAlerts, setSecurityAlerts] = useState(true);

  const handleLogoutSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    toast.success("Session logged out successfully");
  };

  const handleLogoutAllDevices = () => {
    setSessions(sessions.filter(s => s.isCurrent));
    toast.success("Logged out from all other devices");
  };

  const handleEnableTwoFactor = () => {
    if (!twoFactorEnabled) {
      toast.info("Two-factor authentication setup coming soon!");
    }
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return Smartphone;
    }
    return Monitor;
  };

  const handleDeleteAccount = () => {
    toast.success("Account deletion request submitted");
    onLogout();
  };

  return (
    <div className="space-y-8">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg flex items-center gap-2">
          <Key className="w-5 h-5" />
          Change Password
        </h3>
        
        <div className="bg-secondary p-6 rounded-lg space-y-4">
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
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              <li>At least 8 characters long</li>
              <li>Contains uppercase and lowercase letters</li>
              <li>Contains at least one number</li>
              <li>Contains at least one special character</li>
            </ul>
          </div>
          <button className="btn-primary">Update Password</button>
        </div>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Two-Factor Authentication
        </h3>
        
        <div className="bg-secondary p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable 2FA</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleEnableTwoFactor}
            />
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-4 h-4" />
                <span className="text-sm">Two-factor authentication is enabled</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Login History */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Login History
          </h3>
          {sessions.length > 1 && (
            <button
              onClick={handleLogoutAllDevices}
              className="text-sm text-destructive hover:underline"
            >
              Logout All Other Devices
            </button>
          )}
        </div>
        
        <div className="space-y-3">
          {sessions.map((session, index) => {
            const DeviceIcon = getDeviceIcon(session.device);

            return (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  session.isCurrent 
                    ? 'bg-accent/10 border border-accent/30' 
                    : 'bg-secondary'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    session.isCurrent ? 'bg-accent/20' : 'bg-muted'
                  }`}>
                    <DeviceIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{session.device}</span>
                      {session.isCurrent && (
                        <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {session.browser} • {session.location}
                    </p>
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                  </div>
                </div>
                {!session.isCurrent && (
                  <button
                    onClick={() => handleLogoutSession(session.id)}
                    className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                    title="Logout this device"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Email Change Verification */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Security
        </h3>
        
        <div className="bg-secondary p-6 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Verification Required</p>
              <p className="text-sm text-muted-foreground">
                Verify identity before changing email address
              </p>
            </div>
            <span className="flex items-center gap-1 text-sm text-green-600">
              <Check className="w-4 h-4" /> Enabled
            </span>
          </div>
        </div>
      </motion.div>

      {/* Security Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Security Alerts
        </h3>
        
        <div className="bg-secondary p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Login Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified when someone logs into your account from a new device
              </p>
            </div>
            <Switch
              checked={securityAlerts}
              onCheckedChange={setSecurityAlerts}
            />
          </div>
        </div>
      </motion.div>

      {/* Delete Account */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="pt-6 border-t border-border"
      >
        <h3 className="font-serif text-lg flex items-center gap-2 text-destructive mb-4">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h3>
        
        <div className="bg-destructive/5 border border-destructive/20 p-6 rounded-lg">
          <p className="font-medium text-destructive">Delete Account</p>
          <p className="text-sm text-muted-foreground mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="btn-outline text-destructive border-destructive hover:bg-destructive/10">
                Delete My Account
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
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSecurity;
