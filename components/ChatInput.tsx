import { View, Text, TouchableOpacity, TextInput, Image, ImageProps, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from "expo-blur"
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { WaveSound } from '@/constants/Image'
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const ChatInput = ({ onSend }: { onSend: (val: string) => void }) => {

  const expanded = useSharedValue(1)
  const [message, setMessage] = useState("")
  const expandedItem = () => {
    expanded.value = withTiming(1, { duration: 400 })
  }

  const collapseItem = () => {
    expanded.value = withTiming(0, { duration: 400 })

  }

  const onChangeText = (text: string) => {
    collapseItem()
    setMessage(text)
  }
  const expandedStyleBtn = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(expanded.value, [0, 1], [1, 0], Extrapolation.CLAMP)

    const widthInterpolation = interpolate(expanded.value, [0, 1], [34, 0], Extrapolation.CLAMP)
    return {
      opacity: opacityInterpolation,
      width: widthInterpolation
    }
  })


  const expandedStyleView = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(expanded.value, [0, 1], [0, 100], Extrapolation.CLAMP)
    return {
      width: widthInterpolation,
      opacity: expanded.value
    }
  })

  const handleSendBtn = () => {
    if (message.trim() === "") return
    onSend(message)
    setMessage("")
  }

  const handleVoiceBtn = () => {
    console.log("Voice")
  }


  return (

    <BlurView intensity={10} tint='light' style={{
      // width: "100%",
      flexDirection: "row",
      gap: 5,
      alignItems: "flex-end",
      justifyContent: "space-between"
    }}>
      <AnimatedTouchableOpacity
        onPress={expandedItem}
        style={[expandedStyleBtn, {
          marginBottom: 5,
          backgroundColor: Colors.selected, height: 34, borderRadius: 17,
          justifyContent: "center", alignItems: "center"
        }]}
      >
        <FontAwesome6 name="add" size={20} color="black" />
      </AnimatedTouchableOpacity>
      <Animated.View style={[expandedStyleView, {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 5,
        marginLeft: -5
      }]}>
        <TouchableOpacity style={{
          padding: 5
        }}>

          <Feather name="camera" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          padding: 5
        }}>
          <Feather name="image" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          padding: 5
        }}>
          <Feather name="folder" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          padding: 5
        }}>
          <Feather name="globe" size={24} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <View style={{
        paddingVertical: 15,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: Colors.selected,
        flex: 1

      }}>

        <TextInput
          placeholder='Message'
          placeholderTextColor={Colors.grey}
          multiline={true}
          autoCapitalize='sentences'
          
          autoCorrect={false}
          value={message}
          onChangeText={onChangeText}
          style={{
            fontSize: 14,
            verticalAlign: "top",
          }}
        />
      </View>
      <View style={{
        paddingVertical: 10
      }}>


        {message.length > 0 ? <TouchableOpacity
          onPress={handleSendBtn}
          style={{
            height: 34,
            width: 34,
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: Colors.grey,
            borderRadius: 17
          }}>
          <AntDesign name="arrowup" size={20} color={Colors.light} />
        </TouchableOpacity> :
          <TouchableOpacity
            onPress={handleVoiceBtn}
            style={{
              height: 34,
              width: 34,
              justifyContent: 'center',
              alignItems: "center",
              backgroundColor: Colors.grey,
              borderRadius: 17
            }}>
            <Image
              source={WaveSound as ImageProps}
              resizeMode='contain'
              style={{

                height: 20,
                width: 20,
                tintColor: "white"
              }}
            />
          </TouchableOpacity>}
      </View>
    </BlurView>
  )
}

export default ChatInput