import { useRouter, Stack } from "expo-router";

export default () => {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Welcome",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
