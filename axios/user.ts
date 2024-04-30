import axios from "axios";
import { apiUrl } from "./index";

export const signUp = async (
  firstname: string,
  username: string,
  password: string
) => {
  try {
    const res = await axios.post(`${apiUrl}/users`, {
      firstname,
      username,
      password,
    });
    console.log(res.data);
    if (!res) return null;
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (username: string, password: string) => {
  const res = await axios.post(`${apiUrl}/users`, {
    username,
    password,
  });
  return res.data;
};
