import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [userDetails, setUserDetails] = useState(null);
    return (
        <AuthContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}