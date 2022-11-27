import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context/UserContext'
import { userFetch as uApi } from '../api/users.api'
import { NavBar,SubSet ,UserConfg,EntrySet,SetPerfil,GasFrec,DiaFacFre,SubAcc} from './ModulesForm'
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
//STATES
const [periodo, setPeriodo] = useState("");
const btnlistperiod = (e)=>{
  let lista= document.querySelector('.PeriodList')
  let flecha= document.querySelector('.PeriodList i')
  lista.classList.toggle("select")
  let alto = 0
  let listperiod = lista.nextElementSibling;
  flecha.style.rotate="90deg"
  if(listperiod.clientHeight == "0"){
    flecha.style.rotate="180deg"
    alto = listperiod.scrollHeight-2;
  }
  listperiod.style.height= alto+"px"
  if(e.target.textContent =="Periodos"||e.target.textContent =="Diario"||e.target.textContent =="Semanal"||e.target.textContent =="Quincenal"){
    if(e.target.textContent =="Periodos"){
      setPeriodo("Eligiendo...")
    }else{
      setPeriodo(e.target.textContent)
    }
  }else{
    setPeriodo("Eligiendo...")
  }
  //IDENTIFICADOR DE ENTRADA DE GASTO
}
const btndiasfac = ()=>{
  let diafacts = document.querySelector('.DiaFacFre')
  let listfacts = document.querySelector('.ListFrec')
  diafacts.style.display="block"
  listfacts.style.display="none"
}
const btnlistfrec = ()=>{
  let diafacts = document.querySelector('.DiaFacFre')
  let listfacts = document.querySelector('.ListFrec')
  diafacts.style.display="none"
  listfacts.style.display="block"
}
const btnvaciar = ()=>{
let vaciar = document.querySelector('.ContainerVaciar')
let terminos = document.querySelector('.ContainerTerminos')
let borrar = document.querySelector('.ContainerDelete')
terminos.style.display="none"
vaciar.style.display="block"
borrar.style.display="none"
}
const btnterminos = ()=>{
let vaciar = document.querySelector('.ContainerVaciar')
let terminos = document.querySelector('.ContainerTerminos')
let borrar = document.querySelector('.ContainerDelete')
borrar.style.display="none"
vaciar.style.display="none"
terminos.style.display="block"
}
const btnborrar = ()=>{
let vaciar = document.querySelector('.ContainerVaciar')
let terminos = document.querySelector('.ContainerTerminos')
let borrar = document.querySelector('.ContainerDelete')
vaciar.style.display="none"
terminos.style.display="none"
borrar.style.display="block"
}

const nav = useNavigate()

const { user, setUser } = useContext(UserContext);
  
useEffect(() => {
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
}, []);

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
                      <p>Un perfil idea para todo tiempo de estudiante de que este cursando el nivel medio superior, cuenta con los gastos comunes de estos ademas de tener de posibilidad de adicionar los que el estudiante quiera</p> 
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
              name={"Gas"}
              balance={"500"}
              des={"Gasto de consumo de agua de la casa de don juan"}
              date={"14/04/2024"}
              periodo={periodo}
              e={btnlistperiod}
              e2={btndiasfac}
              />
              <GasFrec 
              name={"Gas"}
              balance={"500"}
              des={"Gasto de consumo de agua de la casa de don juan"}
              date={"14/04/2024"}
              periodo={periodo}
              e={btnlistperiod}
              />
              <GasFrec 
              name={"Gas"}
              balance={"500"}
              des={"Gasto de consumo de agua de la casa de don juan"}
              date={"14/04/2024"}
              periodo={periodo}
              e={btnlistperiod}
              />
              </div>
              <div className="DiaFacFre">
              <div className="TitleListaGasFre">Días de Facturación de Agua</div>
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <DiaFacFre
                padre={"Agua"}
                cantidad={"5000"}
                date={"12/07/2022"}
                />
                <div className="BtnReturn" ><button className="BtnReturnFre" onClick={btnlistfrec} >Regresar a configuración de gastos frecuentes<i className="fa-solid fa-reply"></i></button></div>
              </div>
              
            </div>
            <div className="AccountSettings" id='AccountSettings'>
              <div><h1>Cuenta</h1></div>
              <div className="ContainerAcc">
                <div className="AccountBody">
                    <SubAcc name={"Vaciar Datos"} icons={"fa-solid fa-inbox"} e={btnvaciar}/>
                    <div className="LineAcc"></div>
                    <SubAcc name={"Términos y Condiciones"} icons={"fa-solid fa-book"} e={btnterminos}/>
                    <div className="LineAcc"></div>
                    <SubAcc name={"Borrar Cuenta"} icons={"fa-solid fa-fire"} e={btnborrar}/>
                </div>
                <div className="ContainerResultsAcc">
                  <div className="ContainerVaciar">
                    <h2>Vaciar Datos</h2>
                    <br></br>
                    <h3>Advertencia</h3>
                    <p>Si confirmas esta operación se eliminaran todos los registros que tengas hasta el momento, además de esto se borraran los gastos frecuentes, asi como sus configuraciones.</p>
                    <br></br>
                    <h3>Resumen</h3>
                    <p>Es comenzar desde cero. Perfecto para poder aplicarse en el cambio radical de tus gastos</p>
                    <div className="BtnsVaciar">
                      <div className="SetDat" ><button className="BtnSetDat">Cancelar</button></div>
                      <div className="SetDat" ><button className="BtnSetDat">Cambiar</button></div>
                    </div>
                  </div>
                  <div className="ContainerTerminos">
                    <h2>Terminos y Condiciones</h2>
                    <br></br>
                    <p>En esta parte podrás tener acceso a los Términos y Condiciones de la empresa Euclid Tech. Esto con el proposito de conozcas mejor la forma de trabajar de nosotros, estamos agradecidos de poder brindar productos de calidad por medio del software.</p>
                    <br></br>
                    <h3>Para mas detalle</h3>
                    <p>Puedes vistiar los siguientes links para ver los terminos y condiciones a detalle</p>
                  </div>
                  <div className="ContainerDelete">
                    <h2>Eliminar Cuenta</h2>
                    <br></br>
                    <h3>Advertencia</h3>
                    <p>Esta acción es irreversible, eliminara tu cuenta por completo sin nunguna posibilidad de acceder a ella.</p>
                    <br></br>
                    <h3>Sin Embargo</h3>
                    <p>En Baro podrás realizar mas cuentas si asi lo deseas, evidentemente vacias.</p>
                    <div className="BtnsDelete">
                      <div className="SetDat" ><button className="BtnSetDat">Cancelar</button></div>
                      <div className="SetDat" ><button className="BtnSetDat">Confirmar</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
    </div>
  )
}

