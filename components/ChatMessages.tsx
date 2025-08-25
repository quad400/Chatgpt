import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Message } from '@/utils/interface'
import ChatMessage from './ChatMessage'

const ChatMessages = ({messages}:{messages:Message[]}) => {
  return (
    <FlatList 
      data={messages}
      contentContainerStyle={{
        padding: 16,
        gap:8
      }}
      keyboardDismissMode='on-drag'
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ChatMessage
          message={item}
        />
      )}
    />
  )
}

export default ChatMessages