import './UsersPageHolder.css'
import { useContext, useState, useEffect } from "react";
import PostHolder from './PostHolder';
import { AuthContext } from "../AuthContext";
import { Link, useParams } from 'react-router-dom';
import { formatNumber } from "./SharedFunctions";


function UsersPageHolder(props) {
    const accessToken = window.localStorage.getItem("accessToken");
    const { userID } = useParams();
    // console.log(props);
    console.log(userID);
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [post, setPost] = useState({});
    const [toPost, setToPost] = useState({});
    const [isFollowed, setFollowed] = useState(false);
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
        const query = await fetch(`http://localhost:8080/userpage/${userID}`, {
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
        // console.log("user in db: ", Data);
        setFollowed(Data.isFollowed);
    }

    useEffect(() => {
        fetchData();
    }, [userID]);

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

    const follow_handle = async () => {
        const query = await fetch("http://localhost:8080/follow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ usernameToFollow: user.username })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }
        // await setData(query.json());

        // console.log("Accunt Summary: ", query.json());
        // const Data = await query.json();
        setFollowed(true);
    }


    const unFollow_handle = async () => {
        const query = await fetch("http://localhost:8080/unfollow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ usernameToUnFollow: user.username })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }
        // await setData(query.json());

        // console.log("Accunt Summary: ", query.json());
        // const Data = await query.json();
        setFollowed(false);
    }

    const posts = user?.postsList?.map(p => {
        const toPost = toPost_handle(p);
        return <PostHolder toPost={toPost} />
        // < PostHolder />
    })


    return (
        <>
            {/* <h1>Profile Page</h1> */}

            <div className='user-page-container'>
                <div className='user-page-head-section'>
                    <div className='user-page-banner'>
                    </div>

                    <div className='user-page-second-part'>

                        <div className='user-page-summary-section'>
                            <div className='user-page-summary-section-user-pic'>
                                <div className="user-page-cp-account-img-holder">
                                    <img src={user.profilePicture} alt="" />
                                </div>
                            </div>
                            <div className='user-page-summary-section-user-details'>
                                <h2>{user.name}</h2>
                                <h3>@{user.username}</h3>
                            </div>
                            <div className='user-page-summary-section-user-summary'>
                                <div className='user-page-summary-box'>
                                    <h3>{formatNumber(user.following)}</h3>
                                    <h2>Following</h2>
                                </div>
                                <div className='user-page-summary-box'>
                                    <h3>{formatNumber(user.followers)}</h3>
                                    <h2>Followers</h2>
                                </div>
                            </div>
                        </div>


                        <div className='user-page-bio-section'>
                            <h2>Bio:</h2>
                            <div className='user-page-bio-container'>
                                <div className='user-page-bio-content-background'>
                                    <h3>{user.bio}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='user-page-btn-container'>
                            {(!isFollowed) ? <button id='follow' onClick={follow_handle}>Follow</button> : <button id='unfollow' onClick={unFollow_handle}>unFollow</button>}
                            {/* <Link to="/settings" id='link-to-settings'><button>Follow</button></Link> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="user-page-posts-section">
                {posts}
            </div>

            {/* <PostHolder /> */}
        </>
    );
}

export default UsersPageHolder;