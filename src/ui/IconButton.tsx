import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { colors, shadow } from "../theme";

type Props = {
  name: React.ComponentProps<typeof Ionicons>["name"];
  onPress?: () => void;
  size?: number;
  bg?: string;
  color?: string;
};

export function IconButton({ name, onPress, size = 26, bg = colors.card, color = colors.text }: Props) {
  return (
    <Pressable onPress={onPress} style={[s.btn, { backgroundColor: bg }, shadow.card]}>
      <Ionicons name={name} size={size} color={color} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    width: 56, height: 56, borderRadius: 28,
    alignItems: "center", justifyContent: "center",
  },
});
