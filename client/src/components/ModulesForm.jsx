import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { userFetch as uApi } from "../api/users.api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

///Botones
export const Button = ({ type, value, btnclass, dest, disabled }) => {
  const [name] = useState(value);
  return dest ? (
    <Link to={dest}>
      <button className={btnclass}>{name}</button>
    </Link>
  ) : (
    <button type={type} className={btnclass} disabled={disabled}>
      {name}
    </button>
  );
};
export const Button2 = ({ type, value, btnclass, dest, disabled, onClick }) => {
  const [name] = useState(value);
  return dest ? (
    <Link to={dest}>
      <button className={btnclass}>{name}</button>
    </Link>
  ) : (
    <button
      onClick={onClick}
      type={type}
      className={btnclass}
      disabled={disabled}
    >
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
export const Entry2 = ({ Id, Name, Type, ExtraProps, onChange }) => {
  return (
    <div className="login-container">
      <div className="login-group">
        <input
          className="login-input"
          type={Type}
          placeholder=" "
          id={Id}
          {...ExtraProps}
          onChange={onChange}
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

export const Perfil = ({ icon, perfil, descripcion, onClick }) => {
  return (
    <button
      className="Bt-perfiles"
      style={{ cursor: "pointer" }}
      type="submit"
      onClick={onClick}
    >
      <i className={icon}></i>
      <br></br>
      <div className="text">
        <h4>{perfil}</h4>
        <br></br>
        <p>{descripcion}</p>
      </div>
    </button>
  );
};

export const NavBar = ({ initialActive }) => {
  const Menus = [
    { Name: "Home", icon: "fa-solid fa-house", dest: "../home" },
    { Name: "Graficas", icon: "fa-solid fa-chart-simple", dest: "../graficas" },
    { Name: "Config", icon: "fa-solid fa-bars", dest: "../config" },
    { Name: "Salir", icon: "fa-solid fa-arrow-right-from-bracket", dest: "" },
  ];

  const { setUser } = useContext(UserContext);
  const nav = useNavigate();

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
                if (menu.dest === "") {
                  MySwal.fire({
                    title: "¿Estas seguro que quieres salir?",
                    text: "Esta acción no se puede deshacer",
                    icon: "warning",
                    showDenyButton: true,
                    confirmButtonText: `Si`,
                    denyButtonText: `No`,
                  }).then(async (res) => {
                    if (res.isConfirmed) {
                      const res = await uApi.logout();
                      console.log(res);
                      if (res.status === 200) {
                        setUser(null);
                        nav("/login");
                      }
                    }
                  });
                }
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

export const DayNGas = ({ dat, date, amount }) => {
  return (
    <div className="DatGrap">
      <span>{dat}</span>
      <span>{date}</span>
      <span>${amount}</span>
    </div>
  );
};

import diosYe from "../Img/diosYe.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { ingresosFetch } from "../api/ingresos.api";
import { gastosFetch } from "../api/gastos.api";

export const Graph = () => {
  return (
    <div>
      <img src={diosYe} alt="" className="ye" />
    </div>
  );
};
export const GasRec = () => {
  return (
    <>
      <h1>Gastos recientes</h1>
      <div className="GasCont">
        <ul>
          <Reciente
            gasto={"Mensualidad Gym"}
            icons={"fa-solid fa-dumbbell"}
            value={800}
            date={"12/3/22"}
          />
          <Reciente
            gasto={"Comida con Amigos"}
            icons={"fa-solid fa-bowl-food"}
            value={600}
            date={"6/3/22"}
          />
          <Reciente
            gasto={"Agua"}
            icons={"fa-solid fa-faucet-drip"}
            value={235}
            date={"3/3/22"}
          />
          <Reciente
            gasto={"Internet "}
            icons={"fa-solid fa-wifi"}
            value={759}
            date={"2/3/22"}
          />
          <Reciente
            gasto={"Visita a familiares"}
            icons={"fa-solid fa-bus-simple"}
            value={40}
            date={"22/2/22"}
          />
        </ul>
      </div>
    </>
  );
};

export const IngGas = () => {
  const [ingreso, setIngreso] = useState(null);
  const { setUser } = useContext(UserContext);
  return (
    <>
      <h1>Ingreso de Balance</h1>
      <div className="GasCont">
        <div className="alignGas">
        <Entry2
          Id={"Ingreso"}
          Name={"Ingreso"}
          Type={"number"}
          onChange={(val) => {
            setIngreso(val.target.value);
          }}
        />
        <Button2
          value={"Añadir"}
          type={"submit"}
          btnclass={"prime-btn"}
          onClick={async () => {
            const res = await ingresosFetch.updateIngreso(ingreso);
            console.log(res);
            if (res.status === 200) {
              setUser((prev) => ({
                ...prev,
                balance: prev.balance + parseFloat(ingreso),
              }));
              MySwal.fire({
                title: "Ingreso actualizado",
                icon: "success",
                confirmButtonText: `Ok`,
                timer: 1000,
              });
            } else {
              MySwal.fire({
                title: "Error al actualizar ingreso",
                text: res.response.data.message,
                icon: "error",
                confirmButtonText: `Ok`,
                timer: 1000,
              });
            }
          }}
        />
        </div>
        
      </div>
    </>
  );
};

export const Gasto = () => {
  const [values, setValues] = useState({
    nombre: "",
    desc: "",
    monto: "",
  });

  return (
    <>
      <h1>Agrega Gasto</h1>
      <div className="GasCont">
        <div className="alignGas">
        <Entry2
          Id={"nombre"}
          Name={"Nombre del gasto"}
          Type={"text"}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, nombre: e.target.value }));
          }}
        />
        <Entry2
          Id={"descripcion"}
          Name={"Descripcion del gasto"}
          Type={"text"}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, desc: e.target.value }));
          }}
        />
        <Entry2
          Id={"monto"}
          Name={"Monto por tiempo"}
          Type={"number"}
          onChange={(e) => {
            setValues((prev) => ({ ...prev, monto: e.target.value }));
          }}
        />
        <Button2
          value={"Añadir"}
          type={"submit"}
          btnclass={"prime-btn"}
          onClick={async () => {
            const res = await gastosFetch.createGastoDiario(values);
            console.log(res);
          }}
        />
        </div>
      </div>
    </>
  );
};

