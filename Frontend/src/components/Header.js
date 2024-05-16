import './Header.css'
import { ReactComponent as HomeSvg } from './img/home_icon.svg'
import { ReactComponent as TeamSvg } from './img/usergroup_icon.svg'
import { ReactComponent as NotificationSvg } from './img/bell_icon.svg'
import { ReactComponent as SettingSvg } from './img/settings_icon.svg'
import { ReactComponent as SearchSvg } from './img/search_icon.svg'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";


function Header() {
    const authContext = useContext(AuthContext);

    // const [tmp, setTemp] = useState(false);

    const [user, setUser] = useState({});
    const [isLogged, setLogged] = useState(false);
    const fetchData = async () => {
        const accessToken = window.localStorage.getItem("accessToken");
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
        // await setData(query.json());

        // console.log("Accunt Summary: ", query.json());
        const Data = await query.json();
        setUser(Data);
        // setLogged(true);
    }

    // useEffect()
    useEffect(() => {
        const lgd = window.localStorage.getItem("isLogged");
        console.log(Boolean(lgd));
        setLogged(Boolean(lgd));
        // setTemp(!tmp);
        fetchData();
    }, []);
    //[authContext.auth.isLogged]

    return (
        //(authContext.auth.username)
        //(authContext.auth.isLogged)
        <>
            {(isLogged) ?

                <div className="header-CP-container"> {/* cp = component */}
                    <div className="header-CP-logo-container">
                        <div className="header-CP-logo-appName">
                            <Link to="/" id="logo"><h3>Thoughts</h3></Link>
                            {/* <Link to='/'><h3>Thoughts</h3></Link> */}

                        </div>
                    </div>

                    <div className="header-CP-navbar-container">
                        <ul className="header-CP-navbar-list">
                            <li> {/* keep part for Interactive buttons */}
                                <div className="header-CP-navbar-item-home" >
                                    <Link to='/' id="home"><HomeSvg /></Link>{/* replace a with link */}
                                </div>
                            </li>
                            <li> {/* keep part for Interactive buttons */}
                                <div className="header-CP-navbar-item-profile" >
                                    <Link to="/profile" id="profile"><TeamSvg /></Link>{/* replace a with link */}
                                </div>
                            </li>
                            <li> {/* keep part for Interactive buttons */}
                                <div className="header-CP-navbar-item-notification" >
                                    <a href="#"><i id="notification"><NotificationSvg /></i></a>{/* replace a with link */}
                                </div>
                            </li>
                            <li> {/* keep part for Interactive buttons */}
                                <div className="header-CP-navbar-item-settings" >
                                    <Link to='/settings' id="settings"><SettingSvg /></Link>{/* replace a with link */}
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="header-CP-quick-access-container">
                        <div className="header-CP-quick-access-search-bar-section">
                            <div className="header-CP-quick-access-search-bar">
                                <label htmlFor="search"><Link to="/search" id="header-CP-search-svg"><SearchSvg /></Link></label>
                                <input type="text" id="header-CP-search" placeholder="search" />
                            </div>
                        </div>

                        <div className="header-CP-quick-access-profile-container">
                            <div className="header-CP-quick-access-profile">
                                <div className="header-CP-quick-access-profile-img-holder">
                                    <img src={user.profilePic} alt='profile' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :

                <div className="header-CP-container">
                    <div className="header-CP-logo-container">
                        <div className="header-CP-logo-appName">
                            <h3>Thoughts</h3>
                        </div>
                    </div>

                    <div className="header-CP-navbar-container-not-logged">
                        <h2>Have an account ? <span> <Link to='/login' className='header-cp-link'>login</Link></span></h2>
                    </div>
                    <div className="header-CP-quick-access-container">
                        <h2>New user ? <span> <Link to='/signup' className='header-cp-link' >Signup</Link></span></h2>
                    </div>
                </div>
            }
        </>
    );
}

export default Header;