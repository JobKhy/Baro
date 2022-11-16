import React from 'react'
import { NavBar } from './ModulesForm'

export const Config = () => {
  return (
    <div className='home-body'>
        <NavBar initialActive={3}></NavBar>
        <div className="ow">
            <div className="typeOfGraph">
                <h1 className='white'>Config</h1>
            </div>
        </div>
    </div>
  )
}
