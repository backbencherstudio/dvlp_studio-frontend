"use client";

import { getSocket } from "@/hooks/useSocket";
import { useEffect } from "react";

export default function NotificationListener({ userId }: any) {
  useEffect(() => {
    if (!userId) return; // safeguard

    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      // Register ONLY after connected
      socket.emit("register", userId);
      console.log("Registered user:", userId);
    });

    // Listen for notifications
    const handleNotification = (message: any) => {
      console.log("🔔 Notification received:", message);

      // If backend sends object — show message.title & message.message
      if (typeof message === "object") {
        alert(`🔔 ${message.title}\n${message.message}`);
      } else {
        alert("🔔 " + message);
      }
    };

    socket.on("notification", handleNotification);

    // Cleanup
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [userId]);

  return null;
}
