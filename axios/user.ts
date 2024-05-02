import axios from "axios";
import { apiUrl } from "./index";

export const signUp = async (
  firstName: string,
  username: string,
  password: string
) => {
  try {
    const res = await axios.post(`${apiUrl}/users`, {
      username,
      password,
      firstName,
    });
    return res.data;
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
  console.log("username", username);
  console.log("password", password);
  try {
    const res = await axios.get(`${apiUrl}/users`, {
      params: {
        username,
        password,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id: number) => {
  try {
    const res = await axios.get(`${apiUrl}/users/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
