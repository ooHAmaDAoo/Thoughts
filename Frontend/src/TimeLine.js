
import { useEffect, useState } from "react";
import PostHolder from "./components/PostHolder";
import './TimeLine.css'

function TimeLine(props) {
    const accessToken = window.localStorage.getItem("accessToken");
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/timeline`, {
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
            .then(d => setData(d.data))
            .catch(err => console.log(err.message));

    }, []);
    /*toPost = {
        username
        name
        profpic
        isVer
        post
    }*/
    const posts = data?.map(datum => {
        // console.log(datum);
        return datum.posts.map(datus => {
            return { ...datum, post: (datus) }
        })

    });


    const toPosts = posts.map(ppost => {
        return ppost.reverse().map(pppost => <PostHolder toPost={pppost} showDetails={false} />);
    });

    return (
        <div className="time-line-cp">
            {toPosts}
        </div>
    );
}

export default TimeLine;