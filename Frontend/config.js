export const BASE_URL = "http://localhost:2657/api/v1";

export const token = localStorage.getItem('token');
// let userId = null; // Initialize userId variable
// let isPremiumUser = false; // Initialize isPremiumUser variable with a default value

// // Retrieve the user object from localStorage
// const userString = localStorage.getItem('user');

// if (userString && userString !== "undefined") { // Check if userString is not undefined
//     try {
//         // Parse the string back into an object
//         const userObject = JSON.parse(userString);

//         // Ensure userObject is not null before accessing its properties
//         if (userObject) {
//             // Assign userId and isPremiumUser if they exist in the userObject
//             userId = userObject._id || userId;
//             isPremiumUser = userObject.isPremiumUser || isPremiumUser;
//         } else {
//             console.log('userObject is null');
//         }
//     } catch (error) {
//         console.error('Error parsing user data:', error);
//     }
// } else {
//     console.log('No valid user data found in localStorage');
// }

// // Export a function to get userId
// export function getUserId() {
//     return userId;
// }

// // Export a function to get isPremiumUser status
// export function getIsPremiumUser() {
//     return isPremiumUser;
// }
