import { Link, useNavigate } from "react-router-dom";
import "./DropDownPost.css"


function DropDownPost(props) {
    const navigate = useNavigate();

    // console.log(props);
    const { id } = props;


    const deletePost = async () => {
        // console.log("delete post clicked");
        const accessToken = window.localStorage.getItem("accessToken");
        const query = await fetch("http://localhost:8080/postDelete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ id })

        });

        if (!query.ok) {
            console.log("Something went wrong");
            return;
        }
        // await setData(query.json());

        // console.log("Accunt Summary: ", query.json());
        const Data = await query.json();
        // console.log(Data);
        navigate("/deletemessage")
        return;
    }

    return (
        <div className="drop-down-post-cp">
            <ul>
                <Link className="post-tools" to={`/post/edit/${props.id}`} >Edit</Link>
                <Link className="post-tools" onClick={deletePost}>Delete</Link>
            </ul>
        </div >
    )
}
export default DropDownPost;