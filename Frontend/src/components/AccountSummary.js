import './AccountSummary.css'
import { Link } from 'react-router-dom';
import verviedPadge from './img/verified-icon.svg'
// import verviedPadge from '.https://cs391-project.s3.eu-north-1.amazonaws.com/img/verified-icon.svg'
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../AuthContext";
import { formatNumber } from "./SharedFunctions"


function AccountSummary(props) {

    const authContext = useContext(AuthContext);


    // const formatNumber = (number) => {
    //     const suffixes = ['', 'k', 'm', 'b', 't']; // Add more suffixes if needed
    //     const order = Math.floor(Math.log10(number) / 3);

    //     if (order >= suffixes.length) {
    //         return number; // Number is too large to format
    //     }

    //     if (number === 0)
    //         return number;

    //     const roundedNumber = (number / Math.pow(10, order * 3)).toFixed(1);

    //     return order === 0 ? Math.floor(number) : `${roundedNumber}${suffixes[order]}`;
    // };

    // console.log("format number 10: ", formatNumber(10));
    // console.log("format number 0: ", formatNumber(0));
    // console.log("format number 1: ", formatNumber(1));
    // console.log("format number 300: ", formatNumber(300));
    // console.log("format number 5000: ", formatNumber(5000));
    // console.log("format number 70000: ", formatNumber(70000));
    // console.log("format number 9000000: ", formatNumber(9000000));


    const [user, setUser] = useState({});
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
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
        // console.log(user);
        // console.log("Accunt Summary: ", Dt);
        const num = await formatNumber(Data.following);
        setFollowing(num);

        const num2 = await formatNumber(Data.followers);
        setFollowers(num2);
        // console.log("following:", num2);

    }

    useEffect(() => {
        fetchData();
    }, [authContext.auth.isLogged]);


    // const originalNumber = 1620;
    // const formattedNumber = formatNumber(originalNumber);
    // console.log(formattedNumber);

    // props ? console.log("AccountSummary: ", props) : console.log("no props yet");
    // console.log("AccountSummary: ", props.user);
    // const user = (props) ? props.user : undefined;
    // const pic = user.profilePicture;
    // const picPath = './img/profile.png';

    // const [picPath, setPicPath] = useState('');

    //     useEffect(() => {
    //         const dynamicImport = async () => {
    //             const path = (user) ? user.profilePicture : undefined;
    //             // const path = user.profilePicture;
    //             const module = await import(path);
    //             setPicPath(module.default);
    //         };
    //         dynamicImport();
    //   }, [user]);

    // const picPath = './img/profile.png';

    return (

        <div className="account-summary-cp-body-container">

            {
                (user.username) ? (
                    <>
                        <div className="account-summary-cp-profile-card-container">
                            <div className="account-summary-cp-banner">
                                <div className='account-summary-cp-banner-container'>
                                    {/* <img src={profileBannerPic}></img> */}
                                </div>
                            </div>
                            <div className="account-summary-cp-profilePic-container">
                                <div className="account-summary-cp-profilePic">
                                    <div className="account-summary-cp-profile-img-background">
                                        <div className="account-summary-cp-profile-img-holder">
                                            {/* <img src={profilePic} alt="" /> */}
                                            {/* <img src={require('./img/profile.png')} alt="" /> */}
                                            <img src={user.profilePic} alt="" />
                                            {/* <img src={require(picPath)} alt="" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="account-summary-cp-profile-section-content">
                                <div className="account-summary-cp-userName-ver-tit-sec">
                                    <div className="account-summary-cp-name-ver-container">
                                        <h5 className="account-summary-cp-h5-profile-section">{user.name}</h5>
                                        {(user.verified) ?
                                            <div className="account-summary-cp-cont-ver-box">
                                                <div className="account-summary-cp-verified-img-box">
                                                    <img src={verviedPadge} alt="" />
                                                </div>
                                            </div> : ''}
                                    </div>
                                    <div className="account-summary-cp-userName-sction">
                                        <h6>@{user.username}</h6>
                                    </div>

                                    <div className="account-summary-cp-summary-sec">
                                        <ul className="account-summary-cp-summaryList">
                                            <li>
                                                <div className="account-summary-cp-summaryList-Card">
                                                    {/* <h5 className="account-summary-cp-h5-summary-section" id="title">{user.following}</h5> */}
                                                    <h5 className="account-summary-cp-h5-summary-section" id="title">{following}</h5>
                                                    <h5 className="account-summary-cp-h5-summary-section" id="description">Following</h5>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="account-summary-cp-summaryList-Card">
                                                    <h5 className="account-summary-cp-h5-summary-section" id="title">{followers}</h5>
                                                    <h5 className="account-summary-cp-h5-summary-section" id="description">Followers</h5>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="account-summary-cp-edit-profile-btn">
                                            <Link to="/settings" id="link"><button id="Edit-btn">Edit Profile</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>) : <h1>No User Found</h1>}
        </div>
    );
}

export default AccountSummary;