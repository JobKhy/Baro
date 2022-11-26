import axios from "axios";
// "http://localhost:3000/api/"
//
const myAxios = axios.create({
  baseURL: "https://baro.up.railway.app/api/",
});

export const ingresosFetch = {
  updateIngreso: async (ingreso) => {
    try {
      const response = await myAxios.get(`ingresos/updateIngreso/${ingreso}`);
      return response;
    } catch (e) {
      return e;
    }
  },
}