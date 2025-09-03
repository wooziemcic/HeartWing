// app/(tabs)/index.tsx
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { useGame } from "../../src/store/GameContext";
import { radii, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Card } from "../../src/ui/Card";
import { Text } from "../../src/ui/Text";
import { useAuth } from "../auth/AuthContext";

const mockProfile = {
  name: "Sarah",
  age: 25,
  city: "Los Angeles",
  photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
};

export default function HomeTab() {
  const { points } = useGame();
  const { logout } = useAuth();

  return (
    <ScrollView style={s.page} contentContainerStyle={s.container}>
      {/* top row */}
      <View style={s.topRow}>
        <View style={{ width: 84 }} />
        <Image source={require("../../assets/logo.png")} style={s.logo} />
        <Button
          title="Log out"
          variant="ghost"
          onPress={async () => {
            try {
              await logout();
              // optional: router.replace("/landing");
            } catch (e) {
              console.warn("Logout failed:", e);
            }
          }}
          style={s.logoutBtn}
        />
      </View>

      {/* title */}
      <Text h1 style={{ textAlign: "center" }}>Heartwing</Text>
      <Text dim style={{ marginTop: 4, marginBottom: 14, textAlign: "center" }}>
        Your points: <Text style={{ fontFamily: "Poppins_700Bold" }}>{points}</Text>
      </Text>

      {/* profile card */}
      <Card style={s.card}>
        <Image source={{ uri: mockProfile.photo }} style={s.photo} />
        <Text h2 style={{ marginTop: 8 }}>{mockProfile.name} · {mockProfile.age}</Text>
        <Text dim>{mockProfile.city}</Text>

        {/* actions block with spacing */}
        <View style={s.actions}>
          <Button title="Start Quest" onPress={() => router.push("/quest")} />
          <Button title="Leaderboard" variant="ghost" onPress={() => router.push("/leaderboard")} />
        </View>
      </Card>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1 },
  container: {
    paddingHorizontal: space.lg,
    paddingTop: 24,
    paddingBottom: space.xl,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  logo: { width: 84, height: 84, alignSelf: "center" },
  logoutBtn: { alignSelf: "flex-end", minWidth: 84, paddingVertical: 10 },
  card: { marginTop: space.md },
  photo: { width: "100%", height: 260, borderRadius: radii.md, marginBottom: space.sm },
  /** ✅ added */
  actions: { marginTop: space.md, gap: space.md },
});
