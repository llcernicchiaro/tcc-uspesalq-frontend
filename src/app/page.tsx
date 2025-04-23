import { redirect } from "next/navigation";
import Image from "next/image";

// import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";
import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";

// function urlBase64ToUint8Array(base64String: string) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// function PushNotificationManager() {
//   const [isSupported, setIsSupported] = useState(false);
//   const [subscription, setSubscription] = useState<PushSubscription | null>(
//     null
//   );
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if ("serviceWorker" in navigator && "PushManager" in window) {
//       setIsSupported(true);
//       registerServiceWorker();
//     }
//   }, []);

//   async function registerServiceWorker() {
//     const registration = await navigator.serviceWorker.register("/sw.js", {
//       scope: "/",
//       updateViaCache: "none",
//     });
//     const sub = await registration.pushManager.getSubscription();
//     setSubscription(sub);
//   }

//   async function subscribeToPush() {
//     const registration = await navigator.serviceWorker.ready;
//     const sub = await registration.pushManager.subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array(
//         process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
//       ),
//     });
//     setSubscription(sub);
//     const serializedSub = JSON.parse(JSON.stringify(sub));
//     await subscribeUser(serializedSub);
//   }

//   async function unsubscribeFromPush() {
//     await subscription?.unsubscribe();
//     setSubscription(null);
//     await unsubscribeUser();
//   }

//   async function sendTestNotification() {
//     if (subscription) {
//       await sendNotification(message);
//       setMessage("");
//     }
//   }

//   if (!isSupported) {
//     return <p>Push notifications are not supported in this browser.</p>;
//   }

//   return (
//     <div>
//       <h3>Push Notifications</h3>
//       {subscription ? (
//         <>
//           <p>You are subscribed to push notifications.</p>
//           <button onClick={unsubscribeFromPush}>Unsubscribe</button>
//           <input
//             type="text"
//             placeholder="Enter notification message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={sendTestNotification}>Send Test</button>
//         </>
//       ) : (
//         <>
//           <p>You are not subscribed to push notifications.</p>
//           <button onClick={subscribeToPush}>Subscribe</button>
//         </>
//       )}
//     </div>
//   );
// }

export default async function LandingPage() {
  const session = await auth();

  if (session?.user) redirect("/dashboard");

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center px-4">
      {/* <PushNotificationManager /> */}
      <Image
        src="./icon0.svg"
        alt="Stride"
        width={240}
        height={240}
        className="mb-6"
      />
      <h1 className="text-primary text-4xl font-bold mb-2">STRIDE</h1>
      <p className="mb-6">Organize seus treinos em grupo com facilidade</p>
      <LoginButton />
    </main>
  );
}
