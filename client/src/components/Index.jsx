import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BaroLogo from "../Img/BaroLogo.png";
import Fondobaromain from "../Img/Fondobaromain.png";
import { Loader } from "./Loader";
import { Button } from "./ModulesForm";
import { Slides } from "./Slides";

export const Index = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <img src={Fondobaromain} alt="fondo" className="bg-img" />
      <Slides></Slides>
      <div className="inicio">
        <div className="bir">
          <img src={BaroLogo} alt="fondo" className="baro-img" />
          <h1>Baro</h1>
          <Button
            value={"Entrar"}
            dest={"login"}
            btnclass={"prime-btn"}
          ></Button>
          <Button value={"Crear cuenta"} dest={"signin"} btnclass={"sec-btn"} />
        </div>
      </div>

      {loading ? <Loader></Loader> : null}
    </>
  );
};
