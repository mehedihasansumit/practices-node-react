import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext();

const AuthContextProvider = ({ navigate, children }) => {

    const [userInfo, setUserInfo] = useState()

    const getdata = async (uri = "/auth/user", setValue) => {
        await axios('http://localhost:3000' + uri, { withCredentials: true })
            .then(({ data }) => {
                console.log({ data });
                setUserInfo(data)
            })
            .catch(({ data, status }) => {
                console.log({ error: data, status })
                if (status === 403) navigate('/login');
            })

    }

    useEffect(() => {
        getdata('/auth/user', setUserInfo);

    }, [])

    return <AuthContext.Provider value={{ ...userInfo, refechData: getdata }}>
        {children}
    </AuthContext.Provider >
}

export default AuthContextProvider;