import React from "react";
import { useState } from "react";

export const AuthContext = React.createContext();


function AuthProvider(props) {

    const [auth, setAuth] = useState({
    });
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;