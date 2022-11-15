import axios from "axios";

const HOST = "http://localhost:3000/api/users";

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${HOST}`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
