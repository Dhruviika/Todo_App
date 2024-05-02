import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { signUp } from "../../axios/user";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async () => {
    const res = await signUp(name, username, password);
    console.log(res);
    if (res) {
      router.push("../home");
    }
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
            Sign in to your account
          </Text>
        </View>
        <View
          style={{
            flex: 3,
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

        <View style={{ flex: 3 }}>
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
