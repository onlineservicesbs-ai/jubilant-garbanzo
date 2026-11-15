
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";

import * as Speech from "expo-speech";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "नमस्ते! मैं Zara AI हूँ। आप मुझसे बात कर सकते हैं।",
      sender: "bot",
    },
  ]);

  useSpeechRecognitionEvent("result", (event) => {
    const text = event.results?.[0]?.transcript;
    if (text) setMessage(text);
  });

  const sendMessage = () => {
    if (!message.trim()) return;

    const userText = message.trim();

    setMessages((old) => [
      ...old,
      { id: Date.now().toString(), text: userText, sender: "user" },
    ]);

    setMessage("");
    Keyboard.dismiss();

    const reply = "नमस्ते! मैं Zara हूँ। आपने कहा: " + userText;

    setMessages((old) => [
      ...old,
      { id: (Date.now() + 1).toString(), text: reply, sender: "bot" },
    ]);

    Speech.speak(reply, { language: "hi-IN" });
  };

  const startListening = async () => {
    const permission =
      await ExpoSpeechRecognitionModule.requestPermissionsAsync();

    if (permission.granted) {
      ExpoSpeechRecognitionModule.start({
        lang: "hi-IN",
        interimResults: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Zara AI</Text>
      <Text style={styles.subtitle}>Chat & Voice Assistant</Text>

      <FlatList
        style={styles.chat}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.sender === "user"
                ? styles.userBubble
                : styles.botBubble,
            ]}
          >
            <Text style={styles.chatText}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputArea}>
        <TouchableOpacity
          style={styles.mic}
          onPress={startListening}
        >
          <Text style={styles.buttonText}>🎤</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Zara से बात करें..."
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity style={styles.send} onPress={sendMessage}>
          <Text style={styles.buttonText}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101827",
    paddingTop: 55,
  },
  title: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#a5b4fc",
    textAlign: "center",
    marginBottom: 15,
  },
  chat: {
    flex: 1,
    padding: 15,
  },
  bubble: {
    padding: 14,
    marginVertical: 7,
    borderRadius: 16,
    maxWidth: "85%",
  },
  userBubble: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#293548",
    alignSelf: "flex-start",
  },
  chatText: {
    color: "white",
    fontSize: 16,
  },
  inputArea: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    backgroundColor: "#1e293b",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 25,
    paddingHorizontal: 15,
    color: "black",
    marginHorizontal: 8,
  },
  mic: {
    backgroundColor: "#7c3aed",
    padding: 13,
    borderRadius: 30,
  },
  send: {
    backgroundColor: "#2563eb",
    padding: 13,
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
    
