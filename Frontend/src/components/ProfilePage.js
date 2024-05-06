import './ProfilePage.css'
import { useContext, useState, useEffect } from "react";
import PostHolder from './PostHolder';
import { AuthContext } from "../AuthContext";
import { Link } from 'react-router-dom';
import { formatNumber } from "./SharedFunctions";


function ProfilePage() {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [toPost, setToPost] = useState({});
    // const [isLogged, setLogged] = useState(false);
    // console.log(user);
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


    const fetchData = async () => {
        const accessToken = window.localStorage.getItem("accessToken");
        const query = await fetch("http://localhost:8080/user/profile", {
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
        // console.log(Data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const toPost_handle = (post) => {
        const data = {
            username: user.username,
            name: user.name,
            profilePicture: user.profilePicture,
            verified: user.verified,
            post
        }
        return data;
    }

    const posts = user?.postsList?.map(p => {
        const toPost = toPost_handle(p);
        return <PostHolder toPost={toPost} showDetails={true} />
        // < PostHolder />
    })
    console.log("posts", posts);


    return (
        <>
            {/* <h1>Profile Page</h1> */}

            <div className='profile-page-container'>
                <div className='profile-page-head-section'>
                    <div className='profile-page-banner'>
                    </div>

                    <div className='profile-page-second-part'>

                        <div className='profile-page-summary-section'>
                            <div className='profile-page-summary-section-profile-pic'>
                                <div className="profile-page-cp-account-img-holder">
                                    <img src={user.profilePicture} alt="" />
                                </div>
                            </div>
                            <div className='profile-page-summary-section-profile-details'>
                                <h2>{user.name}</h2>
                                <h3>@{user.username}</h3>
                            </div>
                            <div className='profile-page-summary-section-profile-summary'>
                                <div className='profile-page-summary-box'>
                                    <h3>{formatNumber(user.following)}</h3>
                                    <h2>Following</h2>
                                </div>
                                <div className='profile-page-summary-box'>
                                    <h3>{formatNumber(user.followers)}</h3>
                                    <h2>Followers</h2>
                                </div>
                            </div>
                        </div>


                        <div className='profile-page-bio-section'>
                            <h2>Bio:</h2>
                            <div className='profile-page-bio-container'>
                                <div className='profile-page-bio-content-background'>
                                    <h3>{user.bio}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='profile-page-btn-container'>
                            <Link to="/settings" id='link-to-settings'><button>Edit profile</button></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-page-posts-section">
                {posts}
            </div>

            {/* <PostHolder /> */}
        </>
    );
}

export default ProfilePage;