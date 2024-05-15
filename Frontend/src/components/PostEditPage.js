import { useEffect, useState } from "react";
import "./PostEditPage.css"
import { useParams } from "react-router-dom";
// import verviedPadge from './img/verified-icon.svg';
import verviedPadge from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/verified-icon.svg';
import { convertToBase64 } from "./SharedFunctions";



function PostEditPage(props) {
    const accessToken = window.localStorage.getItem("accessToken");
    const { postID } = useParams()

    const [content, setContent] = useState("");
    const [picture, setPicture] = useState("");
    const [postTime, setPostTime] = useState("");
    const [data, setData] = useState({});

    const [success, setSuccess] = useState(false);

    // function convertToBase64(e) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         // console.log(reader.result);
    //         setPicture(reader.result);
    //     }
    //     reader.onerror = () => {
    //         console.log("Error: ");
    //     }
    // }


    const handleClick = () => {
        if (!content && !picture)
            return
        fetchData();
        // console.log(content);
        // console.log(picture);
        setSuccess(true);
    }


    const fetchData = async () => {
        const query = await fetch("http://localhost:8080/postUpdate", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ id: postID, content, picture })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        const res = await query.json();
        console.log(res);
    }

    const getPostData = async () => {
        const query = await fetch(`http://localhost:8080/post/${postID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }

        const res = await query.json();
        setData(res);
        setContent(res.post.content);
        setPicture(res.post.picture);
        setPostTime(res.post.postTime);
        console.log("check for postTime", res);
    }


    // const data = {
    //     name: user.name,
    //     username: user.username,
    //     profilePicture: user.profilePicture,
    //     verified: user.verified,
    //     post
    // }

    useEffect(() => {
        getPostData();
    }, []);

    const formatDateDifference = (inputDate) => {
        const currentDate = new Date();
        const dateToCompare = new Date(inputDate);

        const diffInSeconds = Math.floor((currentDate - dateToCompare) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        }

        // If none of the above conditions are met, return the date in dd-mm-yyyy format
        const day = dateToCompare.getDate().toString().padStart(2, '0');
        const month = (dateToCompare.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToCompare.getFullYear();

        return `${day}-${month}-${year}`;
    };


    return (<>
        {(!success) ? <>

            <div className='post-edit-section-container'>
                <div className='post-edit-section-background'>
                    <div className='post-edit-header-section'>

                        <div className='post-edit-header-section-partition'>

                            <div className="post-edit-profilePic-container">
                                <div className="post-edit-profilePic">
                                    <div className="post-edit-profile-img-background">
                                        <div className="post-edit-profile-img-holder">
                                            <img src={data?.profilePicture} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='post-edit-account-info'>
                                <div className='post-edit-account-name-vri'>
                                    <h2>{data?.name}</h2>
                                    <div className='post-veri'>
                                        {(data?.verified) && <img src={verviedPadge} />}
                                    </div>
                                </div>
                                <h3>@{data?.username}</h3>
                            </div>
                            <div className='post-time'>
                                <h3>•  {(postTime) && formatDateDifference(postTime)}</h3>
                            </div>
                        </div>

                    </div>

                    <div className='post-content-section'>
                        <textarea className="post-edit-text-area" value={content} onChange={(e) => setContent(e.target.value)} ></textarea>
                    </div>

                    <div className='post-break-line-container'>
                        <div className='post-break-line'></div>
                    </div>

                    <div className='post-edit-footer-section'>
                        <button onClick={handleClick}>Submit</button>
                    </div>
                </div>
            </div>

            {/* <h3>Content: </h3> */}
            {/* <textarea value="ssss" onChange={(e) => setContent(e.target.value)} ></textarea> */}
            {/* <h3>Picture: </h3> */}
            {/* <label htmlFor="Picture">Picture: <li><input type="file" id="Picture" accept="image/*" name="file" onChange={convertToBase64} /> <img src={picture} width={100}></img></li></label><br></br> */}
        </> : <h1>SUCCESS</h1>}</>);

}

export default PostEditPage;

// db.users.findOne({ "posts": ObjectId("659b3b7509ed06703106516f") }, { "username": 1, "_id": 0 })