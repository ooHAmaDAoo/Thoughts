import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { imageToBase64 } from "./SharedFunctions"

import './DragDrop.css';

const ImageUploader = ({ onImagesSelected, show, setSelectedImages, selectedImages, convertedList, setConvertedList }) => {

    const str = "ABC";
    const [converted, setConverted] = useState("");
    const [tmp, setTmp] = useState([]);
    // const handleImagesSelected = (selectedImages) => {
    //     // Handle the selected images here (e.g., upload to a server, display previews, etc.)
    //     console.log('Selected Images:', selectedImages);
    //   };


    // const [selectedImages, setSelectedImages] = useState([]);


    // const updateConvertedList = async (updatedImages) => {
    //     const promises = updatedImages.map((image) => {
    //         return new Promise((resolve) => {
    //             imageToBase64(image, (base64) => {
    //                 resolve(base64);
    //             });
    //         });
    //     });

    //     const base64Images = await Promise.all(promises);
    //     setConvertedList(base64Images);
    // };



    const updateConvertedList = async (images) => {
        try {
            const base64Promises = images.map((image) => imageToBase64(image));
            const base64Images = await Promise.all(base64Promises);
            setConvertedList(base64Images);
        } catch (error) {
            console.error("Error converting images:", error);
        }
    };



    const onDrop = useCallback(async (acceptedFiles) => {
        // Filter out already uploaded images

        const newFiles = acceptedFiles.filter((file) => {
            return !selectedImages.some(
                (image) =>
                    image.path &&
                    file.path &&
                    image.path.toLowerCase() === file.path.toLowerCase()
            );
        });

        // Handle dropped or selected files
        const updatedImages = [...selectedImages, ...newFiles];
        updateConvertedList(updatedImages);


        // setConvertedList(updatedImages);
        // console.log("convertedList from DragDrop", convertedList);
        // const updatedImages = selectedImages.concat(newFiles.filter(Boolean));
        setSelectedImages(() => updatedImages);
        // onImagesSelected(updatedImages);
    }, [selectedImages, onImagesSelected]);
    console.log("selectedImages", selectedImages);


    // const readFileContent = (file) => {
    //     return new Promise((resolve) => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             resolve(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     });
    // };


    const removeImage = (index) => {
        // setTmp(() => [...convertedList]);
        // setSelectedImages(() => []);
        setConvertedList([]);
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        updateConvertedList(updatedImages);

        // setConvertedList(() => [...tmp]);
        // console.log("convertedList from DragDrop", convertedList);
        // onImagesSelected(updatedImages);
        setSelectedImages(() => updatedImages);
        console.log("selectedImages", selectedImages);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div>
            {show && <div className='dropZone' {...getRootProps()} >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the images here ...</p>
                ) : (
                    <p>Drag & drop some images here, or click to select images</p>
                )}
            </div>}

            {selectedImages.length > 0 && (
                <div>
                    {/* <h4>Selected Images:</h4> */}
                    <ul className='imageListStyle'>
                        {selectedImages.map((image, index) => (
                            <li className='imageItemStyle' key={index}>
                                <div className='delete-container'>
                                    <span className='deleteButtonStyle' onClick={() => removeImage(index)}>&times;</span>
                                </div>
                                <img className='imageStyle'
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index + 1}`}
                                />
                                {/* <button onClick={() => removeImage(index)}>X</button> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ImageUploader;