import { useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useGame } from "../src/store/GameContext";

export default function Chat() {
  const { messages, sendMessage } = useGame();
  const [text, setText] = useState("");
  const listRef = useRef<FlatList>(null);

  const onSend = () => {
    if (!text.trim()) return;
    sendMessage(text.trim());
    setText("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <View style={s.page}>
        <Text style={s.h1}>Chat with Sarah</Text>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => (
            <View style={[s.bubble, item.from === "you" ? s.me : s.her]}>
              <Text style={{ color: item.from === "you" ? "#fff" : "#111" }}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 8 }}
        />

        <View style={s.inputRow}>
          <TextInput
            placeholder="Type a message…"
            value={text}
            onChangeText={setText}
            style={s.input}
            returnKeyType="send"
            onSubmitEditing={onSend}
          />
          <TouchableOpacity style={s.sendBtn} onPress={onSend}>
            <Text style={{ color: "#fff", fontWeight: "800" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 50 },
  h1: { fontSize: 22, fontWeight: "900", marginBottom: 10 },
  bubble: { padding: 12, borderRadius: 14, marginVertical: 6, maxWidth: "80%" },
  her: { backgroundColor: "#f2f2f7", alignSelf: "flex-start" },
  me: { backgroundColor: "#6C63FF", alignSelf: "flex-end" },
  inputRow: { flexDirection: "row", gap: 8, paddingVertical: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ddd", borderRadius: 12, paddingHorizontal: 12, height: 44 },
  sendBtn: { backgroundColor: "#6C63FF", paddingHorizontal: 16, borderRadius: 12, alignItems: "center", justifyContent: "center" }
});
