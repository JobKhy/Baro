import axios from "axios";
// "http://localhost:3000/api/"
//
const myAxios = axios.create({
  baseURL: "http://localhost:3000/api/"
});

export const userFetch = {
  createUser: async (user) => {
    try {
      const response = await myAxios.post(`users`, user);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  getUsers: async (user) => {
    try {
      const response = await myAxios.get(`/users/getUsers`, user);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  checkSession: async () => {
    try {
      const res = await myAxios.get(`/users/checkSession`);
    } catch (error) {
      console.log(error);
      return;
    }
  }
};
