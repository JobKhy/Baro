import {Perfil} from  "./ModulesForm"

export const Perfiles = () =>{
   return(

    <>

        <div className="Bt-content">
            <div className="form-title">Elige tu perfil</div>
            <Perfil icon={"fa-solid fa-school"} perfil={"Estudiante"} descripcion={"En este perfil encontraras gastos basicos como transporte, telefonia y alimentos."} des={'../home'}></Perfil>
            <Perfil icon={"fa-solid fa-briefcase"} perfil={"Trabajador"} descripcion={"Este perfil cuenta con gastos básicos del hogar, así como los personales más importantes"} des={'../home'} ></Perfil>
            <Perfil icon={"fa-solid fa-house"} perfil={"Sin oficio"} descripcion={"Este perfil va orientado a personas las cuales no laboren, por lo que encontrarás gastos más personales."} des={'../home'} ></Perfil>
            <Perfil perfil={"Otro"} icon={"fa-solid fa-user"} descripcion={"Esta opción te permitirá organizar tus gastos desde cero, completamente personalizables"} des={'../home'}></Perfil>
        </div>
    </>


   )
}
