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
  },
  getGastos: async ()=>{
    try {
      const res = await myAxios.get("gastos/getGastos")
      return res
    } catch (error) {
      console.log(error)
      return error
    }
  }, 
  getSemanas: async ()=>{
    try {
      const res = await myAxios.get("gastos/getSemanas")
      return res
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

const frecuentesFetch = {
  
}