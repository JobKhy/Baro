import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userFetch } from "../api/users.api";
import UserContext from "../context/UserContext";
import { Perfil } from "./ModulesForm";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Perfiles = () => {

  const nav = useNavigate();

  const {user} = useContext(UserContext)

  useEffect(()=>{
    async function fetchUser(){
      console.log(user.id)
      const res = await userFetch.setProfile({id: user.id})
      if(res?.status !== 200){
        nav("/home")
      }
    }
    fetchUser()
  }, [user])

  return (
    <>
      <div className="Bt-content">
        <div className="form-title">Elige tu perfil</div>
        <Perfil
          icon={"fa-solid fa-school"}
          perfil={"Estudiante"}
          descripcion={
            "En este perfil encontraras gastos basicos como transporte, telefonia y alimentos."
          }
          onClick={async ()=>{
            const res = await userFetch.setProfile({id: user.id, profile: 1})
            console.log(res)
            if(res.status === 200){
              MySwal.fire({
                title: "Perfil Estudiante",
                text: "Perfil Estudiante seleccionado exitosamente",
                icon: "success",
                timer: 3000,
              }).then(()=>{
                nav("/home")
              })
            }else{
              MySwal.fire({
                title: "Error",
                text: res.response.data.message,
                icon: "error",
              });
            }
          }}
        ></Perfil>
        <Perfil
          icon={"fa-solid fa-briefcase"}
          perfil={"Trabajador"}
          descripcion={
            "Este perfil cuenta con gastos básicos del hogar, así como los personales más importantes"
          }
          onClick={async ()=>{
            const res = await userFetch.setProfile({id: user.id, profile: 2})
            console.log(res)
            if(res.status === 200){
              MySwal.fire({
                title: "Perfil Trabajador",
                text: "Perfil Trabajador seleccionado exitosamente",
                icon: "success",
                timer: 3000,
              }).then(()=>{
                nav("/home")
              })
            }else{
              MySwal.fire({
                title: "Error",
                text: res.response.data.message,
                icon: "error",
              });
            }
          }}
        ></Perfil>
        <Perfil
          icon={"fa-solid fa-house"}
          perfil={"Sin oficio"}
          descripcion={
            "Este perfil va orientado a personas las cuales no laboren, por lo que encontrarás gastos más personales."
          }
          onClick={async ()=>{
            const res = await userFetch.setProfile({id: user.id, profile: 3})
            console.log(res)
            if(res.status === 200){
              MySwal.fire({
                title: "Perfil Sin Oficio",
                text: "Perfil Sin Oficio seleccionado exitosamente",
                icon: "success",
                timer: 3000,
              }).then(()=>{
                nav("/home")
              })
            }else{
              MySwal.fire({
                title: "Error",
                text: res.response.data.message,
                icon: "error",
              });
            }
          }}
        ></Perfil>
        <Perfil
          perfil={"Otro"}
          icon={"fa-solid fa-user"}
          descripcion={
            "Esta opción te permitirá organizar tus gastos desde cero, completamente personalizables"
          }
          onClick={async ()=>{
            const res = await userFetch.setProfile({id: user.id, profile: 4})
            console.log(res)
            if(res.status === 200){
              MySwal.fire({
                title: "Perfil Otro",
                text: "Perfil Otro seleccionado exitosamente",
                icon: "success",
                timer: 3000,
              }).then(()=>{
                nav("/home")
              })
            }else{
              MySwal.fire({
                title: "Error",
                text: res.response.data.message,
                icon: "error",
              });
            }
          }}
        ></Perfil>
      </div>
    </>
  );
};
