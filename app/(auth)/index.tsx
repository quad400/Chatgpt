import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image, ImageProps, StyleSheet, TextInput, Platform, Alert, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter, useSearchParams } from 'expo-router/build/hooks'
import { defaultStyles } from '@/constants/Style'
import { AntDesign } from '@expo/vector-icons'
import { Logo } from '@/constants/Image'
import { Controller, useForm } from 'react-hook-form'
import { authSchema } from '@/libs/schema/auth'
import { zodResolver } from "@hookform/resolvers/zod"
import Colors from '@/constants/Colors'
import { authType } from '@/libs/types/auth'
import auth, { createUserWithEmailAndPassword } from "firebase/auth"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const index = () => {
    const { type } = useLocalSearchParams<{ type: string }>()

    const router = useRouter()

    const { control, handleSubmit, formState: { errors,isSubmitting } } = useForm({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const login = (data: authType) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === "auth/configuration-not-found") {
                    Alert.alert("Authentication Error", "Invalid Login Details")
                }
                if (errorCode === "auth/network-request-failed") {
                    Alert.alert("Internet Error", "No Internet Connection")
                }
            });
    }

    const signUp = (data: authType) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                if (errorCode === "auth/network-request-failed") {
                    Alert.alert("Internet Error", "No Internet Connection")
                }
            });

    }

    const onSubmit = (data: authType) => {

        if (type === "login") {
            login(data)
        } else {
            signUp(data)
        }
    }

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
                                        underlineColorAndroid="off"
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
                            gap:4,
                            backgroundColor: Colors.primary, width: "100%" }]}>
                            {type === "login" ?
                                <Text style={{ fontSize: 16, fontWeight: "600" }}>Login</Text>
                                : <Text style={{ fontSize: 16, fontWeight: "600" }}>SignUp</Text>
                            } 
                            {isSubmitting && <ActivityIndicator color={Colors.grey} style={{
                                marginLeft:6
                            }}/>}
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