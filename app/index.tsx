import { View, Text, Button, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useFonts } from "expo-font";

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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        paddingHorizontal: 50,
        rowGap: 30,
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
        With our app, you can effectively manage your time
      </Text>
      <Pressable
        style={{
          backgroundColor: "#FF6961",
          alignSelf: "center",
          borderRadius: 10,
        }}
        onPress={() => router.push("./home")}>
        <Text
          style={{
            color: "white",
            fontFamily: "medium",
            fontSize: 20,
            padding: 15,
            textAlign: "center",
          }}>
          Get Started
        </Text>
      </Pressable>
    </View>
  );
};

export default WelcomeScreen;
