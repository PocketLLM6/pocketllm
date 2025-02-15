import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

export default function HomeScreen() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { text: input, sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Placeholder response for Expo testing
        const botMessage: Message = { text: "Hello! I'm TinyLlama.", sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);

        setInput('');
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <Text key={index} style={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
                        {msg.text}
                    </Text>
                ))}
            </ScrollView>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={input}
                    onChangeText={setInput}
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
    chatBox: { flex: 1, marginBottom: 10 },
    userMsg: { alignSelf: 'flex-end', backgroundColor: '#007AFF', padding: 10, borderRadius: 5, margin: 5, color: 'white' },
    botMsg: { alignSelf: 'flex-start', backgroundColor: '#E5E5EA', padding: 10, borderRadius: 5, margin: 5, color: 'black' },
    inputBox: { flexDirection: 'row', alignItems: 'center' },
    input: { flex: 1, padding: 10, borderWidth: 1, borderRadius: 5, marginRight: 5 },
});
