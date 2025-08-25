import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Message } from '@/utils/interface'
import Colors from '@/constants/Colors'

const ChatMessage = ({message}:{message:Message}) => {

    const {width} = Dimensions.get("screen")
    return (
    <View style={{
        maxWidth: width*0.9,
        alignSelf: message.role === 1 ? "flex-start" : "flex-end",
        padding: 8,
        borderRadius: 14,
        backgroundColor: message.role === 1 ? Colors.light : Colors.selected,
    }}>
        <Text style={{
            color: Colors.grey,
            padding: 8,
        }}>
            {message.content}
        </Text>
    </View>
  )
}

export default ChatMessage