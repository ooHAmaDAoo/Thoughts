import React, { useState } from 'react';


export const formatNumber = (number) => {
    const suffixes = ['', 'k', 'm', 'b', 't']; // Add more suffixes if needed
    const order = Math.floor(Math.log10(number) / 3);

    if (order >= suffixes.length) {
        return number; // Number is too large to format
    }

    if (number === 0)
        return number;

    const roundedNumber = (number / Math.pow(10, order * 3)).toFixed(1);

    return order === 0 ? Math.floor(number) : `${roundedNumber}${suffixes[order]}`;
};

export const convertToBase64 = (e, setConverted) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        // console.log(reader.result);
        // setPicture(reader.result);
        // console.log("TTTTTTTT", reader.result);
        setConverted(reader.result);
    }
    reader.onerror = () => {
        console.log("Error: ");
    }
}


// export const imageToBase64 = (image, setConverted) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onload = () => {
//         // console.log(reader.result);
//         // setPicture(reader.result);
//         // console.log("TTTTTTTT", reader.result);
//         setConverted(reader.result);
//     }
//     reader.onerror = () => {
//         console.log("Error: ");
//     }
// }

export const imageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};