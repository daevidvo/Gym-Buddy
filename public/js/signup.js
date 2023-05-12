// Handle the submission of the signup form
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the signup form
    const userName = document.querySelector('#signup_username').value.trim();
    const email = document.querySelector('#signup_email').value.trim();
    const password = document.querySelector('#signup_password').value.trim();
    const bio = document.querySelector('#signup_bio').value.trim();
    const age = document.querySelector('#signup_age').value.trim();
    const training_goals = document.querySelector('#signup_goals').value.trim();
    
    // Check if the required fields are filled
    if (userName && email && password && bio && training_goals && age) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ userName, email, password, bio, training_goals, age }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response is successful, redirect to the home page
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Invalid user information');
      }
    } else {
      // If any required field is missing, show an error message
      alert('Invalid sign up information')
    }
  };
  // Add an event listener for the signup form submission
  document
    .querySelector('#signup_form')
    .addEventListener('submit', signupFormHandler);