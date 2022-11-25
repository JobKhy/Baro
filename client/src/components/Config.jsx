import React from 'react'
import { NavBar,SubSet ,UserConfg,EntrySet,SetPerfil,GasFrec} from './ModulesForm'
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

const btnlistperiod = ()=>{
  let lista= document.querySelector('.PeriodList')
  lista.classList.toggle("select")
  let alto = 0
  let listperiod = lista.nextElementSibling;
  if(listperiod.clientHeight == "0"){
    alto = listperiod.scrollHeight-2;
  }
  listperiod.style.height= alto+"px"
}
  return (
    
    <div className='home-body-w'>
        <NavBar initialActive={3}></NavBar>
        <div className="colGraph">
          <div className="typeOfGraph">
                  <h1>Configuración</h1>
          </div>
          <div className="Config">
            <div className="PagSet">
              <div className="Perfil">
                <UserConfg User={"Gus of war"}/>
              </div>
              <div className="SubSet">
                <SubSet name={"Perfil"} icons={"fa-solid fa-user"} e={btnperf}/>
                <div className="Line"></div>
                <SubSet name={"Gastos"} icons={"fa-solid fa-chart-simple"} e={btngas}/>
                <div className="Line"></div>
                <SubSet name={"Cuenta"} icons={"fa-solid fa-person"} e={btnacc}/>
              </div>
            </div>
            <div className="PerfSettings" id='PerfSettings'>
              <h1>Perfil</h1>
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
                    <div className="ConUserPf-Set">
                      <div className="Confcircle-Set">
                        <div className="ConfcircleImg-Set"></div>
                      </div>
                    </div>
                    <div className="SetPhoto">
                      <p>Cambiar Foto</p>
                      <input type={"file"} className="SetPhotoIn"></input>
                    </div>
                  </div>
                </div>
                <div className="PerfType" id='YourType'>
                    <h1>Tu tipo de perfil actual es</h1>
                    <div className="TypeBody">
                    <SetPerfil 
                      icon={"fa-solid fa-school"} 
                      perfil={"Estudiante"}
                      />
                    <div className="DesYourType">
                      <h2 className='DesYourType-Title'>Descripción</h2>
                      <p className='DesYourType-Des'>lajdlkajflkasdjflkjsdklfasdklfjlkadjflkasdj</p> 
                    </div>
                    <div className="AlertYourType">
                      <h2 className='AlertYourType-Title'>Alerta</h2>
                      <p className='AlertYourType-Des'>Si cambia de perfil va a perder todos sus gastos frecuentes</p> 
                    </div>
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
                      icon={"fa-solid fa-briefcase"} 
                      perfil={"Trabajador"}
                      />
                      <SetPerfil 
                      icon={"fa-solid fa-house"} 
                      perfil={"Sin oficio"}
                      />
                      <SetPerfil 
                      icon={"fa-solid fa-user"} 
                      perfil={"Otro"}
                      />
                      <button className='BtnChangeType' onClick={canperf}>Cancelar</button>
                    </div>
                </div>
              </div>
            </div>
            <div className="GasSettings" id='GasSettings'>
              <div><h1>Gastos</h1></div>
              <div className="ListFrec">
              <GasFrec 
              e={btnlistperiod}
              />
              </div>
            </div>
            <div className="AccountSettings" id='AccountSettings'>
              <div><h1>Cuenta</h1></div>
              <div className="AccountBody">
                
              </div>
            </div>
          </div>
        </div>    
    </div>
  )
}

