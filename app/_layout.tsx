// app/_layout.tsx
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { LinearGradient } from "expo-linear-gradient";
import { Href, Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { GameProvider } from "../src/store/GameContext";
import { colors } from "../src/theme";
import { AuthProvider, useAuth } from "./auth/AuthContext";

function CenterSpinner() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator color={colors.text} />
    </View>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();       // ⬅️ use ready
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready) return; // ⬅️ wait until first auth snapshot

    const inAuth = pathname.startsWith("/auth");
    const isLandingOrIndex = pathname === "/landing" || pathname === "/" || pathname === "/index";

    if (!user) {
      if (!isLandingOrIndex && !inAuth) router.replace("/landing" as Href);
      return;
    }

    if (isLandingOrIndex || inAuth) router.replace("/(tabs)" as Href);
  }, [ready, user, pathname]);

  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  return <>{children}</>;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  if (!loaded) return null;

  return (
    <AuthProvider>
      <GameProvider>
        <LinearGradient
          colors={["#0B0A0F", "#101322", "#0B0A0F"]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            <StatusBar style="light" />
            <AuthGate>
              <Stack
                screenOptions={{
                  headerTintColor: colors.text,
                  headerTitleStyle: { color: colors.text, fontFamily: "Poppins_700Bold" },
                  headerStyle: { backgroundColor: "transparent" },
                  contentStyle: { backgroundColor: "transparent" },
                }}
              >
                {/* Public / entry */}
                <Stack.Screen name="landing" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />

                {/* App */}
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="quest" options={{ title: "Quest" }} />
                <Stack.Screen name="result" options={{ title: "Result" }} />
                <Stack.Screen name="chat" options={{ title: "Chat" }} />
                <Stack.Screen name="leaderboard" options={{ title: "Leaderboard" }} />

                {/* Auth */}
                <Stack.Screen name="auth/login" options={{ title: "Login" }} />
                <Stack.Screen name="auth/register" options={{ title: "Create account" }} />
              </Stack>
            </AuthGate>
          </View>
        </LinearGradient>
      </GameProvider>
    </AuthProvider>
  );
}
