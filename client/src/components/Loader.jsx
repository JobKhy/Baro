import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

export const Loader = () => {
  return (
    <div className='load'>
            <SyncLoader
            color="#044C7C"
            margin={5}
            size={25}
            speedMultiplier={0.8}
          />    
    </div>
  )
}
