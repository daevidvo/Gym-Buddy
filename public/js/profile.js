// This code block creates a function named "profileFormHandler" that is called when the user submits the profile form. It prevents the form's default submit action, retrieves user input values, and sends a PUT request to the server to update the user's profile data.
const profileFormHandler = async (event) => {
    event.preventDefault();
  
    // Retrieve input values from the profile form
    const userName = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const bio = document.querySelector('#bio').value.trim();
    const age = document.querySelector('#age').value.trim();
    const training_goals = document.querySelector('#goals').value.trim();
  
    // Ensure all required fields are filled out before sending the PUT request
    if (userName && email && age && bio && training_goals) {
      const response = await fetch(`/api/users/edit`, {
        method: 'PUT',
        body: JSON.stringify({ userName, email, bio, age, training_goals }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // If the PUT request is successful, reload the page to display updated profile information. Otherwise, display an error message.
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update profile');
      }
    }
  };
  // Add an event listener to the profile form that calls the profileFormHandler function when the form is submitted
  document
    .querySelector('#profile_form')
    .addEventListener('submit', profileFormHandler);