import Onboarding from "@/components/Onboarding";
import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function RootLayout() {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const router = useRouter()
  const segments = useSegments()

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {

    if (initializing) return;

    const isAuthGroup = segments[0] === "(auth)";

    if (user) {
      router.replace("/(drawer)/chat/new")
    } else {
      router.replace("/")
    }
  }, [user, initializing])

  if (initializing) return null;


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Stack>
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(drawer)" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(auth)/index" options={{
          headerShown: false,
          presentation: "modal"
        }} />
      </Stack></GestureHandlerRootView>
  )
}
