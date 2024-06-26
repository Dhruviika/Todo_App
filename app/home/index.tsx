import {
  View,
  Text,
  Button,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { getUser } from "../../axios/user";
import { createTodo, getTodos, deleteTodo, updateTodo } from "../../axios/todo";

interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

interface User {
  id: number;
  firstName: string;
  todos: Todo[];
}

const HomeScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const [todos, setTodos] = useState<Todo[]>();
  const [addTodo, setAddTodo] = useState(false);
  const [inputText, setInputText] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();

        if (res?.success) {
          setUser(res?.user);
          setTodos(res?.user?.todos);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  // console.log("user", user);

  useEffect(() => {
    if (!user) return; // Ensure user is defined

    console.log("refresh", refresh);

    const fetchTodos = async () => {
      try {
        const todos = await getTodos(Number(user.id)); // Use user.id directly here
        setTodos(todos);
        setRefresh(false);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
    // Fetch todos once when user is set

    if (refresh) {
      const intervalId = setInterval(fetchTodos, 1000); // Adjust timing as needed
      return () => {
        clearInterval(intervalId);
        setRefresh(false);
      };
    } // Cleanup interval on unmount
  }, [user, refresh]); // Depend on user state to re-run this effect

  return (
    <View style={styles.page}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={{ fontFamily: "maven", fontSize: 30 }}>
          Hi, {user?.firstName}!
        </Text>
        <Image
          source={{
            uri: `https://api.dicebear.com/8.x/avataaars/png?seed=${user?.id}`,
          }}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "#FFDDDD",
            borderRadius: 50,
          }}
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
        {addTodo && (
          <View>
            <TextInput
              placeholder="Add your task..."
              placeholderTextColor="grey"
              value={inputText}
              onChange={(e) => setInputText(e.nativeEvent.text)}
              style={{
                backgroundColor: "#FFDDDD",
                padding: 8,
                borderRadius: 10,
                marginBottom: 10,
                fontFamily: "maven",
                color: "#5C5F65",
                fontSize: 16,
              }}
            />
            <Pressable
              onPress={() => {
                createTodo(
                  inputText,
                  Number(user?.id),
                  setAddTodo,
                  setInputText
                );
                setRefresh(true);
              }}
              style={{ position: "absolute", right: 10, top: 5 }}>
              <FontAwesome6 name="circle-plus" size={30} color="#FF6961" />
            </Pressable>
          </View>
        )}
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={todos}
          renderItem={({ item, index }) => {
            return (
              <Pressable
                onLongPress={() => {
                  deleteTodo(item.id, Number(user?.id));
                  setRefresh(true);
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
                    const updatedTodos = todos?.map((todo) =>
                      todo.id === item.id
                        ? { ...todo, completed: !todo?.completed }
                        : todo
                    );
                    updateTodo(item.id, Number(user?.id), !item.completed);
                    setTodos(updatedTodos);
                    setRefresh(true);
                  }}>
                  {item?.completed ? (
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
                    textDecorationLine: item?.completed
                      ? "line-through"
                      : "none",
                  }}>
                  {item?.description}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <Pressable
        onPress={() => {
          setAddTodo(true);
        }}
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
