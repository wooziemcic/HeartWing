import { Text as RNText, StyleSheet, TextProps } from "react-native";
import { colors } from "../theme";

export function Text(props: TextProps & { dim?: boolean; h1?: boolean; h2?: boolean }) {
  const { style, dim, h1, h2, ...rest } = props;
  return (
    <RNText
      style={[
        styles.base,
        dim && { color: colors.textDim },
        h1 && styles.h1,
        h2 && styles.h2,
        style
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: { color: colors.text, fontFamily: "Poppins_400Regular", fontSize: 15 },
  h1: { fontFamily: "Poppins_700Bold", fontSize: 28 },
  h2: { fontFamily: "Poppins_600SemiBold", fontSize: 18 },
});
