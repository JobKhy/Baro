import { DayNGas, Graph, NavBar } from "./ModulesForm";
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
            <h1>semana</h1>
          </div>
          <div className="ow">
            <div className="semData">
              <h2>semana</h2>
              <div className="showDatGrap">
                <DayNGas dat={"hola"} date={"12/10/22"} amount={46546} />
                <DayNGas dat={"hola"} date={"12/10/22"} amount={46546} />
                <DayNGas dat={"hola"} date={"12/10/22"} amount={46546} />
                <DayNGas dat={"hola"} date={"12/10/22"} amount={46546} />
                <DayNGas dat={"hola"} date={"12/10/22"} amount={46546} />
              </div>
            </div>
            <div className="Graph">
              <Graph></Graph>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
