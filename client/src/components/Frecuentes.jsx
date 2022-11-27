import React, { useContext, useEffect } from 'react'
import { NavBar,ColorFrec,GasFrec} from './ModulesForm'
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
              <GasFrec/>
                <GasFrec/>
              </div>
           </div>
          </div>
        </div>    
    </div>

  )
}
