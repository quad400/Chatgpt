import Onboarding from "@/components/Onboarding";
import { auth } from "@/config/firebaseConfig";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

export default function RootLayout() {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        router.navigate("/(main)")
      } else {
        router.navigate("/")
      }
    })
  }, [])

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="(main)/index" options={{
        headerShown: false
      }} />
      <Stack.Screen name="(auth)/index" options={{
        headerShown: false,
        presentation: "modal"
      }} />
    </Stack>
  )
}
