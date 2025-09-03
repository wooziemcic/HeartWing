// app/landing.tsx
import { Href, router } from "expo-router";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { space } from "../src/theme";
import { Button } from "../src/ui/Button";
import { Text } from "../src/ui/Text"; // <-- use Text for any literal strings

export default function Landing() {
  return (
    <ImageBackground
      source={require("../assets/title.png")}
      resizeMode="cover"
      style={s.bg}
      imageStyle={s.bgImg}
    >
      <View style={s.bottom}>
        <Button
          onPress={() => router.push("/auth/login" as Href)}
          style={s.cta}
        >
          <Text style={{ fontFamily: "Poppins_700Bold", fontSize: 16, color: "#fff" }}>
            Log in / Sign up
          </Text>
        </Button>

        <Image source={require("../assets/logo.png")} style={s.logo} />
      </View>
    </ImageBackground>
  );
}

const s = StyleSheet.create({
  bg: { flex: 1, justifyContent: "flex-end" },
  bgImg: { opacity: 0.85 },
  bottom: {
    paddingHorizontal: space.lg,
    paddingBottom: space.xl,
    alignItems: "center",
    gap: 12, // spacing between CTA and logo
  },
  cta: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    width: "100%",
  },
  logo: { width: 50, height: 50, opacity: 0.95 },
});
