import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useGame } from "../../src/store/GameContext";
import { colors, radii, shadow, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Card } from "../../src/ui/Card";
import { IconButton } from "../../src/ui/IconButton";
import { Text } from "../../src/ui/Text";
import { VerifiedBadge } from "../../src/ui/VerifiedBadge";
import { useAuth } from "../auth/AuthContext";

const mockProfile = {
  name: "Helen",
  age: 23,
  city: "In real time",
  photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop",
};

export default function HomeTab() {
  const insets = useSafeAreaInsets();
  const { points } = useGame();
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, paddingTop: insets.top + 8 }}>
      {/* Logout (top-right) */}
      <Button
        title="Log out"
        variant="ghost"
        onPress={async () => { await logout(); router.replace("/landing"); }}
        style={s.logout}
      />

      <View style={s.container}>
        {/* “Toolbar” row */}
        <View style={s.toolbar}>
          <Ionicons name="menu" size={22} color={colors.dim} />
          <View style={s.segment}>
            <Text style={s.segmentActive}>For You</Text>
            <Text dim style={s.segmentInactive}>Nearby</Text>
          </View>
          <Ionicons name="options" size={20} color={colors.dim} />
        </View>

        {/* Logo */}
        <Image source={require("../../assets/logo.png")} style={s.logo} />

        {/* Title + points */}
        <Text h1 style={{ textAlign: "center" }}>Heartwing</Text>
        <Text dim style={{ textAlign: "center", marginTop: 4, marginBottom: 14 }}>
          Your points: <Text style={{ fontFamily: "Poppins_700Bold" }}>{points}</Text>
        </Text>

        {/* Profile “hero” card */}
        <Card style={[s.hero, shadow.card]}>
          <View style={s.heroImageWrap}>
            <ImageBackground source={{ uri: mockProfile.photo }} style={s.heroImage} imageStyle={s.heroImageR}>
              {/* Top-right 18+ content chip (example) */}
              <View style={s.topRightChip}>
                <Ionicons name="flame" size={14} color={colors.text} />
                <Text style={{ marginLeft: 6, fontSize: 12 }}>18+ Content</Text>
              </View>

              {/* Overlay gradient */}
              <ImageBackground
                source={require("../../assets/images/overlay-bottom.jpg")}
                style={StyleSheet.absoluteFill}
                resizeMode="stretch"
              />

              {/* Bottom identity row */}
              <View style={s.identityRow}>
                <Text h2>{mockProfile.name}, {mockProfile.age} </Text>
                <VerifiedBadge />
              </View>
              <View style={s.realtimePill}>
                <View style={s.dot} />
                <Text style={{ fontSize: 12 }}>In real time</Text>
              </View>
            </ImageBackground>
          </View>

          {/* Primary actions */}
          <View style={s.actions}>
            <IconButton name="close" bg={colors.card} color={colors.pass} onPress={() => {}} />
            <Button title="Start Quest" onPress={() => router.push("/quest")} />
            <IconButton name="heart" bg={colors.card} color={colors.like} onPress={() => {}} />
          </View>

          <Button title="Leaderboard" variant="ghost" onPress={() => router.push("/leaderboard")} />
        </Card>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: space.lg, paddingBottom: space.xl },
  logout: {
    position: "absolute",
    right: space.lg,
    top: 0,
    height: 40, borderRadius: 20, paddingHorizontal: 16, zIndex: 10,
  },
  toolbar: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    marginBottom: space.md,
  },
  segment: {
    backgroundColor: colors.card, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6,
    flexDirection: "row", gap: 16, alignItems: "center",
  },
  segmentActive: { fontFamily: "Poppins_600SemiBold", color: colors.text },
  segmentInactive: { fontFamily: "Poppins_400Regular" },
  logo: { width: 64, height: 64, alignSelf: "center", marginBottom: 2, opacity: 0.95 },
  hero: { marginTop: space.sm, padding: space.sm, borderRadius: radii.xl, backgroundColor: colors.surface },
  heroImageWrap: { borderRadius: radii.lg, overflow: "hidden" },
  heroImage: { height: 420, justifyContent: "flex-end" },
  heroImageR: { borderRadius: radii.lg },
  topRightChip: {
    position: "absolute", right: 10, top: 10,
    backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6,
    flexDirection: "row", alignItems: "center",
  },
  identityRow: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, marginBottom: 8 },
  realtimePill: {
    alignSelf: "flex-start",
    marginLeft: 14, marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.35)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6,
    flexDirection: "row", alignItems: "center",
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#32D583", marginRight: 6 },
  actions: {
    marginTop: space.md, marginBottom: space.sm,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
});
