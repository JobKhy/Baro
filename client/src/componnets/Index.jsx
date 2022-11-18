import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BaroLogo from "../Img/BaroLogo.png";
import Fondobaromain from "../Img/Fondobaromain.png";
import { Loader } from "./Loader";
import { Button } from "./ModulesForm"

export const Index = () => {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    
    return (
        <>
            {
                loading ? (
                    <Loader></Loader>
                ) : (
                <>
                    <img src={Fondobaromain} alt="fondo" className="bg-img" />
                    <div className="inicio">
                        <div className="bir">
                            <img src={BaroLogo} alt="fondo" className="baro-img" />
                            <h1>Baro</h1>
                            {state?.data?.insertId ? (<h4>Inicie sesión para continuar</h4>) : null}
                            <Button value={'Entrar'} dest={'login'} btnclass={'prime-btn'}></Button>
                            <Button value={'Crear cuenta'} dest={'signin'} btnclass={'sec-btn'}/>
                        </div>

                    </div>
                </>
                )
                           
            }
        </>
        
    )
}
