import React, { useContext, useEffect } from 'react'
import { NavBar } from './ModulesForm'
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
    <div>
        <NavBar initialActive={2}></NavBar>
        <div className="ow">
            hola
        </div>
    </div>
  )
}
