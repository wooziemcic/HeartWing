// src/ui/Button.tsx
import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { colors, space } from "../theme";
import { Text } from "./Text";

type Variant = "primary" | "ghost";

type ButtonProps = {
  title?: string;
  children?: React.ReactNode;
  onPress?: () => void | Promise<void>;
  style?: ViewStyle;
  variant?: Variant;
  disabled?: boolean;
};

export function Button({
  title,
  children,
  onPress,
  style,
  variant = "primary",
  disabled,
}: ButtonProps) {
  const isGhost = variant === "ghost";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        s.base,
        isGhost ? s.ghost : s.primary,
        disabled && { opacity: 0.6 },
        style,
      ]}
    >
      {/* ✅ Always render text inside <Text> */}
      {typeof children === "string" || typeof title === "string" ? (
        <Text
          style={[
            s.label,
            isGhost ? s.labelGhost : s.labelPrimary,
          ]}
        >
          {title ?? (children as string)}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: space.md,
  },
  primary: { backgroundColor: colors.accent },
  ghost: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: { fontFamily: "Poppins_700Bold", fontSize: 16 },
  labelPrimary: { color: "#fff" },
  labelGhost: { color: colors.text },
});
