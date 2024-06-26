import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { signUp } from "../../axios/user";
import { showAlertDialog } from ".";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    if (username.length === 0 || password.length === 0 || name.length === 0) {
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      showAlertDialog("Invalid Credentials.");
      return;
    }
    setLoading(true);
    const res = await signUp(name, username, password);

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
            flex: 1,
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
            Sign in to your account
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
            placeholder="Name"
            placeholderTextColor="grey"
            value={name}
            onChange={(e) => setName(e.nativeEvent.text)}
            style={styles.inputContainer}
          />
          <TextInput
            placeholder="Username"
            placeholderTextColor="grey"
            value={username}
            onChange={(e) => setUsername(e.nativeEvent.text)}
            style={styles.inputContainer}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            value={password}
            secureTextEntry={true}
            onChange={(e) => setPassword(e.nativeEvent.text)}
            style={styles.inputContainer}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              columnGap: 10,
            }}>
            <Text style={{ fontFamily: "light" }}>
              Already have an account?
            </Text>
            <Pressable
              onPress={() => {
                router.back();
              }}>
              <Text style={{ color: "#dc3131" }}>Log In</Text>
            </Pressable>
          </View>
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#FF6961" style={{ flex: 1 }} />
        )}

        <View style={{ flex: 1, marginTop: 20 }}>
          <Pressable
            onPress={handleSignup}
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
              Sign Up
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
    color: "black",
    paddingHorizontal: 20,
    fontFamily: "light",
  },
});

export default SignUpScreen;
