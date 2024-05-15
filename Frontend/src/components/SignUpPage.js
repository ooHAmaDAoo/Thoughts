import './SignUpPage.css'
import WelcomeImg from './img/4.jpg'
import WelcomeImg from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/4.jpg'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const user_regex = /^[a-zA-Z]{5,50}$/;
const pwd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;



function SignUpPage() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    // const currentDate = new Date;
    // const year = currentDate.getFullYear();
    // const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    // const day = currentDate.getDate().toString().padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;
    // console.log("year: ", year);
    // console.log("month: ", month);
    // console.log("day: ", day);
    // console.log("formatted: ", formattedDate);

    const [data, setData] = useState({
        name: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        birthDate: 0,
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = e => {
        console.log(e.target);
        setData(oldData => {
            return {
                ...oldData,
                [e.target.name]: e.target.value
            }
        });
    }

    // const [username, setUsername] = useState("");
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [email, setEmail] = useState("");
    // const [birthDate, setBirthDate] = useState("");
    // const [phone, setPhone] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");


    const [validName, setvalidName] = useState(false); //is the name correct
    const [nFocus, setnFocus] = useState(false); //focus on the input field

    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);


    const [vmPass, setvmPass] = useState(false);
    const [mpfocus, setmpFocus] = useState(false);

    // const [success, setSuccess] = useState(false);


    useEffect(() => {
        setvalidName(user_regex.test(data.username))
    }, [data.username])

    useEffect(() => {
        //     console.log(password)
        // console.log(pwd_regex.test(data.password))
        setValidPass(pwd_regex.test(data.password))
        setvmPass(data.password === data.confirmPassword)
    }, [data.password, data.confirmPassword])

    const signUp = async (e) => {
        e.preventDefault();
        const query = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    name: data.name,
                    username: data.username,
                    firstname: data.firstName,
                    lastname: data.lastName,
                    email: data.email,
                    password: data.password,
                    phone: data.phone,
                    birthDate: data.birthDate
                })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        //check with server if the entries are valid
        //check with server if user does not exist
        //check with server if information are saved
        setSuccess(true);
        // navigate("/login");
        // console.log(username, firstName, lastName, email, birthDate, phone, password, confirmPassword)
    }

    // data ? console.log(data) : console.log();

    return (

        <>
            {success ? (
                <div className='sign-up-cp-success-page'>
                    <h3>Success!</h3>
                    <p>Sign in!</p>
                </div>
            ) : (
                <div className='sign-up-cp-container'>

                    <div className='sign-up-cp-main-body'>
                        <div className='sign-up-cp-welcome-img'>
                            <img src={WelcomeImg} alt='Welcome Img'></img>
                            {/* <img alt='Welcome Img'></img> */}
                        </div>
                        <div className='sign-up-cp-register-section-card'>
                            <div className='sign-up-cp-register-section'>
                                <h3>Registration: </h3>
                                <ul className='sign-up-cp-reg-data'>
                                    <form onSubmit={signUp} className='sign-up-cp-sign-up-form'>
                                        <li><input
                                            type="text"
                                            id="name"
                                            placeholder="name"
                                            required
                                            autoComplete='off'
                                            value={data.name}
                                            name="name"

                                            // aria-invalid={validName ? 'false' : 'true'}
                                            aria-describedby='namenote'

                                            onChange={(e) => handleChange(e)}
                                        // onFocus={() => setnFocus(true)}
                                        // onBlur={() => setnFocus(false)}
                                        /></li>
                                        <li><input
                                            type="text"
                                            id="userName"
                                            placeholder="Username"
                                            required
                                            autoComplete='off'
                                            value={data.username}
                                            name="username"

                                            // aria-invalid={validName ? 'false' : 'true'}
                                            aria-describedby='usernamenote'

                                            onChange={(e) => handleChange(e)}
                                            onFocus={() => setnFocus(true)}
                                            onBlur={() => setnFocus(false)}
                                        /></li>

                                        <p id='usernamenote' className={nFocus && data.username && !validName ? "instructions" : "offscreen"}>
                                            4 to 24 characters <br />
                                            must begin with a letter <br />
                                        </p>

                                        <li><input
                                            type="text"
                                            id="firstName"
                                            placeholder="First Name"
                                            required
                                            name='firstName'
                                            autoComplete='off'
                                            value={data.firstName}
                                            onChange={(e) => handleChange(e)}


                                        /></li>

                                        <li><input
                                            type="text"
                                            id="lastName"
                                            placeholder="Last Name"
                                            autoComplete='off'
                                            name='lastName'
                                            value={data.lastName}
                                            onChange={(e) => handleChange(e)}

                                        /></li>

                                        <li><input
                                            type="email"
                                            id="e-mail"
                                            placeholder="E-mail"
                                            required
                                            name='email'
                                            autoComplete='off'
                                            value={data.email}
                                            onChange={(e) => handleChange(e)}

                                        /></li>

                                        <li><input
                                            type="date"
                                            id="birthDate"
                                            placeholder="Birth Date"
                                            // required
                                            name='birthDate'
                                            autoComplete='off'
                                            value={data.birthDate}
                                            onChange={(e) => handleChange(e)}
                                        /></li>

                                        <li><input
                                            type="tel"
                                            id="phoneNumber"
                                            placeholder="Phone Number"
                                            autoComplete='off'
                                            value={data.phone}
                                            name='phone'
                                            onChange={(e) => handleChange(e)}
                                        /></li>

                                        <li><input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            required
                                            autoComplete='off'
                                            name='password'
                                            value={data.password}
                                            // aria-invalid={validPass ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onChange={(e) => handleChange(e)}
                                            onFocus={() => setPassFocus(true)}
                                            onBlur={() => setPassFocus(false)}
                                        /></li>
                                        <p id="pwdnote" className={passFocus && !validPass ? "instructions" : "offscreen"}>
                                            8 to 24 characters.<br />
                                            Must include uppercase and lowercase letters, a number and a special character.<br />
                                        </p>
                                        <li><input
                                            type="password"
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            required
                                            autoComplete='off'
                                            name='confirmPassword'
                                            value={data.confirmPassword}
                                            // aria-invalid={vmPass ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onChange={(e) => handleChange(e)}
                                            onFocus={() => setmpFocus(true)}
                                            onBlur={() => setmpFocus(false)}
                                        /></li>
                                        <p id="confirmnote" className={mpfocus && !vmPass ? "instructions" : "offscreen"}>
                                            Must match the first password input field.
                                        </p>

                                        <li className="sign-up-cp-login-link">have an account? <Link to="/login" id="link">login</Link></li>

                                        <li className="sub"><input type="submit" id="submit" value="Sign Up"
                                            disabled={!validName || !validPass || !vmPass ? true : false}
                                        /></li>

                                        {/* <li className="sub"><input type="submit" id="sign-up-submit" value="Sign Up"
                                        /></li> */}

                                    </form>
                                </ul>
                            </div>


                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default SignUpPage