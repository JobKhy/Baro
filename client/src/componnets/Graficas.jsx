import { DayNGas, NavBar } from './ModulesForm'
import "../style.css";
import "../css/Extras.css"

export const Graficas = () => {
    return (
        <div className='home-body-w'>             
            <NavBar initialActive={1}></NavBar>
            <div className="semData"><DayNGas></DayNGas></div>
            
        </div>
    )
}
