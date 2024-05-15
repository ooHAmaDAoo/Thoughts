import './PostHolder.css';
// import profilePic from './img/profile.png';
import DropDownPost from './DropDownPost';
// import { ReactComponent as VerificationSvg } from './img/verified-icon.svg';
// import verviedPadge from './img/verified-icon.svg';
import verviedPadge from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/verified-icon.svg';
// import { ReactComponent as VerificationSvg } from './img/verified-icon.svg';
// import { ReactComponent as DotsSvg } from './img/dots-icon.svg'
import { ReactComponent as DotsSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/dots-icon.svg'
// import { ReactComponent as LikeSvg } from './img/heart-icon.svg';
import { ReactComponent as LikeSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/heart-icon.svg';
// import { ReactComponent as ShareSvg } from './img/share-icon.svg';
import { ReactComponent as ShareSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/share-icon.svg';
// import { ReactComponent as CommentSvg } from './img/comment-dots-icon.svg';
import { ReactComponent as CommentSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/comment-dots-icon.svg';
// import { ReactComponent as RepostSvg } from './img/repost-icon.svg';
import { ReactComponent as RepostSvg } from 'https://cs391-project.s3.eu-north-1.amazonaws.com/img/repost-icon.svg';
import { useState } from 'react';



function PostHolder(props) {

    // const toPost = (props.toPost) ? props.toPost : undefined;
    // const userInfo = (toPost) ? toPost[0] : undefined;
    // const post = (toPost) ? toPost[1] : undefined;
    const { showDetails, toPost } = props;
    const [editPost, setEditPost] = useState(false);
    // console.log("userInfo", userInfo);
    // console.log("post", post);


    // const { toPost } = props;
    // console.log(toPost.post);


    /*{
        username:
        name:
        profilePicture:
        verified:
        post: {
            id:
            content:
            picture:
            likes:
            ...
        }
    }*/

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


    // console.log("props.details: ", showDetails);
    const postEdit = () => {
        return setEditPost(prevEditPost => !prevEditPost);
    }

    const tt = toPost?.post?.picturesList?.map((image) => {

        // console.log(image);

    });

    return (
        <>

            {(toPost) ?
                (<div className='post-section-container'>
                    <div className='post-section-background'>
                        <div className='post-header-section'>

                            <div className='post-header-section-partition'>

                                <div className="post-profilePic-container">
                                    <div className="post-profilePic">
                                        <div className="post-profile-img-background">
                                            <div className="post-profile-img-holder">
                                                <img src={toPost.profilePicture} alt="" />
                                                {/* <img src={profilePic} alt="" />  require(path) */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='post-account-info'>
                                    <div className='post-account-name-vri'>
                                        <h2>{toPost.name}</h2>
                                        <div className='post-veri'>
                                            {/* {(toPost.verified) && <VerificationSvg />} */}
                                            {(toPost.verified) && <img src={verviedPadge} />}
                                            {/* <VerificationSvg/> */}
                                        </div>
                                    </div>
                                    <h3>@{toPost.username}</h3>
                                </div>
                                <div className='post-time'>
                                    <h3>• {(toPost?.post?.postTime) && formatDateDifference(toPost?.post?.postTime)}</h3>
                                </div>
                            </div>

                            {showDetails && <div className='post-tools'>
                                <div className='post-tools-svg-holder'>
                                    {showDetails && <DotsSvg onClick={postEdit} />}
                                    {showDetails && editPost && <DropDownPost id={toPost.post._id} />}
                                </div>
                            </div>}

                        </div>

                        <div className='post-content-section'>
                            {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
                                similique aut repellendus dolor iusto. Id quidem eum labore
                                possimus veniam.
                            </p> */}
                            <p>{toPost?.post?.content}</p>


                            {/* loop for post media later */}
                            <div className='post-content-media-section'>
                                {
                                    toPost?.post?.picturesList?.map((image) => (
                                        // console.log("here");
                                        <div className='post-content-media-pic'>
                                            <img src={image}></img>
                                        </div>
                                    ))
                                }

                                {/* <div className='post-content-media-pic'></div> */}
                                {/* <div className='post-content-media-pic'></div> */}
                                {/* <div className='post-content-media-pic'></div> */}
                            </div>

                        </div>

                        <div className='post-break-line-container'>
                            <div className='post-break-line'></div>
                        </div>

                        <div className='post-footer-section'>
                            <div className='post-comment-section' id='post-reaction'>
                                <div className='post-svg'> <CommentSvg /> </div>
                                <h3>{toPost?.post?.commentNum}</h3>
                            </div>
                            <div className='post-repost-section' id='post-reaction'>
                                <div className='post-svg'> <RepostSvg /> </div>
                                <h3>{toPost?.post?.repost}</h3>
                            </div>
                            <div className='post-like-section' id='post-reaction'>
                                <div className='post-svg'> <LikeSvg /> </div>
                                <h3>{toPost?.post?.likes}</h3>
                            </div>
                            <div className='post-share-section' id='post-reaction'>
                                <div className='post-svg'> <ShareSvg /> </div>
                            </div>
                        </div>
                    </div>
                    {/* <DropDownPost /> */}

                </div>)

                : <h1>No Post Data</h1>}
        </>
    );
}

export default PostHolder;



