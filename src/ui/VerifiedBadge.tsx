import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { colors } from "../theme";

export function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <View style={{ backgroundColor: colors.accent2, borderRadius: 999, padding: 2 }}>
      <Ionicons name="checkmark" size={size - 6} color="#0A0B0E" />
    </View>
  );
}
