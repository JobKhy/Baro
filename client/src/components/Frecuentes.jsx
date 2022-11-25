import React, { useContext, useEffect } from 'react'
import { NavBar,SubSet ,UserConfg,EntrySet,SetPerfil,GasFrec,DiaFacFre,SubAcc} from './ModulesForm'
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
            <div className="InfoFrec">
              <div className="IngreFrec">

              </div>
              <div className="JerFrec">
                
              </div>
            </div>
            <div className="GasProx">

            </div>
          </div>
          
        </div>    
    </div>

  )
}
