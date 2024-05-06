
function PrintDate() {
    console.log();
    console.log();
    console.log("Start");
    console.log();
    console.log();
    // Creating a new Date object with the current date and time
    const currentDate = new Date();
    console.log('Current Date and Time:', currentDate);

    // Creating a Date object for a specific date and time
    const specificDate = new Date('2023-01-01T12:00:00');
    console.log('Specific Date and Time:', specificDate);

    // Getting individual components of a date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // Note: Months are zero-indexed (0 = January, 11 = December)
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    console.log(`Components: ${year}-${month + 1}-${day} ${hours}:${minutes}:${seconds}`);

    // Formatting a date string
    const formattedDate = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    console.log('Formatted Date:', formattedDate);

    // Adding and subtracting time
    const tomorrow = new Date();
    tomorrow.setDate(currentDate.getDate() + 1);
    console.log('Tomorrow:', tomorrow);

    // Calculating the difference between two dates
    const date1 = new Date('2023-01-01');
    const date2 = new Date('2023-02-01');
    const timeDifference = date2 - date1; // Result in milliseconds
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24); // Convert milliseconds to days
    console.log('Days Difference:', daysDifference);

    return (<></>);
}

export default PrintDate;