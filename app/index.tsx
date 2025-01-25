import Onboarding from "@/components/Onboarding";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Style";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {

  const { bottom } = useSafeAreaInsets()

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Onboarding />
      <View style={[style.container, { paddingBottom: bottom }]}>
        <View style={{
          paddingBottom: 20,
          gap: 14
        }}>

          <Link href="/">
            <TouchableOpacity style={[defaultStyles.btn, style.btn, style.google]}>
              <AntDesign style={{
                marginRight: 6
              }} name="google" size={24} color="black" />
              <Text style={[style.text, { color: Colors.dark }]}>Continue with Google</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/(auth)?type=signup" style={[defaultStyles.btn, style.btn, { backgroundColor: Colors.dark }]} asChild>
            <TouchableOpacity >
              <Text style={[style.text]}>Sign up</Text>
            </TouchableOpacity>
          </Link>
          <View style={{
            width: "100%",
            height: 1,
            backgroundColor: Colors.greyLight
          }} />
          <Link href="/(auth)?type=login" style={[defaultStyles.btn, style.btn, { backgroundColor: Colors.dark, borderWidth: 1, borderColor: Colors.greyLight }]} asChild>
            <TouchableOpacity >
              <Text style={[style.text]}>Log in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 0,
    width: "100%",
    backgroundColor: Colors.grey,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    gap: 14
  },
  btn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  google: {
    backgroundColor: Colors.light,
    color: Colors.dark
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light
  }
})
