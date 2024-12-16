export function LoadUserDataFromLocalStorage() {
    // Load data from localStorage
    const visitedUserData = localStorage.getItem("visited_user");
  
    if (visitedUserData) {
      const parsedUserData = JSON.parse(visitedUserData);
      return {
        userCity: parsedUserData?.userCity || null,
        schoolType: parsedUserData?.schoolType || "",
        schoolTypeBudget: parsedUserData?.schoolTypeBudget || null,
        schoolState: parsedUserData?.schoolState || null,
      };
    }
  
    return null; // Return null if no data is found in localStorage
  }
  
  // Call the function to load data from localStorage
  // const userData = loadUserDataFromLocalStorage();
  // console.log(userData); // or use the userData object as needed
  