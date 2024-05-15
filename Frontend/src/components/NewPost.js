import './NewPost.css';
// import { ReactComponent as PostIconSvg } from './img/noun-post-icon.svg'
// import { ReactComponent as PostIconSvg } from './img/post-icon.svg';
import { ReactComponent as PostIconSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/post-icon.svg';
// import { ReactComponent as PhotoIconSvg } from './img/photo-icon.svg';
import { ReactComponent as PhotoIconSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/photo-icon.svg';
// import { ReactComponent as VideoIconSvg } from './img/video-icon.svg';
import { ReactComponent as VideoIconSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/video-icon.svg';
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import DragDrop from './DragDrop';
// import { imageToBase64 } from "./SharedFunctions"


function NewPost() {

    const accessToken = window.localStorage.getItem("accessToken");
    // const [writePost, setWritePost] = useState(true);

    const [text, setText] = useState("");
    // const [imagesList, setImagesList] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    // const [converted, setConverted] = useState("");
    const [convertedList, setConvertedList] = useState([]);

    // const convertedList = selectedImages.map(image => {
    //     convertToBase64(image, setConverted)

    // })
    // const convertedList = [];

    // useEffect(() => {

    // }, [selectedImages])


    const [takePhoto, setTakePhoto] = useState(false);
    const [addVideo, setAddVideo] = useState(false);

    const [user, setUser] = useState({});

    const fetchData = async () => {
        // const accessToken = window.localStorage.getItem("accessToken");
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
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        setText(e.target.value);
    }

    // useEffect(() => {
    //     // setConvertedList([]);
    //     selectedImages.map(image => {
    //         // imageToBase64(image, setConverted);
    //         // setConvertedList(...convertedList, converted);
    //         // convertedList.push(converted);
    //         // console.log("image", image);
    //         // convertToBase64(image, setConverted);
    //     })
    // }, [selectedImages])
    // console.log("convertedList", convertedList);
    const handleClick = async () => {
        // const accessToken = window.localStorage.getItem("accessToken");

        const query = await fetch("http://localhost:8080/postCreate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ content: text, picturesList: convertedList })
            // body: JSON.stringify({ content: text, picturesList: [] })
        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }
        // alert("text: ", text, "picturesList", convertedList);
        // setSelectedImages([]);

        // console.log("content: ", text, "picturesList: ", convertedList);
    }
    const AddTextClick = () => {
        setTakePhoto(false);
        setAddVideo(false);
    }
    const AddImagesClick = () => {
        setTakePhoto(true);
        setAddVideo(false);
    }
    const AddVideoClick = () => {
        setTakePhoto(false);
        setAddVideo(true);
    }

    const log_the_error = () => {
        console.log("convertedList", convertedList);
    }

    return (
        <div className='creat-post-container'>
            <div className='create-post-nav-list-container'>

                <ul className='create-post-nav-list'>
                    <li id="Post-Icon" onClick={AddTextClick}><a href='#'><PostIconSvg /><h6>Write a post</h6></a></li>
                    {/* <li id="Photo-Icon"><a href='#'><PhotoIconSvg /><Link to="/search"><h6>Take a photo</h6></Link></a></li> */}
                    <li id="Photo-Icon" onClick={AddImagesClick}><a href='#'><PhotoIconSvg /><h6>Take a photo</h6></a></li>
                    <li id="Video-Icon" onClick={AddVideoClick}><a href='#'><VideoIconSvg /><h6>Add a video</h6></a></li>
                </ul>
                <div className='br-container'>
                    <div id="br">
                        <div className='Active1'></div>
                        <div className='Active2'></div>
                        <div className='Active3'></div>
                    </div>
                </div>
            </div>

            <div className='new-post-cp-profile-pic-post-txt-container'>

                <div className='new-post-cp-post-creation'>
                    <div className="new-post-cp-accountPic-container">
                        <div className="new-post-cp-accountPic">
                            <div className="new-post-cp-account-img-background">
                                <div className="new-post-cp-account-img-holder">
                                    <img src={user.profilePic} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='Post-Text'>
                        <form>
                            <div className='text-input'>
                                {/* <input className='NewPost-input-txt' type='textarea' placeholder="What's in your mind?"></input> */}
                                <textarea className='NewPost-input-txt' placeholder="What's in your mind?" onChange={handleChange} value={text}></textarea>
                            </div>
                            <div className='btn-input'>
                                <input className='Post-Btn' type='submit' value="Post" onClick={handleClick}></input>
                            </div>
                        </form>
                        {/* {takePhoto && <h1>TAKE A PHOTO</h1>} */}
                    </div>
                </div>
            </div>

            <div className='new-post-cp-drag-drop-container' >
                {<DragDrop show={takePhoto} selectedImages={selectedImages} setSelectedImages={setSelectedImages} convertedList={convertedList} setConvertedList={setConvertedList} />}
            </div>
            <button onClick={log_the_error}>console log</button>
        </div>
    );
}

export default NewPost;