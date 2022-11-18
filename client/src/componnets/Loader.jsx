import React from 'react'
import RiseLoader from "react-spinners/RiseLoader";

export const Loader = () => {
  return (
    <div className='load'>
            <RiseLoader
            color={"#044C7C"}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
                />
    </div>
  )
}
