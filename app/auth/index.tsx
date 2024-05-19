import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { signIn } from "../../axios/user";

type FormFields = {
  username: string;
  password: string;
};

export const showAlertDialog = (message: string) => {
  if (!message) {
    Alert.alert("Try Again.", "", [
      {
        text: "OK",
      },
    ]);
  } else {
    Alert.alert(message, "", [
      {
        text: "OK",
      },
    ]);
  }
};

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    if (username.length === 0 || password.length === 0) {
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      showAlertDialog("Invalid username or password.");
      return;
    }

    setLoading(true);
    const res = await signIn(username, password);

    if (!res?.success) {
      showAlertDialog(res?.message);
    } else {
      router.push("../home");
    }

    setLoading(false);
  };

  return (
    <>
      <LinearGradient
        colors={["#E8FCE8", "#E8F0FC", "#FCF1E8", "#FCE8FA"]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            justifyContent: "flex-end",
            flex: 2,
            padding: 25,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "maven",
            }}>
            Welcome
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "light",
            }}>
            Log in to your account
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            rowGap: 20,
            paddingHorizontal: 20,
            justifyContent: "center",
          }}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            value={username}
            onChange={(e) => setUsername(e.nativeEvent.text)}
            style={styles.inputContainer}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="grey"
            value={password}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            style={styles.inputContainer}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 10,
            }}>
            <Text style={{ fontFamily: "light" }}>Don't have an account?</Text>
            <Pressable
              onPress={() => {
                router.push("./signup");
              }}>
              <Text style={{ color: "#dc3131" }}>Sign Up</Text>
            </Pressable>
          </View>
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#FF6961" style={{ flex: 1 }} />
        )}

        <View
          style={{
            flex: 2,
            marginTop: 20,
          }}>
          <Pressable
            onPress={handleSignIn}
            style={{
              backgroundColor: "#FF6961",
              alignSelf: "center",
              borderRadius: 30,
            }}>
            <Text
              style={{
                color: "white",
                fontFamily: "medium",
                fontSize: 20,
                padding: 15,
                paddingHorizontal: 50,
                textAlign: "center",
              }}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#FDBF60",
    borderRadius: 20,
    height: 45,
    width: "100%",
    paddingHorizontal: 20,
    fontFamily: "light",
  },
});

export default LoginScreen;
