export function formatDateTime(dateTimeString) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    const date = new Date(dateTimeString);
  
    // Extract date components
    const year = date.getFullYear();
    const monthIndex = date.getMonth();
    const monthName = months[monthIndex];
    const day = String(date.getDate()).padStart(2, "0");
  
    // Extract time components
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
  
    // Format the date and time
    const formattedDateTime = `${monthName} ${day}, ${year} ${hours}:${minutes}:${seconds}`;
  
    return formattedDateTime;
  }
  
  // const originalDateTime = "2024-03-01T05:39:15.913Z";
  // const humanReadableDateTime = formatDateTime(originalDateTime);
  // console.log(humanReadableDateTime); // Output: March 01, 2024 05:39:15
  