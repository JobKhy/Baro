import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

///Botones
export const Button = ({ type, value, btnclass, dest, disabled }) => {
  const [name] = useState(value);
  return dest ? (
    <Link to={dest}>
      <button className={btnclass}>
        {name}
      </button>
    </Link>
  ) : (
    
    <button type={type} className={btnclass} disabled={disabled}>
      {name}
    </button>
  );
};

//ittems
export const Item = ({ secc, icons, sel }) => {
  return (
    <li className={sel}>
      <Link>
        <span className="NavIcon">
          <i className={icons}></i>
        </span>
        <span className="Navtext">{secc}</span>
      </Link>
    </li>
  );
};

//Inputs
export const Entry = ({ Id, Name, Type, ExtraProps }) => {
  return (
    <div className="login-container">
      <div className="login-group">
        <input
          className="login-input"
          type={Type}
          placeholder=" "
          id={Id}
          {...ExtraProps}
        />
        <label className="login-label">{Name}</label>
        <span className="login-line"></span>
      </div>
    </div>
  );
};

//Usuario
export const UserPf = ({ User }) => {
  return (
    <div className="UserPf">
      <div className="circle">
        <div className="circleImg"></div>
      </div>
      <div className="NamePf">
        <h3>Bienvenido</h3>
        <h2>{User}</h2>
      </div>
    </div>
  );
};
//Gastos recientes
export const Reciente = ({ gasto, value, date, icons }) => {
  return (
    <div className="GasUnit">
      <li>
        <div className="GasDat">
          <span className="GasIcon">
            <i className={icons}></i>
          </span>
          <span className="GasName">{gasto}</span>
        </div>
        <span className="GasDate">{date}</span>
        <span className="GasCos"> ${value}</span>
      </li>
    </div>
  );
};

//Botones de Registro de perfiles

export const Perfil = ({ icon, perfil, descripcion, des }) => {
  return (
    <Link to={des}>
      <button className="Bt-perfiles" type="submit">
        <i className={icon}></i>
        <br></br>
        <div className="text">
          <h4>{perfil}</h4>
          <br></br>
          <p>{descripcion}</p>
        </div>
      </button>
    </Link>
  );
};

export const NavBar = ({ initialActive }) => {
  const Menus = [
    { Name: "Home", icon: "fa-solid fa-house", dest: "../home" },
    { Name: "Graficas", icon: "fa-solid fa-chart-simple", dest: "../graficas" },
    { Name: "Frecuentes", icon: "fa-solid fa-dollar-sign", dest: "../frecuentes" },
    { Name: "Config", icon: "fa-solid fa-bars", dest: "../config" },
    { Name: "Salir", icon: "fa-solid fa-arrow-right-from-bracket", dest: ".." },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    let done = false;
    if (!done) {
      if (initialActive) {
        setActive(initialActive);
      }
    }
    return () => {
      done = true;
    };
  }, []);

  return (
    <div className="NavBarr">
      <ul>
        {Menus.map((menu, i) => (
          <li key={i}>
            <Link
              onClick={() => {
                if (!initialActive) setActive(i);
              }}
              to={menu.dest}
            >
              <span className={`${active === i ? "NavIconAct" : "NavIcon"}`}>
                <i className={menu.icon}></i>
              </span>
              <span className={` ${active === i ? "NavtextShow" : "Navtext"}`}>
                {menu.Name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export const DayNGas = ( {dat, date, amount} ) => {
  return (
    <div className="DatGrap">
      <span>{ dat }</span>
      <span>{ date }</span>
      <span>${ amount }</span>
    </div>
  )
}

import diosYe from "../Img/diosYe.png"

export const Graph = () => {
  return (
    <div>
      <img src={diosYe} alt="" className="ye"/>
    </div>
  )
}

/*COMPONENTES GUSTAVO*/

export const SubSet = ({ name, icons,e }) => {
  return (
        <div className="OpcSet">
            <span className="OpcName">
              <button className="OpcBtn" onClick={e}>
                <span className="GasIcon">
                  <i className={icons}></i>
                </span>
                {name}
              </button></span>
        </div>
  );
};

export const UserConfg = ({ User }) => {
  return (
    <div className="ConUserPf">
      <div className="Confcircle">
        <div className="ConfcircleImg"></div>
      </div>
      <div className="ConNamePf">
        <h2>{User}</h2>
        <h3>Estudiante</h3>
      </div>
    </div>
  );
};
export const EntrySet = ({ Id, Name, Type, ExtraProps,e1,e2,e3,id1,id2,id3}) => {
  return (
      <div className="InputSetContainer">
    <div className="Setlogin-container">
      <div className="Setlogin-group">
        <input
          className="Setlogin-input"
          type={Type}
          placeholder=" "
          id={Id}
          {...ExtraProps}
          disabled
        />
        <label className="Setlogin-label">{Name}</label>
        <span className="Setlogin-line"></span>
      </div>
    </div>
    <div className="SetDat" id={id1}><button className="BtnSetDatI" onClick={e1}><i class="fa-solid fa-pen-to-square"></i></button></div>
    <div className="SetDat-Can DisNone" id={id2}><button className="BtnSetDat-Can" onClick={e2}>Cancel</button></div>
    <div className="SetDat DisNone" id={id3}><button className="BtnSetDat" onClick={e3}>Cambiar</button></div>
    </div>
      
  );
};
export const SetPerfil = ({ icon, perfil }) => {
  return (
      <button className="SetBt-perfiles" type="submit">
        <i className={icon}></i>
        <br></br>
        <div className="text">
          <h4>{perfil}</h4>
        </div>
      </button>
  );
};

export const GasFrec = ({ icon, perfil }) => {
  return (
      <div className="ContainerFrec">
        <div className="NameFrec"></div>

      </div>
  );
};