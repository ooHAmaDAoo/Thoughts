import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './LogInPage.css'
// import WelcomeImg from './img/4.jpg'
import WelcomeImg from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/4.jpg'
import { AuthContext } from "../AuthContext";
import { useNavigate } from 'react-router-dom';


function LogInPage() {
    // const AuthContext = '';
    // const { setAuth } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");


    const authContext = useContext(AuthContext);


    useEffect(() => {
        setErrMsg("");
    }, [username, password])


    const navigate = useNavigate();
    async function login_handle(e) {
        e.preventDefault();
        const query = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        const data = await query.json();
        console.log("Access:", data);
        window.localStorage.setItem("accessToken", data.accessToken);
        authContext.setAuth({ isLogged: true });
        window.localStorage.setItem("isLogged", "true");


        // if (password === '123') {
        //     // const token = 'abc';
        //     authContext.setAuth({ username })
        //     console.log("Name: ", username);
        //     console.log("Password: ", password);
        //     console.log("auth", authContext.auth);
        setSuccess(true);
        navigate('/');
        // }
        // else {
        //     alert('Wrong details')
        // }
    }


    // const signIn = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // setErrMsg('No Server Response');

    //         //call API
    //         //console.log(JSON.stringify(response));
    //         //const accessToken = response?.data?.accessToken;
    //         //const roles = response?.data?.roles;
    //         const roles = 'admin';
    //         const accessToken = 1234;
    //         console.log(username, password, roles, accessToken);

    //         // setAuth({ username, password, roles, accessToken });
    //         setUsername('');
    //         setPassword('');
    //         setSuccess(true);
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 400) {
    //             setErrMsg('Missing Username or Password');
    //         } else if (err.response?.status === 401) {
    //             setErrMsg('Unauthorized');
    //         } else {
    //             setErrMsg('Login Failed');
    //         }
    //     }
    // }

    // function signIn_handle(e) {
    //     // e.preventDeault();
    //     console.log(username, password);
    // }

    return (
        <div className='log-in-cp-container'>
            <div className='log-in-cp-main-body'>
                <div className='log-in-cp-register-section-card'>
                    <div className='log-in-cp-register-section'>
                        <h1>Thoughts</h1>
                        <h3>Login Account: </h3>
                        <ul className='log-in-cp-reg-data'>
                            <form className='log-in-cp-sign-in-form'>
                                <li><input type="text" id="userName" placeholder="Username" value={username} required onChange={e => setUsername(e.target.value)} /></li>
                                <li><input type="password" id="password" placeholder="Password" value={password} required onChange={e => setPassword(e.target.value)} /></li>
                                <li className='log-in-cp-link'><a href=''>Forgot Password?</a></li>
                                <li className="log-in-cp-sub"><input type="submit" id="login-cp-submit" value="LOGIN" onClick={login_handle} /></li>
                                <Link to="/signup" id="link"><li className="log-in-cp-sub"><input type="button" id="signUp" value="Sign Up" /></li></Link>
                            </form>
                        </ul>
                    </div>
                </div>

                <div className='log-in-cp-welcome-img'>
                    <img src={WelcomeImg} alt='Welcome Img'></img>
                    {/* <img alt='Welcome Img'></img> */}
                </div>

            </div>
        </div>
    );
}


// function LogInPage() {

// }

export default LogInPage