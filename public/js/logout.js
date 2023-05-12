// This code block creates a function named "logout" that sends a POST request to the API endpoint to log the user out when the "logout" button is clicked.
const logout = async () => {
  // Send a POST request to the API endpoint to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    // If the response is OK, redirect the user to the home page. Otherwise, display an error message.
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  // Add an event listener to the "logout" button that calls the logout function when clicked
  document.querySelector('#logout').addEventListener('click', logout);