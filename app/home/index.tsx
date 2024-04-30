import { View, Text, Button, FlatList, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontFamily: "maven", fontSize: 30 }}>Hi, Igor!</Text>
        <Image
          source={require("../../assets/profile/giraffe.png")}
          style={{ width: 60, height: 60 }}
        />
      </View>
      <View
        style={{
          backgroundColor: "#FFDDDD",
          marginVertical: 20,
          marginHorizontal: 8,
          padding: 15,
          rowGap: 5,
          borderRadius: 15,
        }}>
        <Text style={{ fontFamily: "medium", fontSize: 18 }}>Go Premium!</Text>
        <Text style={{ fontFamily: "maven", fontSize: 16, color: "#5C5F65" }}>
          Get unlimited access to all features!
        </Text>
      </View>
      <Text style={{ fontFamily: "maven", fontSize: 23, marginBottom: 10 }}>
        My tasks
      </Text>
      <View style={{ marginHorizontal: 5 }}>
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={todos}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onLongPress={() => {
                  const updatedTodos = todos.filter(
                    (todo) => todo.id !== item.id
                  );
                  setTodos(updatedTodos);
                }}
                style={{
                  flexDirection: "row",
                  columnGap: 10,
                  alignItems: "center",
                  backgroundColor:
                    index % 4 === 0
                      ? "#E8F0FC"
                      : index % 4 === 1
                      ? "#FCF1E8"
                      : index % 4 === 2
                      ? "#FCE8FA"
                      : "#E8FCE8",
                  padding: 8,
                  borderRadius: 10,
                }}>
                <Pressable
                  onPress={() => {
                    const updatedTodos = todos.map((todo) =>
                      todo.id === item.id
                        ? { ...todo, isCompleted: !todo.isCompleted }
                        : todo
                    );
                    setTodos(updatedTodos);
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
                </Pressable>
                <Text
                  style={{
                    fontFamily: "maven",
                    color: "#5C5F65",
                    fontSize: 16,
                    textDecorationLine: item.isCompleted
                      ? "line-through"
                      : "none",
                  }}>
                  {item.title}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <Pressable
        style={{ position: "absolute", alignSelf: "center", bottom: 80 }}>
        <FontAwesome6 name="circle-plus" size={50} color="#FF6961" />
      </Pressable>
    </View>
  );
};

const styles = {
  page: {
    padding: 20,
    paddingVertical: 40,
    backgroundColor: "white",
    flex: 1,
  },
};

export default HomeScreen;
