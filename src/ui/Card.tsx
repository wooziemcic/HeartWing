import { StyleSheet, View, ViewProps } from "react-native";
import { colors, radii, space } from "../theme";

export function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: space.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
