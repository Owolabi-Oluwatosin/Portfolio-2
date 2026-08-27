"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import NotificationFlash, { type FlashVariant } from "./NotificationFlash";

type Notification = { variant: FlashVariant; message: string };

interface NotificationContextValue {
  showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return ctx;
}

export default function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNotification(null);
  }, []);

  const showNotification = useCallback((next: Notification) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setNotification(next);
    timeoutRef.current = setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {notification && (
        <div className="fixed inset-x-0 top-0 z-[60]">
          <NotificationFlash
            variant={notification.variant}
            message={notification.message}
            onDismiss={dismiss}
          />
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
}
