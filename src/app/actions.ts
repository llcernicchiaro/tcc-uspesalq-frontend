"use server";

import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:lopescernicchiaro@gmail.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: webpush.PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = {
    endpoint: sub.endpoint,
    expirationTime: sub.expirationTime,
    keys: {
      p256dh: sub.getKey("p256dh")
        ? Buffer.from(sub.getKey("p256dh")!).toString("base64")
        : "",
      auth: sub.getKey("auth")
        ? Buffer.from(sub.getKey("auth")!).toString("base64")
        : "",
    },
  };
  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/web-app-manifest-192x192.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
