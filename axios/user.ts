import axios, { AxiosRequestConfig } from "axios";
import { apiUrl } from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = async (
  firstName: string,
  username: string,
  password: string
) => {
  try {
    const res = await axios.post(`${apiUrl}/users/signup`, {
      username,
      password,
      firstName,
    });
    if (res?.data?.token) {
      await AsyncStorage.setItem("token", res.data.token);
    }

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllUsers = async () => {
//   try {
//     const res = await axios.get(`${apiUrl}/users/all`);
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const signIn = async (username: string, password: string) => {
  // console.log("username", username);
  // console.log("password", password);
  try {
    const res = await axios.post(`${apiUrl}/users/login`, {
      username,
      password,
    });

    if (res?.data?.token) {
      await AsyncStorage.setItem("token", res.data.token);
    }

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async () => {
  const token = await AsyncStorage.getItem("token");
  console.log("token", token);
  const config: AxiosRequestConfig = {
    headers: {
      "auth-token": token,
    },
  };
  try {
    const res = await axios.get(`${apiUrl}/users/me`, config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
