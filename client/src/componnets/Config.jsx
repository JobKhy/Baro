import React from 'react'
import { NavBar,SubSet ,UserConfg,EntrySet,SetPerfil,Perfil} from './ModulesForm'
//Para cambio de pestaña
export const Config = () => {
const btnperf = ()=>{
  document.querySelector('#PerfSettings').style.display="block"
  document.querySelector('#GasSettings').style.display="none"
  document.querySelector('#AccountSettings').style.display="none"
}
const btngas =()=>{
  document.querySelector('#PerfSettings').style.display="none"
  document.querySelector('#GasSettings').style.display="block"
  document.querySelector('#AccountSettings').style.display="none"
}
const btnacc =()=>{
  document.querySelector('#PerfSettings').style.display="none"
  document.querySelector('#AccountSettings').style.display="block"
  document.querySelector('#GasSettings').style.display="none"
}
//BOTONES DE PESTAÑA PERFIL
//Botones Name
const btnsetname = ()=>{
  document.querySelector('#BtnCanName').style.display="block"
  document.querySelector('#BtnUpName').style.display="block"
  document.querySelector('#SetName').disabled=false
  document.querySelector('#BtnSetName').style.display="none"
}
const btncanname = ()=>{
  document.querySelector('#BtnSetName').style.display="block"
  document.querySelector('#BtnCanName').style.display="none"
  document.querySelector('#BtnUpName').style.display="none"
  document.querySelector('#SetName').disabled=true
}
const btnupname = ()=>{
  document.querySelector('#BtnSetName').style.display="block"
  document.querySelector('#BtnCanName').style.display="none"
  document.querySelector('#BtnUpName').style.display="none"
  document.querySelector('#SetName').disabled=true
  //AQUI CODIGO DE CAMBIAR EL NOMBRE EN LA BASE DE DATOS

}
//Botones Email
const btnsetemail = ()=>{
  document.querySelector('#BtnCanEmail').style.display="block"
  document.querySelector('#BtnUpEmail').style.display="block"
  document.querySelector('#SetEmail').disabled=false
  document.querySelector('#BtnSetEmail').style.display="none"
}
const btncanemail = ()=>{
  document.querySelector('#BtnSetEmail').style.display="block"
  document.querySelector('#BtnCanEmail').style.display="none"
  document.querySelector('#BtnUpEmail').style.display="none"
  document.querySelector('#SetEmail').disabled=true
}
const btnupemail = ()=>{
  document.querySelector('#BtnSetEmail').style.display="block"
  document.querySelector('#BtnCanEmail').style.display="none"
  document.querySelector('#BtnUpEmail').style.display="none"
  document.querySelector('#SetEmail').disabled=true
  //AQUI CODIGO DE CAMBIAR EL CORREO EN LA BASE DE DATOS

}
//Botones Pass
const btnsetpass = ()=>{
  document.querySelector('#BtnCanPass').style.display="block"
  document.querySelector('#BtnUpPass').style.display="block"
  document.querySelector('#SetPass').disabled=false
  document.querySelector('#BtnSetPass').style.display="none"
}
const btncanpass = ()=>{
  document.querySelector('#BtnSetPass').style.display="block"
  document.querySelector('#BtnCanPass').style.display="none"
  document.querySelector('#BtnUpPass').style.display="none"
  document.querySelector('#SetPass').disabled=true
}
const btnuppass = ()=>{
  document.querySelector('#BtnSetPass').style.display="block"
  document.querySelector('#BtnCanPass').style.display="none"
  document.querySelector('#BtnUpPass').style.display="none"
  document.querySelector('#SetPass').disabled=true
  //AQUI CODIGO DE CAMBIAR LA CONTRASEÑA EN LA BASE DE DATOS

}
//BOTONES DE CAMBIO DE PERFIL
const setperf = ()=>{
  document.querySelector('#YourType').style.display="none"
  document.querySelector('#SelectType').style.display="block"
}
const canperf = ()=>{
  document.querySelector('#YourType').style.display="block"
  document.querySelector('#SelectType').style.display="none"
}
  return (
    <div className='home-body-w'>
        <NavBar initialActive={3}></NavBar>
        <div className="colGraph">
          <div className="typeOfGraph">
                  <h1>Config</h1>
          </div>
          <div className="Config">
            <div className="PagSet">
              <div className="Perfil">
                <UserConfg User={"Gus of war"}/>
              </div>
              <div className="SubSet">
                <SubSet name={"Perfil"} icons={"fa-solid fa-dumbbell"} e={btnperf}/>
                <div className="Line"></div>
                <SubSet name={"Gastos"} icons={"fa-solid fa-dumbbell"} e={btngas}/>
                <div className="Line"></div>
                <SubSet name={"Account"} icons={"fa-solid fa-dumbbell"} e={btnacc}/>
              </div>
            </div>
            <div className="PerfSettings" id='PerfSettings'>
              <h1>Settings</h1>
              <div className="PerfBody">
                <div className="PerfLeft">
                  <div className="PerfData">
                    <EntrySet 
                    Id={"SetName"}
                    Name={"Nombre"}
                    Type={"text"}
                    id1={"BtnSetName"}
                    id2={"BtnCanName"}
                    id3={"BtnUpName"}
                    e1={btnsetname}
                    e2={btncanname}
                    e3={btnupname}
                    ></EntrySet>
                    <EntrySet 
                    Id={"SetEmail"}
                    Name={"Email"}
                    Type={"text"}
                    id1={"BtnSetEmail"}
                    id2={"BtnCanEmail"}
                    id3={"BtnUpEmail"}
                    e1={btnsetemail}
                    e2={btncanemail}
                    e3={btnupemail}
                    ></EntrySet>
                    <EntrySet 
                    Id={"SetPass"}
                    Name={"Contraseña"}
                    Type={"text"}
                    id1={"BtnSetPass"}
                    id2={"BtnCanPass"}
                    id3={"BtnUpPass"}
                    e1={btnsetpass}
                    e2={btncanpass}
                    e3={btnuppass}
                    ></EntrySet>
                  </div>
                  <div className="PerfImg">
                  Hola
                 </div>
                </div>
                <div className="PerfType" id='YourType'>
                    <h1>Tu tipo de perfil actual es</h1>
                    <div className="TypeBody">
                    <button className="YourPerf" type="submit" disabled>
                      <i className={"fa-solid fa-school"}></i>
                      <br></br>
                      <div className="text">
                        <h4>Estudiante</h4>
                      </div>
                    </button>
                    <div className="DesYourType">lajdlkajflkasdjflkjsdklfasdklfjlkadjflkasdjflkasdjflak </div>
                    <button className='BtnChangeType' onClick={setperf}>Cambiar Perfil</button>
                    </div>
                </div>
                <div className="PerfType DisNone" id='SelectType'>
                    <h1>¿A que tipo de perfil quieres cambiar?</h1>
                    <div className="TypeBody">
                      <SetPerfil 
                      icon={"fa-solid fa-school"} 
                      perfil={"Estudiante"}
                      />
                      <SetPerfil 
                      icon={"fa-solid fa-school"} 
                      perfil={"Estudiante"}
                      />
                      <SetPerfil 
                      icon={"fa-solid fa-school"} 
                      perfil={"Estudiante"}
                      />
                      <SetPerfil 
                      icon={"fa-solid fa-school"} 
                      perfil={"Estudiante"}
                      />
                      <button className='BtnChangeType' onClick={canperf}>Cancel</button>
                    </div>
                </div>
              </div>
            </div>
            <div className="GasSettings" id='GasSettings'>
              <div><h1>Gastos</h1></div>
              <Perfil icon={"fa-solid fa-school"} perfil={"Estudiante"} descripcion={"En este perfil encontraras gastos basicos como transporte, telefonia y alimentos."} des={'../home'}></Perfil>

            </div>
            <div className="AccountSettings" id='AccountSettings'>
              <div><h1>Account</h1></div>
            </div>
          </div>
        </div>    
    </div>
  )
}

