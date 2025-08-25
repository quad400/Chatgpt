import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ChatInput from '@/components/ChatInput'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { Message, Role } from '@/utils/interface'
import ChatMessages from '@/components/ChatMessages'
import OpenAI from "react-native-openai"

const Recommendations = [
  {
    id: 1,
    title: "Explain how to cook",
    detail: "Explain how to cook a delicious meal",
  },

  {
    id: 2,
    title: "Explain how to wrap an envelope",
    detail: "Explain how to wrap envelop neatly",
  },
  {
    id: 3,
    title: "Explain how to write a clean code",
    detail: "Explain how to write a clean code",
  }
]

const DUMMY_DATA = [
  {
    id: 1,
    role: Role.Bot,
    content: "Hello, how can I help you today?",
  },
  {
    id: 2,
    role: Role.User,
    content: "Can you help me with cooking?",
  },
  {
    id: 3,
    role: Role.Bot,
    content: "Sure, I can help you with that 😊, What can you do alright good okay",
  },
]

const NewChat = () => {

  const { bottom } = useSafeAreaInsets()

  const [messages, setMessages] = useState<Message[]>(DUMMY_DATA)


  const sendMessage = (msg: string) => {
    if (msg.trim() === "") return
    setMessages([...messages, { content: msg, role: Role.User, }])
    openAI.chat.stream({
      messages: [
        {
          role: 'user',
          content: msg,
        },
      ],
      model: 'gpt-4',
    });
  }

  const openAI = useMemo(()=>{
    const openAI = new OpenAI({
      apiKey: process.env.EXPO_PUBLIC_APIKEY!,
      organization: 'Coderblack',
    });

    return openAI
  }, [])

  useEffect(() => {

    const onMessageSend = (payload: any) => {
      console.log(payload)
      setMessages((messages) => {
        const newMessage = payload.choices[0]?.delta.content;
        if (newMessage) {
          messages[messages.length - 1].content += newMessage
          return [...messages]
        }

        if (payload.choices[0]?.finishReason) {
          console.log("Stream ended")
        }

        return messages;
      });
    };

    openAI.chat.addListener('onChatMessageReceived', onMessageSend)

    return () => {
      openAI.chat.removeListener('onChatMessageReceived')

    }

  }, [openAI])

  console.log(messages)

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={70} behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
      flex: 1,
      backgroundColor: Colors.light
    }}>
      <View style={{
        flex: 1,
        // padding: 16
      }}>

        <ChatMessages
          messages={messages}
        />

      </View>
      {messages.length === 0 &&
        <View style={{
          flex: 1,
          justifyContent: "flex-end",
        }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: "center"
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center"
            }}>What can I help with?</Text>
            <View style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "90%",

              justifyContent: "center",
              alignItems: 'center',
              marginTop: 20,
              gap: 10
            }}>
              <TouchableOpacity style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greyLight,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 8

              }}>
                <MaterialCommunityIcons name="image-edit-outline" size={24} color={Colors.primary} />
                <Text style={{
                  fontSize: 14,
                  color: Colors.grey
                }}>Create Image</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greyLight,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 8

              }}>
                <MaterialCommunityIcons name="code-json" size={20} color="purple" />
                <Text style={{
                  fontSize: 14,
                  color: Colors.grey
                }}>Code</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greyLight,
                paddingHorizontal: 20,
                paddingVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 8
              }}>
                <AntDesign name="edit" size={20} color="#e366db" />
                <Text style={{
                  fontSize: 14,
                  color: Colors.grey
                }}>Help me write</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.greyLight,
                paddingHorizontal: 20,
                paddingVertical: 10,

              }}>
                <Text style={{
                  fontSize: 14,
                  color: Colors.grey
                }}>More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Recommendations.map((item, index) => (
                <TouchableOpacity onPress={() => sendMessage(item.detail)} key={index} style={{
                  backgroundColor: Colors.input,
                  padding: 16,
                  borderRadius: 20,
                  margin: 10,
                  width: 200
                }}>
                  <Text
                    ellipsizeMode='tail'
                    numberOfLines={1}
                    style={{
                      fontSize: 16,

                      fontWeight: "600"
                    }}>{item.title}</Text>
                  <Text style={{
                    fontSize: 14,
                    color: Colors.grey
                  }}>{item.detail}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>}
      <View style={{
        marginBottom: bottom,
        paddingHorizontal: 16
      }}>
        <ChatInput
          onSend={sendMessage}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default NewChat