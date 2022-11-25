import React, {useState, useEffect, createContext} from 'react'

const UserContext = createContext({})
export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [dia, setDia] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser, dia, setDia}}>
        {children}
    </UserContext.Provider>
  )
}
export default UserContext