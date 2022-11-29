import axios from "axios";
// "http://localhost:3000/api/"
//
const myAxios = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const ingresosFetch = {
  updateIngreso: async (ingreso) => {
    try {
      const response = await myAxios.post(`ingresos/updateIngreso/`, ingreso);
      return response;
    } catch (e) {
      return e;
    }
  },
}