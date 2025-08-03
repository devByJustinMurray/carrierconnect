import { createContext } from "react";
import { useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserData, setUserData] = useState(null);
    
    const value = {
        backendUrl,
        isLoggedIn,
        setIsLoggedIn,
        isUserData,
        setUserData
    }
    
    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    );
}
