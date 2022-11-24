import axios from "axios";
// "http://localhost:3000/api/"
// 
const myAxios = axios({
  baseUrl: "http://localhost:3000/api/"
});

export const userFetch = {
  createUser: async (user) => {
    try {
      const response = await myAxios.post(`/users`, user);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  getUsers: async (user) => {
    try {
      const response = await myAxios.get(`/getUsers`, user);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
