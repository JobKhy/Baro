import React, { useContext, useEffect } from 'react'
import { NavBar,ColorFrec,GasProx,Entry2,PeriodPleg} from './ModulesForm'
import "../css/Extras.css"
import UserContext from '../context/UserContext';
import { userFetch } from '../api/users.api';
import { useNavigate } from 'react-router-dom';

export const Frecuentes = () => {

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
    <div className='home-body-w'>
        <NavBar initialActive={2}></NavBar>
        <div className="colGraph">
          <div className="typeOfGraph">
                  <h1>Frecuentes</h1>
          </div>
          <div className="BodyFrec">
            <div className="BodyLeft">
             <div className="FormFrec">
              <div className="FormFrecTitle">
               <h2>Ingresa un gasto frecuente</h2>
              </div>
              <div className="FormTopFrec">
                <div className="FormLeftFrec">
                 <Entry2 
                  Id={""}
                  Name={"Nombre"}
                  Type={"text"}
                  />
                </div>
                <div className="FormRightFrec">
                 <PeriodPleg
                 names={"h"}
                 />
                <h2>{"Periodo de facturación: "}</h2>
                <p></p>
                </div>
              </div>
              <div className="FormBottomFrec">
                  <Entry2 
                  Id={""}
                  Name={"Descripción"}
                  Type={"text"}
                  />
                  <button className='BtnChangeTypeF'>Agregar</button>                    
              </div>
             </div>
              <div className="InfoFrec">
                <h2>Indicativos</h2>
                <ColorFrec
                color={"ColorFrec-low"}
                data={"Prioridad baja"}
                />
                <ColorFrec
                color={"ColorFrec-medium"}
                data={"Prioridad media"}
                />
                <ColorFrec
                
                color={"ColorFrec-high"}
                data={"Prioridad alta"}
                />
              </div>
            </div>
            <div className="ListProx">
              <div className="ListFreTitle">
                <h1>Gastos Próximos</h1>
              </div>
              <div className="ListFreBody">
              <GasProx
              name={"Renta"}
              balance={"2500"}
              time={"3"}
              periodo={"Semanal"}
              color={"ColorIndicate-low"}
              date={"20/9/2021"}
              />
              <GasProx
              name={"Renta"}
              balance={"2500"}
              time={"3"}
              periodo={"Semanal"}
              color={"ColorIndicate-medium"}
              date={"20/9/2021"}
              />
              <GasProx
              name={"Renta"}
              balance={"2500"}
              time={"3"}
              periodo={"Semanal"}
              color={"ColorIndicate-high"}
              date={"20/9/2021"}
              />
              </div>
           </div>
          </div>
        </div>    
    </div>

  )
}
