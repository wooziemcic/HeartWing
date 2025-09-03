import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useGame } from "../src/store/GameContext";
import { colors, radii, space } from "../src/theme";
import { Button } from "../src/ui/Button";
import { Card } from "../src/ui/Card";
import { Text } from "../src/ui/Text";

type Q = { q: string; options: string[]; correct: number };

const QUIZ: Q[] = [
  {
    q: "What’s the best way to make a flirty first impression?",
    options: [
      "Send a playful compliment",
      "Buy them a drink",
      "Make prolonged eye contact",
      "Start with a cheesy pickup line",
    ],
    correct: 0,
  },
  {
    q: "Pick an opening line for Sarah:",
    options: ["You're gorgeous.", "Okay so… tacos or sushi?", "Hey", "U up?"],
    correct: 1,
  },
  {
    q: "Choose a mini-date idea:",
    options: ["Argue about Marvel", "Silent reading & coffee", "Ignore her texts", "Send 12 selfies"],
    correct: 1,
  },
];

export default function Quest() {
  const { awardPoints } = useGame();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const q = QUIZ[step];
  const total = QUIZ.length;
  const pct = ((step + 1) / total) * 100;

  const onSubmit = () => {
    if (selected === null) return;

    const isCorrect = selected === q.correct;
    if (isCorrect) setCorrectCount((c) => c + 1);

    if (step < total - 1) {
      setStep((s) => s + 1);
      setSelected(null);
      return;
    }

    // finished
    const finalCorrect = isCorrect ? correctCount + 1 : correctCount;
    const success = finalCorrect >= 2; // need 2/3
    const earned = success ? 20 : 0;
    if (earned) awardPoints(earned);

    router.push(`/result?ok=${success}&earned=${earned}`);
  };

  return (
    <View style={s.page}>
      <Text h1>Flirt Trivia</Text>
      <Text dim style={s.meta}>
        Question {step + 1} of {total}
      </Text>

      <View style={s.progressTrack}>
        <View style={[s.progressBar, { width: `${pct}%` }]} />
      </View>

      <Card style={{ marginTop: space.sm }}>
        <Text h2 style={{ marginBottom: space.sm }}>
          {q.q}
        </Text>

        {q.options.map((opt, i) => (
          <Pressable
            key={i}
            onPress={() => setSelected(i)}
            style={[
              s.option,
              selected === i && { borderColor: colors.accent, backgroundColor: colors.surface },
            ]}
          >
            <Text>{opt}</Text>
          </Pressable>
        ))}

        <View style={{ marginTop: space.lg }}>
        <Button
          title={step === total - 1 ? "Finish" : "Next"}
          onPress={onSubmit}
          disabled={selected === null}
        />
      </View>
      </Card>
    </View>
  );
}

const s = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: space.lg,
    paddingTop: 48,
  },
  meta: {
    marginTop: 6,
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginVertical: space.md,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.accent,
    borderRadius: 10,
  },
  option: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: radii.md,
    padding: space.md,
    marginTop: space.sm,
  },
});
