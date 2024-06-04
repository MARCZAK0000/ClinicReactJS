import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserContextUpdate = React.createContext();


export function useUserContext() {
    return useContext(UserContext)
}

export function useUserContextUpdate() {
    return useContext(UserContextUpdate)
}


export function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState('');

    const updateUser = (parms) => {
        setCurrentUser(parms)
    }


    return (
        <UserContext.Provider value={currentUser}>
            <UserContextUpdate.Provider value={updateUser}>
                {children}
            </UserContextUpdate.Provider>
        </UserContext.Provider>
    )
}

