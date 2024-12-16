// Function to set a cookie
export function setCookie(name, value, daysToExpire) {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  
    let cookieValue =
      encodeURIComponent(name) +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
  
    document.cookie = cookieValue;
  }
  
  // Function to get the value of a cookie by name
  export function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (decodeURIComponent(cookie[0]) === name) {
        return decodeURIComponent(cookie[1]);
      }
    }
    return null;
  }
  
  // Function to set a cookie with serialized user data
  export function setUserDataCookie(userData, daysToExpire) {
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  
    let cookieValue =
      "user=" +
      encodeURIComponent(JSON.stringify(userData)) +
      "; expires=" +
      expirationDate.toUTCString() +
      "; path=/";
  
    document.cookie = cookieValue;
  }
  
  // Function to get the user data from the cookie
  export function getUserDataFromCookie() {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      if (cookie[0] === "user") {
        return JSON.parse(decodeURIComponent(cookie[1]));
      }
    }
    return null;
  }
  
  // Function to delete a cookie by name
  export function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
  // Function to delete all cookies
  function deleteAllCookies() {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].split("=");
      deleteCookie(cookie[0]);
    }
  }
  