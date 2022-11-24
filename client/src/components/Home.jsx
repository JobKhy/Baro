import { Item, UserPf, Reciente, NavBar, IngGas, GasRec, Gasto } from "./ModulesForm"
import { useState } from "react";

export const Home = () => {

  const [disp, setDisp] = useState(true);
  const [disp2, setDisp2] = useState(false);

  return (
    <>
      <div className="home-body">
        <NavBar></NavBar>
        <div className="Balance">
          <UserPf User={"Gus of war"}></UserPf>
          <div className="BalanceDisp">
            <div className="BalanceCant">
              <h6 className="white">Balance Total</h6>
              <h1 className="white">$ 1,000,000</h1>
              <hr className="ww" />
              <h1 className="white">$ 1,000,000</h1>
              <h6 className="white">Balance Disponible</h6>
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