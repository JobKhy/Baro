import { DayNGas, Graph, NavBar,DayGas } from "./ModulesForm";
import "../style.css";
import "../css/Extras.css";
import { useContext, useEffect } from "react";
import { userFetch as uApi, userFetch } from "../api/users.api";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export const Graficas = () => {
  const nav = useNavigate()

  const { user, setUser } = useContext(UserContext);
  
  useEffect(() => {
    async function fetchUser() {
      const res = await userFetch.checkSession();
      if (res?.status === 200) {
        setUser(res.data.user);
        console.log(res.data.user);
      } else {
        nav("/login");
      }
    }
    if (!user) {
      fetchUser();
    }
  }, []);
  
  return (
    <>
      <div className="home-body-w">
        <NavBar initialActive={1}></NavBar>
        <div className="colGraph">
          <div className="typeOfGraph">
            <div className="WeekTitle">
            <h1>Semanas</h1>
            <h2>12/10/22 --- 18/12/22</h2>
            </div>
            <div className="DaysTitle">
            <h1>Lunes</h1>
            <h2>18/12/22</h2>
            </div>
          </div>
          <div className="ow">
            <div className="Week">
              <div className="semData">
                <h2>Días</h2>
                <div className="showDatGrap">
                  <DayNGas dat={"Lunes"} date={"12/10/22"} amount={46546} />
                  <DayNGas dat={"Martes"} date={"13/10/22"} amount={46546} />
                  <DayNGas dat={"Miercoles"} date={"14/10/22"} amount={46546} />
                  <DayNGas dat={"Jueves"} date={"15/10/22"} amount={46546} />
                  <DayNGas dat={"Viernes"} date={"16/10/22"} amount={46546} />
                  <DayNGas dat={"Sabado"} date={"17/10/22"} amount={46546} />
                  <DayNGas dat={"Domingo"} date={"18/10/22"} amount={46546} />
                </div>
              </div>
              <div className="Graph">
                <Graph></Graph>
              </div>
            </div>
            <div className="Days">
              <div className="DaysData">
                <h2>Gastos</h2>
                <div className="GasDaysList">
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                  <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                   <DayGas
                  name={"Comida"}
                  cant={"400"}
                  />
                </div>
              </div>
              <div className="GasData">
                <h2>Datos del Gasto</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
