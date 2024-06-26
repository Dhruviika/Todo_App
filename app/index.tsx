import { View, Text, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    light: require("../assets/fonts/Inter-Light.ttf"),
    regular: require("../assets/fonts/Inter-Regular.ttf"),
    medium: require("../assets/fonts/Inter-Medium.ttf"),
    semibold: require("../assets/fonts/Inter-SemiBold.ttf"),
    bold: require("../assets/fonts/Inter-Bold.ttf"),
    maven: require("../assets/fonts/MavenPro-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <LinearGradient
        colors={["#E8F0FC", "#FCF1E8", "#FCE8FA", "#E8FCE8"]}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          paddingHorizontal: 50,
          rowGap: 30,
          backgroundColor: "linear-gradient(180deg, #82A0CE, #DFB3CB, white)",
        }}>
        <Text
          style={{
            fontFamily: "maven",
            fontSize: 30,
            textAlign: "center",
          }}>
          Manage Your Daily Todo
        </Text>
        <Text
          style={{
            fontFamily: "light",
            fontSize: 18,
            textAlign: "center",
          }}>
          With our app, you can easily manage your time
        </Text>
        <Pressable
          style={{
            backgroundColor: "#FF6961",
            alignSelf: "center",
            borderRadius: 30,
          }}
          onPress={() => router.push("./auth")}>
          <Text
            style={{
              color: "white",
              fontFamily: "medium",
              fontSize: 20,
              padding: 15,
              paddingHorizontal: 30,
              textAlign: "center",
            }}>
            Get Started
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default WelcomeScreen;
