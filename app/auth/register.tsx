import { Href, router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import { colors, radii } from "../../src/theme";
import { Button } from "../../src/ui/Button";
import { Card } from "../../src/ui/Card";
import { Text } from "../../src/ui/Text";
import { useAuth } from "./AuthContext";

export default function Register() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    try {
      setLoading(true);
      await register(email, pass);
      router.replace("/(tabs)");
    } catch (e: any) {
      Alert.alert("Sign up failed", e?.message ?? "Try a different email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 48 }}>
      <Text h1>Create account</Text>
      <Text dim style={{ marginTop: 6, marginBottom: 10 }}>Start your Heartwing journey</Text>

      <Card>
        <Text style={{ marginBottom: 6 }}>Email</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@email.com"
          placeholderTextColor={colors.textDim}
          style={s.input}
        />

        <Text style={{ marginTop: 10, marginBottom: 6 }}>Password</Text>
        <TextInput
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          placeholder="At least 6 characters"
          placeholderTextColor={colors.textDim}
          style={s.input}
        />

        <Button title={loading ? "Creating…" : "Create account"} onPress={onRegister} disabled={loading || !email || !pass} />
        <Button title="I already have an account" variant="ghost" onPress={() => router.replace("/auth/login" as Href)} />
      </Card>
    </View>
  );
}

const s = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radii.md,
    paddingHorizontal: 12,
    height: 46,
  },
});
