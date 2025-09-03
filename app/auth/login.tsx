// app/auth/login.tsx
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { colors, radii, space } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Text } from "../../src/ui/Text";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Missing info", "Please enter email and password.");
      return;
    }
    try {
      setLoading(true);
      await login(email.trim(), password);
      // ✅ Do not navigate here—AuthGate + app/index.tsx will route you to /(tabs)
    } catch (e: any) {
      Alert.alert("Sign in failed", e?.message ?? "Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <Text h1 style={{ marginBottom: 8 }}>Welcome back</Text>
        <Text dim style={{ marginBottom: 20 }}>Sign in to continue</Text>

        <View style={s.card}>
          <Text dim style={s.label}>Email</Text>
          <TextInput
            placeholder="you@email.com"
            placeholderTextColor={colors.textDim}
            autoCapitalize="none"
            keyboardType="email-address"
            style={s.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text dim style={[s.label, { marginTop: space.md }]}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.textDim}
            secureTextEntry
            style={s.input}
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title="Sign in"
            onPress={onSubmit}
            disabled={loading || !email || !password}
            style={{ marginTop: space.lg }}
          />

          <Button
            title="Create account"
            variant="ghost"
            onPress={() => router.push("/auth/register")}
            style={{ marginTop: space.md }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: space.lg,
    paddingTop: 28,
    paddingBottom: space.xl,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radii.lg,
    padding: space.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    marginBottom: 6,
  },
  input: {
    height: 52,
    borderRadius: radii.md,
    paddingHorizontal: space.md,
    backgroundColor: "#1b1a22",
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
