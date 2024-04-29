import { View, Text, Button } from "react-native";
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
      }}>
      <Text style={{ fontFamily: "medium" }}>WELCOME</Text>
      <Button title="Go to Home" onPress={() => router.push("/home")} />
    </View>
  );
};

export default WelcomeScreen;
