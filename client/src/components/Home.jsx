import { Item, UserPf, Reciente, NavBar, IngGas, GasRec, Gasto } from "./ModulesForm"
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userFetch as uApi } from "../api/users.api";

export const Home = () => {

  const nav = useNavigate()
  const {user, setUser} = useContext(UserContext)

  const [disp, setDisp] = useState(true);
  const [disp2, setDisp2] = useState(false);

  useEffect(()=>{
    async function fetchUser() {
      const res = await uApi.checkSession();
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
  }, [])

  return (
    <>
      <div className="home-body">
        <NavBar></NavBar>
        <div className="Balance">
          <UserPf User={user?.name}></UserPf>
          <div className="BalanceDisp">
            <div className="BalanceCant">
              <h1 className="white">$ {user?.balance}</h1>
              <h6 className="white">Balance Disponible</h6>
              <hr className="ww" />
            </div>
            <div className="BalanceMenu">
            <button onClick={() => {setDisp2(true), setDisp(true)}}>
              <Item secc={'gasto'} icons={'fa-solid fa-arrow-right-to-bracket'} />
            </button>
              <button onClick={() => {setDisp(false),setDisp2(false)}}>
                <Item secc={'ingreso'} icons={'fa-regular fa-square-caret-down'}/>
              </button>
              <button onClick={() => {setDisp(true), setDisp2(false)}}>
                <Item secc={'mas'} icons={'fa-solid fa-ellipsis'} />
              </button> 
              
            </div>
          </div>
        </div>
        <div className="GasRec">
        {
          disp?(
            disp2?(
              <Gasto></Gasto>
            ):(
              <GasRec></GasRec>
            )
          ):(
            <IngGas></IngGas>
          )
      }
        </div> 

      </div>
    </>
  )
}

/* hola */