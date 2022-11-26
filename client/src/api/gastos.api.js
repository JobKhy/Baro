import axios from "axios";
// "http://localhost:3000/api/"
//
const myAxios = axios.create({
  baseURL: "http://localhost:3000/api/",
});

export const gastosFetch = {
  createGastoDiario: async (gasto) => {
    try {
      const response = await myAxios.post(`gastos/createGastoDiario`, gasto);
      return response;
    } catch (e) {
      console.log(e)
      return e;
    }
  }
}