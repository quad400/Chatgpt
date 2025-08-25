import Onboarding from "@/components/Onboarding";
import { router, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { getStoredUser, saveUserToStorage } from "@/libs/auth";
import { ActivityIndicator, View } from "react-native";
import Colors from "@/constants/Colors";


export default function RootLayout() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null);

  const router = useRouter()
  const segments = useSegments()

  // useEffect(()=>{
  //   onAuthStateChanged(auth, async (user) => {
  //     await saveUserToStorage(user);
  // });
  // },[auth])

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true)
      const storedUser = await getStoredUser().finally(()=>{
      
        setLoading(false)
      });
      if (storedUser) {
        setUser(storedUser);
      }
    };

    checkUser();
  }, [setUser]);

  useEffect(()=>{
    if(user){
      router.replace("/chat/new")
    }else{
      router.replace("/")
    }

  },[user])

  if(loading && !user){
    return (
      <View style={{
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
      }}>
          <ActivityIndicator color={Colors.dark} />
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <Stack >
       <Stack.Screen name="(drawer)" options={{
          headerShown: false
        }} />
        <Stack.Screen name="index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(auth)/auth" options={{
          headerShown: false,
          presentation: "modal"
        }} />
      </Stack></GestureHandlerRootView>
  )
}
