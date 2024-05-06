import { useEffect, useState } from "react";
import { convertToBase64 } from "./SharedFunctions";


function UploadPic() {

    const [image, setImage] = useState("");
    const [converted, setConverted] = useState("");

    useEffect(() => {
        setImage(converted);
    }, [converted])


    // function convertToBase64(e) {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //         setImage(reader.result);
    //     }
    //     reader.onerror = () => {
    //         console.log("Error: ");
    //     }
    // }

    return (
        <>
            <br></br>
            <br></br>
            <input
                accept="image/*"
                type="file"
                name="file"
                onChange={e => convertToBase64(e, setConverted)}
            ></input>
            <img width={100} src={image} />
        </>
    )
}
export default UploadPic;