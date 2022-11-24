import axios from "axios";

const HOST = "http://localhost:3000/api/";

export const userFetch = {
  createUser: async (user) => {
    try {
      const response = await axios.post(`${HOST}`, user);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (user) => {
    try {
      const response = await axios.get(`${HOST}`, user);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
