import { Navigate } from "react-router-dom";

export default ({ children, login }) => {
    const isLogged = window.localStorage.getItem("isLogged");
    if (isLogged && login)
        return <Navigate to="/" />

    if (!isLogged && !login)
        return <Navigate to="/login" />

    return children;
}