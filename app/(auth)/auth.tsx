import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image, ImageProps, StyleSheet, TextInput, Platform, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router/build/hooks'
import { defaultStyles } from '@/constants/Style'
import { AntDesign } from '@expo/vector-icons'
import { Logo } from '@/constants/Image'
import { Controller, useForm } from 'react-hook-form'
import { authSchema } from '@/libs/schema/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import Colors from '@/constants/Colors'
import { authType } from '@/libs/types/auth'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { saveUserToStorage } from '@/libs/auth'


const index = () => {
    const { type } = useLocalSearchParams<{ type: string }>()
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const auth = getAuth();

    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = (data: authType) => {
        setLoading(true)

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                console.log(userCredential.user)
saveUserToStorage(userCredential.user);
                router.replace("/chat/new")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === "auth/email-already-in-use") {
                    Alert.alert("Authentication Error", "Invalid Login Details")
                }
                if (errorCode === "auth/invalid-email") {
                    Alert.alert("Authentication Error", "Invalid Login Details")
                }
                if (errorCode === "auth/network-request-failed") {
                    Alert.alert("Internet Error", "No Internet Connection")
                }
            }).finally(() => {
                setLoading(false)
            })
    }

    const signUp = (data: authType) => {
        setLoading(true)

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                router.replace("/(main)/(drawer)/new")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === "auth/email-already-in-use") {
                    Alert.alert("Authentication Error", "Invalid Login Details")
                }
                if (errorCode === "auth/invalid-email") {
                    Alert.alert("Authentication Error", "Invalid Login Details")
                }
                if (errorCode === "auth/network-request-failed") {
                    Alert.alert("Internet Error", "No Internet Connection")
                }
            }).finally(() => {
                setLoading(false)
            })

    }

    const onSubmit = (data: authType) => {
        if (type === "login") {
            login(data)
        } else {
            signUp(data)
        }
    }
    // console.log(isSubmitting)
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
            flex: 1
        }}>
            <View style={{
                width: "100%",
                height: "100%",
                paddingHorizontal: 16,
                justifyContent: "center",
                alignItems: "center"
            }}>

                <TouchableOpacity style={{
                    position: "absolute",
                    top: 10,
                    left: 10
                }} onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <View style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Image
                        source={Logo as ImageProps}
                        style={{
                            height: 44,
                            width: 44,
                            marginBottom: 40
                        }}
                    />

                    <Text style={style.title}>{type === "login" ? "Welcome Back" : "Create Account"}</Text>

                    <View style={style.formWrapper}>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={style.inputContainer}>

                                    <TextInput
                                        autoCapitalize="none"
                                        // underlineColorAndroid="off"
                                        placeholder="Email"
                                        style={style.input}
                                        keyboardType='email-address'
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                </View>

                            )}
                            name="email"
                        /><View style={{
                            width: "100%"
                        }}>
                            {errors.email && <Text style={{
                                color: "red",
                                fontSize: 12
                            }}>{errors.email.message}</Text>}

                        </View>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}

                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={style.inputContainer}>

                                    <TextInput
                                        placeholder="Password"
                                        style={style.input}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        value={value}
                                    />
                                </View>

                            )}
                            name="password"
                        />
                        <View style={{
                            width: "100%"
                        }}>
                            {errors.password && <Text style={{
                                color: "red",
                                fontSize: 12
                            }}>{errors.password.message}</Text>}

                        </View>

                    </View>

                    <View style={{
                        marginTop: 20,
                        width: "100%"
                    }}>


                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={[defaultStyles.btn, {
                            gap: 4,
                            backgroundColor: Colors.primary, width: "100%"
                        }]}>
                            {type === "login" ?
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>Login</Text>
                                : <Text style={{ fontSize: 16, fontWeight: "600" }}>SignUp</Text>
                            }
                            {loading && <ActivityIndicator color={Colors.grey} style={{
                                marginLeft: 6
                            }} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    container: {
        // width: "100%",
        // alignItems: "center",
        // justifyContent: "center",
        flex: 1
    },
    title: {
        fontSize: 30,
        fontWeight: "700"
    },
    formWrapper: {
        marginTop: 30,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    inputContainer: {
        height: 50,
        width: "100%",
        borderRadius: 15,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: "center",
        borderColor: Colors.primary
    },
    input: {
        color: Colors.grey,
        fontSize: 14,
        width: "100%",
        fontWeight: "500"
    }
})

export default index