import { View, Text, Button, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const dummyTasks = [
  {
    id: 1,
    title: "Finish the design",
    isCompleted: false,
  },
  {
    id: 2,
    title: "Prepare a presentation",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Call John",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Buy groceries",
    isCompleted: false,
  },
];

const HomeScreen = () => {
  const router = useRouter();
  const [todos, setTodos] = useState(dummyTasks);

  return (
    <View style={styles.page}>
      <View>
        <FlatList
          contentContainerStyle={{ gap: 5 }}
          data={todos}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                const updatedTodos = todos.map((todo) =>
                  todo.id === item.id
                    ? { ...todo, isCompleted: !todo.isCompleted }
                    : todo
                );
                setTodos(updatedTodos);
              }}
              style={{
                flexDirection: "row",
                columnGap: 10,
                alignItems: "center",
              }}>
              {item.isCompleted ? (
                <Ionicons name="checkbox" size={22} color="#5C5F65" />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank"
                  size={22}
                  color="#D3D3D3"
                />
              )}
              <Text
                style={{
                  fontFamily: "medium",
                  color: "#5C5F65",
                  textDecorationLine: item.isCompleted
                    ? "line-through"
                    : "none",
                }}>
                {item.title}
              </Text>
            </Pressable>
          )}
        />
        <Text>+ Add a Task</Text>
        <Button title="Profile" />
      </View>
    </View>
  );
};

const styles = {
  page: {
    padding: 20,
    backgroundColor: "white",
    flex: 1,
  },
};

export default HomeScreen;
