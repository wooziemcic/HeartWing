import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGame } from "../src/store/GameContext";

type Q = { q: string; options: string[]; correct: number };

const QUIZ: Q[] = [
  {
    q: "What’s the best way to make a flirty first impression?",
    options: ["Send a playful compliment", "Buy them a drink", "Make prolonged eye contact", "Start with a cheesy pickup line"],
    correct: 0
  },
  {
    q: "Pick an opening line for Sarah:",
    options: ["You're gorgeous.", "Okay so… tacos or sushi?", "Hey", "U up?"],
    correct: 1
  },
  {
    q: "Choose a mini-date idea:",
    options: ["Argue about Marvel", "Silent reading & coffee", "Ignore her texts", "Send 12 selfies"],
    correct: 1
  }
];

export default function Quest() {
  const { awardPoints } = useGame();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const q = QUIZ[step];
  const total = QUIZ.length;

  const onSubmit = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    if (isCorrect) setCorrectCount(c => c + 1);

    if (step < total - 1) {
      setStep(s => s + 1);
      setSelected(null);
    } else {
      const success = (isCorrect ? correctCount + 1 : correctCount) >= 2;
      const earned = success ? 20 : 0;
      if (earned) awardPoints(earned);
      router.push(`/result?ok=${success}&earned=${earned}`);
    }
  };

  return (
    <View style={s.page}>
      <Text style={s.h1}>Flirt Trivia</Text>
      <Text style={s.meta}>Question {step + 1} of {total}</Text>

      <View style={s.progressTrack}>
        <View style={[s.progressBar, { width: `${((step + 1) / total) * 100}%` }]} />
      </View>

      <Text style={s.q}>{q.q}</Text>

      {q.options.map((opt, i) => (
        <Pressable
          key={i}
          style={[s.option, selected === i && s.optionSelected]}
          onPress={() => setSelected(i)}
        >
          <Text style={s.optionText}>{opt}</Text>
        </Pressable>
      ))}

      <TouchableOpacity
        style={[s.btn, selected === null && { opacity: 0.5 }]}
        disabled={selected === null}
        onPress={onSubmit}
      >
        <Text style={s.btnText}>{step === total - 1 ? "Finish" : "Next"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  h1: { fontSize: 24, fontWeight: "900" },
  meta: { marginTop: 6, color: "#666" },
  progressTrack: { height: 8, backgroundColor: "#eee", borderRadius: 6, overflow: "hidden", marginVertical: 12 },
  progressBar: { height: "100%", backgroundColor: "#6C63FF" },
  q: { fontSize: 18, fontWeight: "700", marginBottom: 8, marginTop: 6 },
  option: { borderWidth: 1, borderColor: "#eee", backgroundColor: "#fff", borderRadius: 14, padding: 14, marginTop: 10 },
  optionSelected: { borderColor: "#6C63FF", shadowColor: "#6C63FF", shadowOpacity: 0.2, shadowRadius: 6 },
  optionText: { fontSize: 15 },
  btn: { backgroundColor: "#6C63FF", padding: 16, borderRadius: 14, alignItems: "center", marginTop: 16 },
  btnText: { color: "#fff", fontWeight: "800" }
});
