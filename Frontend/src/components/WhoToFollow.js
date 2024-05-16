import './WhoToFollow.css';
import { ReactComponent as RefreshPic } from './img/refresh_icon.svg';
// import { ReactComponent as RefreshPic } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/refresh_icon.svg';
import { ReactComponent as PlusPic } from './img/plus-icon.svg'
// import { ReactComponent as PlusPic } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/plus-icon.svg'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


function WhoToFollow() {
    const accessToken = window.localStorage.getItem("accessToken");
    const [data, setData] = useState([]);
    const [refresh, setRefersh] = useState(0);
    const [userToFollow, setUserToFollow] = useState(null);
    // console.log("who to follow: ", data);
    useEffect(() => {
        fetch(`http://localhost:8080/whotofollow`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        })
            .then(res => {
                if (!res.ok)
                    throw new Error("Something went wrong");

                return res.json();
            })
            .then(d => setData(d.whoToFollow))
            .catch(err => console.log(err.message));

    }, [refresh]);

    const follow_handle = async () => {
        const query = await fetch("http://localhost:8080/follow", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ usernameToFollow: userToFollow.username })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        setRefersh(refresh + 1);
    }

    useEffect(() => {
        if (userToFollow) {
            // console.log("useEffect", userToFollow);
            follow_handle();
        }
    }, [userToFollow])

    return (
        <>
            <div className="who-to-follow-container">
                {/* Remember to edit who-to-follow-container height */}
                <div className='who-to-follow-title'>
                    <h1>Who to follow</h1>
                    <div className='wf-refresh-icon'> <RefreshPic onClick={() => setRefersh(refresh + 1)} /></div>
                </div>
                <div className='wf-break-line'></div>





                {/* Vaiable Section Edit Later */}



                {
                    data?.map(datum => {

                        return (< div className='suggest-user-container'>
                            <div className="profilePic-container">
                                <div className="profilePic">
                                    <div className="profile-img-background">
                                        <div className="profile-img-holder">
                                            <Link to={`/userProfile/${datum?._id}`} className="who-to-follow-link"><img src={datum?.profilePicture} alt="" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='suggest-user-detailes'>
                                <Link to={`/userProfile/${datum?._id}`} className='who-to-follow-link'><h2>{datum?.name}</h2></Link>
                                <Link to={`/userProfile/${datum?._id}`} className='who-to-follow-link'><h3>@{datum?.username}</h3></Link>
                            </div>

                            <div className='wf-add-btn-container'>
                                {/* <div className='wf-add-btn' ><PlusPic /></div> */}
                                <a><div className='wf-add-btn' onClick={() => setUserToFollow(datum)}><PlusPic /></div></a>
                            </div>
                        </div>
                        )
                    })
                }






                {/* <div className='suggest-user-container'>
                    <div className="profilePic-container">
                        <div className="profilePic">
                            <div className="profile-img-background">
                                <div className="profile-img-holder">
                                    <img src={profilePic} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='suggest-user-detailes'>
                        <h2>New Account 2</h2>
                        <h3>@username</h3>
                    </div>

                    <div className='wf-add-btn-container'>
                        <a><div className='wf-add-btn'><PlusPic /></div></a>
                    </div>
                </div>
                <div className='suggest-user-container'>
                    <div className="profilePic-container">
                        <div className="profilePic">
                            <div className="profile-img-background">
                                <div className="profile-img-holder">
                                    <img src={profilePic} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='suggest-user-detailes'>
                        <h2>New Account 3</h2>
                        <h3>@username</h3>
                    </div>

                    <div className='wf-add-btn-container'>
                        <a><div className='wf-add-btn'><PlusPic /></div></a>
                    </div>
                </div> */}
                {/* END -- Vaiable Section Edit Later */}

                {/* <div className='wf-show-more-btn-container'>
                    <button>Show more</button>
                </div> */}
            </div >
        </>
    );
}

export default WhoToFollow;