/*COMPONENTES GUSTAVO*/

export const SubSet = ({ name, icons, e }) => {
  return (
    <div className="OpcSet">
      <span className="OpcName">
        <button className="OpcBtn" onClick={e}>
          <span className="GasIcon">
            <i className={icons}></i>
          </span>
          {name}
        </button>
      </span>
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
export const EntrySet = ({
  Id,
  Name,
  Type,
  ExtraProps,
  e1,
  e2,
  e3,
  id1,
  id2,
  id3,
}) => {
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
      <div className="SetDat" id={id1}>
        <button className="BtnSetDatI" onClick={e1}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>
      <div className="SetDat-Can DisNone" id={id2}>
        <button className="BtnSetDat-Can" onClick={e2}>
          Cancel
        </button>
      </div>
      <div className="SetDat DisNone" id={id3}>
        <button className="BtnSetDat" onClick={e3}>
          Cambiar
        </button>
      </div>
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

export const GasFrec = ({ name, balance, des, date, periodo, e, e2 }) => {
  return (
    <div className="ContainerFrec">
      <div className="NameFrec">{name}</div>
      <div className="ContainerDataFre">
        <div>
          <button className="PeriodList" onClick={e}>
            <p>Periodos</p>
            <i className="fa-solid fa-chevron-up"></i>
          </button>
          <div className="PeriodListCont">
            <ul className="PeriodShow">
              <li className="PeriodItem">
                <div className="PeriodText" onClick={e}>
                  Diario
                </div>
              </li>
              <li className="PeriodItem">
                <div className="PeriodText" onClick={e}>
                  Semanal
                </div>
              </li>
              <li className="PeriodItem">
                <div className="PeriodText" onClick={e}>
                  Quincenal
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="PeriodAmount">
          <h2>Facturación</h2>
          <input type={"number"} placeholder={balance} disabled />
          <br></br>
          <p>{periodo}</p>
        </div>
        <div className="FreLine"></div>
        <div className="DescriptionFre">
          <h2>Descripción</h2>
          <p>{des}</p>
        </div>
        <div className="FreLine"></div>
        <div className="DateStartFre">
          <h2>Fecha de registro</h2>
          <p>{date}</p>
        </div>
      </div>
      <div className="FreOptions">
        <div className="FactFre ">
          <button className="BtnFactFre" onClick={e2}>
            Ver días de Facturación<i className="fa-solid fa-calendar-days"></i>
          </button>
        </div>
        <div className="FactFre">
          <button className="BtnFactFreI">
            Editar gasto frecuente<i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
        <div className="FactFre-Can ">
          <button className="BtnFactFre-Can">
            Eliminar gasto frecuente<i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className="LinePad"></div>
    </div>
  );
};
export const DiaFacFre = ({ padre, cantidad, date }) => {
  return (
    <div className="DiaFre">
      <div>
        <h2>{padre}</h2>
      </div>
      <div>
        <h2>{cantidad}</h2>
      </div>
      <div>
        <h2>{date}</h2>
      </div>
    </div>
  );
};
export const SubAcc = ({ name, icons, e }) => {
  return (
    <div className="OpcAcc">
      <span className="OpcAccName">
        <button className="OpcBtnAcc" onClick={e}>
          <span className="AccIcon">
            <i className={icons}></i>
          </span>
          <p>{name}</p>
        </button>
      </span>
    </div>
  );
};
