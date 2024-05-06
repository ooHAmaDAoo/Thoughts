import "./Settings.css"
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { convertToBase64 } from "./SharedFunctions";




function Settings() {
    const authContext = useContext(AuthContext);
    const accessToken = window.localStorage.getItem("accessToken");

    const [user, setUser] = useState({});
    const [converted, setConverted] = useState("");
    // const [sucess, setSuccess] = useState(false);

    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState("");
    const [bio, setBio] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setconfirmNewPassword] = useState("");

    useEffect(() => {
        setProfilePicture(converted);
        // console.log(converted);
    }, [converted])

    const fetchData = async () => {
        const query = await fetch("http://localhost:8080/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        const Data = await query.json();
        setUser(Data);
        setBio(Data.bio);
        setProfilePicture(Data.profilePic);
        console.log("Data from settings: ", Data);
        console.log("email from data: ", Data.email);
        setEmail(Data.email);
        setFirstName(Data.firstname);
        setLastName(Data.lastname);
    }

    useEffect(() => {
        fetchData();
    }, []);


    // function convertToBase64(e) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         // console.log(reader.result);
    //         setProfilePicture(reader.result);
    //     }
    //     reader.onerror = () => {
    //         console.log("Error: ");
    //     }
    // }

    async function edit_profile(e) {
        e.preventDefault();
        if (profilePicture === user.profilePic && bio === user.bio && firstName === user.username
            && lastName === user.lastname && email === user.email)
            return;
        // const accessToken = window.localStorage.getItem("accessToken");
        const query = await fetch("http://localhost:8080/editProfile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`

            },
            body: JSON.stringify({
                bio,
                firstname: firstName,
                lastname: lastName,
                email,
                profilePicture
            })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        window.location.reload();
        // setSuccess(true);
        // const data = await query.json();
        // console.log("Access:", data);

    }

    function log_out() {
        window.localStorage.removeItem("accessToken");
        authContext.setAuth({ isLogged: false });
        window.localStorage.removeItem("isLogged");
        navigate("/login");
    }

    async function update_password() {
        if (newPassword === confirmNewPassword) {

            const accessToken = window.localStorage.getItem("accessToken");
            const query = await fetch("http://localhost:8080/passwordUpdate", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({ newPassword, currentPassword })
            });

            if (!query.ok) {
                console.log("Something went wrong");
                return;
            }
        }

    }

    return (

        <>
            <div className="settings-cp-container">
                <h2>Settings</h2>

                {/* <h3>Update Profile Picture:</h3> */}


                <form className='settings-cp-edit-profile-form'>
                    <h3>Edit Profile:</h3>
                    <div className='settings-cp-edit-profile-profile-pic'>
                        <div className="settings-cp-edit-profile-account-img-holder">
                            <img src={profilePicture} width={100}></img>
                        </div>
                    </div>
                    <div className="settings-cp-edit-profile-labels-inputs-container">
                        <div className="settings-cp-edit-profile-labels">
                            <label htmlFor="profilePicture">Profile Picture:</label>
                            <label htmlFor="bio">Bio:</label>
                            <label htmlFor="firstName">first name:</label>
                            <label htmlFor="lastName">last name:</label>
                            <label htmlFor="e-mail">email</label>
                        </div>

                        <div className="settings-cp-edit-profile-inputs">
                            <li><input type="file" id="profilePicture" accept="image/*" name="file" onChange={e => convertToBase64(e, setConverted)} /> </li>
                            {/* <li><input type="file" id="profilePicture" accept="image/*" name="file" onChange={e => setProfilePicture(convertToBase64(e.target.value))} /> </li> */}
                            <li><input type="text" id="bio" placeholder="bio" value={bio} onChange={e => setBio(e.target.value)} /></li>
                            <li><input type="text" id="firstName" placeholder="first name" value={firstName} onChange={e => setFirstName(e.target.value)} /></li>
                            <li><input type="text" id="lastName" placeholder="last name" value={lastName} onChange={e => setLastName(e.target.value)} /></li>
                            <li><input type="email" id="e-mail" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /></li>
                        </div>
                    </div>

                    <li className="settings-cp-sub"><input type="submit" id="edit-profile-submit" value="save changes" onClick={edit_profile} /></li>
                </form>

                <br></br><br></br>
                <form className='settings-cp-update-password-form'>
                    <h3>update password:</h3>

                    <div className="settings-cp-update-password-labels-inputs-container">
                        <div className="settings-cp-update-password-labels">
                            <label htmlFor="current-password">Current Password:</label>
                            <label htmlFor="new-password">New Password:</label>
                            <label htmlFor="confirm-new-password">Confirm New Password:</label>
                        </div>

                        <div className="settings-cp-edit-profile-inputs">
                            <li><input type="password" id="current-password" placeholder="current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} /> </li>
                            <li><input type="password" id="new-password" placeholder="new password" value={newPassword} onChange={e => setNewPassword(e.target.value)} /></li>
                            <li><input type="password" id="confirm-new-password" placeholder="confirm new password" value={confirmNewPassword} onChange={e => setconfirmNewPassword(e.target.value)} /></li>
                        </div>
                    </div>

                    <li className="settings-cp-update-password"><input type="submit" id="update-password-submit" value="update password" onClick={update_password} /></li>
                </form>

                <br></br><br></br>
                <form className='settings-cp-log-out'>
                    <h3>logout:</h3>
                    <li className="settings-cp-leave"><input type="submit" id="logout-submit" value="LOG OUT" onClick={log_out} /></li>
                    {/* <li className="log-in-cp-sub"><input type="button" id="signUp" value="Sign Up" /></li> */}
                </form>
            </div>
        </>

    );
}

export default Settings;