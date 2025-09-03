// app/index.tsx
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../src/theme";
import { useAuth } from "./auth/AuthContext";

export default function Index() {
  const { user } = useAuth();

  if (user === undefined) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  }

  // logged in → tabs ; logged out → landing
  return <Redirect href={user ? "/(tabs)" : "/landing"} />;
}
