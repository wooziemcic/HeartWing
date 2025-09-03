import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Result() {
  const { ok, earned } = useLocalSearchParams<{ ok?: string; earned?: string }>();
  const success = ok === "true";
  const pts = Number(earned ?? 0) || 0;

  return (
    <View style={s.page}>
      <Text style={s.h1}>{success ? "You Completed the Quest!" : "Close! Try Again"}</Text>
      <Text style={s.p}>
        {success ? "Chat unlocked with Sarah." : "Get 2 of 3 correct to unlock chat."}
      </Text>

      {pts > 0 && <Text style={s.points}>+{pts} pts</Text>}

      <TouchableOpacity
        style={s.btn}
        onPress={() => success ? router.push("/chat") : router.replace("/quest")}
      >
        <Text style={s.btnText}>{success ? "Send a Message" : "Try Another Quest"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.btnGhost} onPress={() => router.replace("/(tabs)")}>
        <Text style={s.btnGhostText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50, alignItems: "center" },
  h1: { fontSize: 24, fontWeight: "900", textAlign: "center" },
  p: { marginVertical: 10, color: "#444", textAlign: "center" },
  points: { marginBottom: 6, fontWeight: "900", color: "#6C63FF" },
  btn: { backgroundColor: "#6C63FF", padding: 16, borderRadius: 14, alignItems: "center", marginTop: 6, width: "100%" },
  btnText: { color: "#fff", fontWeight: "800" },
  btnGhost: { borderWidth: 1, borderColor: "#ddd", padding: 14, borderRadius: 14, alignItems: "center", marginTop: 10, width: "100%" },
  btnGhostText: { fontWeight: "700" }
});
