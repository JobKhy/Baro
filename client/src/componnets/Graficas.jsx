import { DayNGas, Graph, NavBar } from './ModulesForm'
import "../style.css";
import "../css/Extras.css"

export const Graficas = () => {
    return (
        <div className='home-body-w'>             
            <NavBar initialActive={1}></NavBar>
            <div>
                <div className="typeOfGraph">
                    <h1>semana</h1> 
                </div>
                <div className="semData"><DayNGas></DayNGas></div>
                <div className="Graph"><Graph></Graph></div>
            </div>
            
            
        </div>
    )
}
