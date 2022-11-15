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
    { Name: "Frecuentes", icon: "fa-solid fa-dollar-sign", dest: "graficas" },
    { Name: "Config", icon: "fa-solid fa-bars", dest: "graficas" },
    { Name: "Salir", icon: "fa-solid fa-arrow-right-from-bracket" },
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
