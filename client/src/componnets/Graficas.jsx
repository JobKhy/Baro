import { DayNGas, Graph, NavBar } from './ModulesForm'
import "../style.css";
import "../css/Extras.css"

export const Graficas = () => {
    return (
        <div className='home-body-w'>             
            <NavBar initialActive={1}></NavBar>
            <div className='colGraph'>
                <div className="typeOfGraph">
                    <h1>semana</h1> 
                </div>
                <div className='ow'>
                    <div className="semData">
                        <h2>semana</h2>
                        <div className="showDatGrap">
                            <DayNGas dat={"hola"} date={"12/10/22"} amount={46546}/>
                            <DayNGas dat={"hola"} date={"12/10/22"} amount={46546}/>
                            <DayNGas dat={"hola"} date={"12/10/22"} amount={46546}/>
                            <DayNGas dat={"hola"} date={"12/10/22"} amount={46546}/>
                            <DayNGas dat={"hola"} date={"12/10/22"} amount={46546}/>
                        </div>  
                    </div>
                    <div className="Graph"><Graph></Graph></div>
                </div>
            </div>
            
            
            
        </div>
    )
}
