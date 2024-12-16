export function getAuthenticatedUser() {
  return JSON.parse(localStorage.getItem("userInformation")) || null;
}
