import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css'
// import profilePic from './img/profile.png';
import { ReactComponent as SearchPic } from './img/search_icon.svg';
// import { ReactComponent as SearchPic } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/search_icon.svg';


function SearchPage() {

    const [key, setKey] = useState("");
    const [result, setResult] = useState([]);

    const searchRef = useRef();

    async function search_handle(e) {
        e.preventDefault();
        console.log("key: ", key);

        if (!key)
            return;

        searchRef.current.reset();
        const query = await fetch("http://localhost:8080/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        const data = await query.json();
        console.log("data/result: ", data);
        setResult(data);
        // console.log(result);
    }

    return (

        <>
            <div className="search-page-container">
                <div className="search-box-container">
                    <div className="search-box-elements">
                        <form ref={searchRef} className="search-page-search-bar">
                            <div className="search-btn-background">
                                <label id="search-label" htmlFor="search-box"><SearchPic /></label>
                                <input id="search-box" type='text' placeholder='Search' onChange={e => setKey(e.target.value)}></input>
                            </div>
                            <button type="button" id="search-btn" onClick={search_handle}>Search</button>
                        </form>
                        <div className="search-break-line"></div>
                    </div>
                </div>

                {/* Variable content v */}
                <div className="search-result-container">
                    {(result.matchList) ? result.matchList.map((user) => (
                        <Link className="search-cp-link" to={`/userProfile/${user._id}`}>
                            <div className="search-result-account-container">
                                <div className='search-user-container'>
                                    <div className="profilePic-container">
                                        <div className="profilePic">
                                            <div className="profile-img-background">
                                                <div className="profile-img-holder">
                                                    <img src={user.profilePicture} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='search-user-detailes'>
                                        <h2>{user.name}</h2>
                                        <h3>@{user.username}</h3>
                                    </div>
                                </div>
                                <div className="search-break-line"></div>

                            </div></Link>
                    )) : <></>}
                    {/* )) : <><h2>no user</h2></>} */}
                </div>

                {/* <div className="search-result-container">
                    <div className="search-result-account-container">
                        <div className='search-user-container'>
                            <div className="profilePic-container">
                                <div className="profilePic">
                                    <div className="profile-img-background">
                                        <div className="profile-img-holder">
                                            <img src={profilePic} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='search-user-detailes'>
                                <h2>New Account 2</h2>
                                <h3>@username</h3>
                            </div>
                        </div>
                        <div className="search-break-line"></div>

                    </div>
                    <div className="search-result-account-container">
                        <div className='search-user-container'>
                            <div className="profilePic-container">
                                <div className="profilePic">
                                    <div className="profile-img-background">
                                        <div className="profile-img-holder">
                                            <img src={profilePic} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='search-user-detailes'>
                                <h2>New Account 2</h2>
                                <h3>@username</h3>
                            </div>
                        </div>
                        <div className="search-break-line"></div>

                    </div>
                    <div className="search-result-account-container">
                        <div className='search-user-container'>
                            <div className="profilePic-container">
                                <div className="profilePic">
                                    <div className="profile-img-background">
                                        <div className="profile-img-holder">
                                            <img src={profilePic} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='search-user-detailes'>
                                <h2>New Account 2</h2>
                                <h3>@username</h3>
                            </div>
                        </div>
                        <div className="search-break-line"></div>

                    </div>
                </div> */}
            </div>
        </>

    );
}

export default SearchPage;