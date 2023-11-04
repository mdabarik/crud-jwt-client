import { createContext } from "react";

export const GlobalContext = createContext(null);

const GlobalProvider = ({children}) => {

    const info ={
        user: 'mdabarik'
    }
    
    return (
        <GlobalContext.Provider value={info}>
            {children}
        </GlobalContext.Provider>
    )
};

export default GlobalProvider;