import React, { useContext, useState } from "react";


const CurrentUserContext = React.createContext();
const CurrentUserContextUpadte = React.createContext();


export function useCurrentUser() {
    return useContext(CurrentUserContext)
}

export function useCurrentUserUpdate() {
    return useContext(CurrentUserContextUpadte)
}


export function CurrentUserProvider({ children }) {
    const [currentUserInfromations, setCurrentUserInfromations] = useState({});


    const updateCurrentUser = (parms) => {
        setCurrentUserInfromations(parms)
    }
    return (

        <CurrentUserContext.Provider value={currentUserInfromations}>
            <CurrentUserContextUpadte.Provider value={updateCurrentUser}>
                {children}
            </CurrentUserContextUpadte.Provider>
        </CurrentUserContext.Provider>
    )
}