import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGame } from "../../src/store/GameContext";

const mockProfile = {
  name: "Sarah",
  age: 25,
  city: "Los Angeles",
  photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800"
};

export default function Home() {
  const { points } = useGame();

  return (
    <View style={s.page}>
      <Image source={require("../../assets/logo.png")} style={s.logo} />
      <Text style={s.h1}>Heartwing</Text>
      <Text style={s.points}>Your points: <Text style={{fontWeight:"800"}}>{points}</Text></Text>

      <View style={s.card}>
        <Image source={{ uri: mockProfile.photo }} style={s.photo} />
        <Text style={s.h2}>{mockProfile.name} · {mockProfile.age}</Text>
        <Text style={s.p}>{mockProfile.city}</Text>

        <TouchableOpacity style={s.btn} onPress={() => router.push("/quest")}>
          <Text style={s.btnText}>Start Quest</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnGhost} onPress={() => router.push("/leaderboard")}>
          <Text style={s.btnGhostText}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  logo: { width: 120, height: 120, alignSelf: "center", marginBottom: 12 },
  h1: { fontSize: 32, fontWeight: "900" },
  points: { marginTop: 6, marginBottom: 14, color: "#444" },
  card: { backgroundColor: "#f7f4ff", borderRadius: 20, padding: 16 },
  photo: { width: "100%", height: 260, borderRadius: 14, marginBottom: 12 },
  h2: { fontSize: 20, fontWeight: "800" },
  p: { fontSize: 14, color: "#444", marginBottom: 12 },
  btn: { backgroundColor: "#6C63FF", padding: 16, borderRadius: 14, alignItems: "center", marginTop: 6 },
  btnText: { color: "#fff", fontWeight: "800" },
  btnGhost: { borderWidth: 1, borderColor: "#ddd", padding: 14, borderRadius: 14, alignItems: "center", marginTop: 10 },
  btnGhostText: { fontWeight: "700" }
});
