import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/data/Colors";
import CustomInput from "@/components/shared/CustomInput";
import Button from "@/components/shared/Button";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [username, setUsername] = useState<string>("tolufolorunso");
  const [password, setPassword] = useState<string>("12345");
  const { login, isLoading, isCheckingAuth } = useAuthStore((state) => state);

  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      return Alert.alert("Error", "Please fill in all fields");
    }

    try {
      const data = await login(username, password);
      if (data.status) {
        Alert.alert("Success", data.message);
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  if (isCheckingAuth) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.loginContainer}>
        <Image
          source={require("../../assets/images/login-image.jpg")}
          style={styles.loginImage}
        />
        <ScrollView style={styles.loginForm}>
          <Text style={styles.loginHeaderText}>Staff Login</Text>
          <Text
            style={[styles.loginHeaderText, { fontSize: 14, fontWeight: 500 }]}
          >
            Login if you are a staff
          </Text>
          <View style={{ marginTop: 20 }}>
            <CustomInput
              label="Username"
              placeholder="tolu4president"
              onChangeText={setUsername}
              value={username}
            />
            <CustomInput
              label="Password"
              placeholder="********"
              onChangeText={setPassword}
              value={password}
              password={true}
            />
            <Button text="Login" onPress={handleLogin} loading={isLoading} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
  },
  loginImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  loginHeaderText: {
    fontSize: 24,
    fontWeight: 400,
    letterSpacing: 1.2,
    color: Colors.GRAY,
  },
  loginForm: {
    padding: 20,
    marginTop: 30,
  },
});
