import axios from "axios";
// "http://localhost:3000/api/"
// 
const myAxios = axios.create({
  baseURL: "https://baro.up.railway.app/api/",
});

export const userFetch = {
  createUser: async (user) => {
    try {
      const response = await myAxios.post(`users`, user);
      return response;
    } catch (e) {
      return e;
    }
  },
  getUser: async (user) => {
    try {
      const response = await myAxios.post(`users/getUser`, user);
      return response;
    } catch (error) {
      return error;
    }
  },
  checkSession: async () => {
    try {
      const res = await myAxios.get(`/users/checkSession`);
      return res;
    } catch (error) {
      return error;
    }
  },
  setProfile: async (user) => {
    try {
      const res = await myAxios.post(`/users/setProfile`, user);
      return res;
    } catch (error) {
      return error;
    }
  },
  logout: async () => {
    try {
      const res = await myAxios.get(`/users/logout`);
      return res;
    } catch (error) {
      return error;
    }
  },
  updatePhoto: async (photo) => {
    try {
      const res = await myAxios.post(`/users/updatePhoto`, photo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  updateUser: async (user) => {
    try {
      const res = await myAxios.get(`/users/updateUser/${user}`);
      return res;
    } catch (error) {
      return error;
    }
  },
  cleanAccount: async () => {
    try {
      const res = await myAxios.get(`/users/cleanAccount`);
      return res;
    } catch (error) {
      return error;
    }
  },
  deleteAccount: async (password) => {
    try {
      const res = await myAxios.post(`/users/deleteAccount`, password);
      return res;
    } catch (error) {
      return error;
    }
  }
};
