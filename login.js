document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      
      // Retrieve entered username and password
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Define expected username-password pairs
      const validCredentials = {
        "aditya123": "aditya123",
        "aditib": "bengal123",
        "pate": "pate@69",
        "utkarsha": "utk@ncc"
        // Add more entries as needed
      };
  
      // Check if entered username exists in the valid credentials object
      if (validCredentials.hasOwnProperty(username)) {
        // Check if entered password matches the password associated with the username
        if (validCredentials[username] === password) {
          // Redirect to a new page upon successful authentication
          window.location.href = "index.html";
        } else {
          // If password is incorrect, display an error message
          alert("Incorrect password. Please try again.");
        }
      } else {
        // If username is not found in the valid credentials object, display an error message
        alert("Username not found. Please try again.");
      }
    });
  });
  