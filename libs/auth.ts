import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "@/config/firebaseConfig";


export const saveUserToStorage = async (user: User | null) => {
    // if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
    // } else {
    //     await AsyncStorage.removeItem("user");
    // }
};

// Listen for auth state changes


const getStoredUser = async () => {
    const userJson = await AsyncStorage.getItem("user");
    console.log(userJson)
    return userJson ? JSON.parse(userJson) : null;
};

export { auth, getStoredUser };