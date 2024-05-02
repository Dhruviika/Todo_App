import axios from "axios";
import { apiUrl } from "./index";
import { set } from "date-fns";

export const createTodo = async (
  description: string,
  userId: number,
  setAddTodo: (value: boolean) => void,
  setInputText: (value: string) => void
) => {
  console.log("createTodo", description, userId);
  try {
    const res = await axios.post(`${apiUrl}/todos/${userId}`, {
      description,
    });

    setInputText("");
    setAddTodo(false);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTodos = async (userId: number) => {
  try {
    const res = await axios.get(`${apiUrl}/todos/${userId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (
  todoId: number,
  userId: number,
  completed: boolean
) => {
  try {
    const res = await axios.put(`${apiUrl}/todos/${todoId}`, {
      todoId,
      userId,
      completed,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (todoId: number, userId: number) => {
  try {
    const res = await axios.delete(`${apiUrl}/todos/${todoId}`, {
      data: {
        todoId,
        userId,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
