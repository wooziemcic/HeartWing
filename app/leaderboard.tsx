import { FlatList, StyleSheet, Text, View } from "react-native";
import { useGame } from "../src/store/GameContext";

const OTHERS = [
  { id: "e", name: "Emma", points: 1240 },
  { id: "r", name: "Rachel", points: 1120 },
  { id: "m", name: "Megan", points: 958 },
  { id: "h", name: "Hannah", points: 650 }
];

export default function Leaderboard() {
  const { points } = useGame();

  const rows = [...OTHERS, { id: "you", name: "You", points }];
  rows.sort((a, b) => b.points - a.points);

  return (
    <View style={s.page}>
      <Text style={s.h1}>Leaderboard</Text>
      <FlatList
        data={rows}
        keyExtractor={(i) => i.id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <View style={s.row}>
            <View style={s.rank}><Text style={{ fontWeight: "800" }}>{index + 1}</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{item.name}</Text>
              <Text>{item.points} pts</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  h1: { fontSize: 24, fontWeight: "900", marginBottom: 12 },
  row: { backgroundColor: "#f7f4ff", padding: 14, borderRadius: 14, flexDirection: "row", alignItems: "center", gap: 12 },
  rank: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#e8e4ff", alignItems: "center", justifyContent: "center" },
  name: { fontSize: 16, fontWeight: "800" }
});
