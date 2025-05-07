import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)

    const userDets = AsyncStorage.getItem('userDetails').then(res=>setUser(JSON.parse(res))).catch(e=>console.log(e))
    const [userDetails, setUserDetails] = useState(user);
    return (
        <AuthContext.Provider value={{userDetails, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    )
}