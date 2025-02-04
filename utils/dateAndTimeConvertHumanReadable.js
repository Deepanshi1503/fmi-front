export function formatDateTime(dateTimeString) {
  const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(dateTimeString);

  // Extract date components
  const year = date.getFullYear();
  const monthName = months[date.getMonth()];
  const day = date.getDate(); // No need to padStart as we want single digits for 1-9

  // Extract time components
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format

  // Format the date and time
  return `${day} ${monthName} ${year} at ${hours}:${minutes} ${ampm}`;
}