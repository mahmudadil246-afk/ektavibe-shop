import { useState, useEffect, useCallback } from 'react';

export type PushPermissionState = 'default' | 'granted' | 'denied' | 'unsupported';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<PushPermissionState>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return;
    }
    setPermission(Notification.permission as PushPermissionState);
    
    // Check if already subscribed (mock - in real app would check service worker)
    const subscribed = localStorage.getItem('push_subscribed') === 'true';
    setIsSubscribed(subscribed && Notification.permission === 'granted');
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result as PushPermissionState);
      
      if (result === 'granted') {
        setIsSubscribed(true);
        localStorage.setItem('push_subscribed', 'true');
        
        // Show a test notification
        new Notification('Notifications Enabled! 🔔', {
          body: 'You\'ll now receive updates about orders, price drops, and more.',
          icon: '/favicon.ico',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  const unsubscribe = useCallback(() => {
    setIsSubscribed(false);
    localStorage.removeItem('push_subscribed');
  }, []);

  const sendTestNotification = useCallback((title: string, body: string) => {
    if (permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
      });
    }
  }, [permission]);

  return {
    permission,
    isSubscribed,
    requestPermission,
    unsubscribe,
    sendTestNotification,
    isSupported: permission !== 'unsupported',
  };
};
