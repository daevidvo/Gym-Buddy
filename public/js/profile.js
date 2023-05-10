const profileFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#username').value.trim();
    const email = document.querySelector('#email').value.trim();
    const bio = document.querySelector('#bio').value.trim();
    const age = document.querySelector('#age').value.trim();
    const training_goals = document.querySelector('#goals').value.trim();
  
    if (userName && email && age && bio && training_goals) {
      const response = await fetch(`/api/users/edit`, {
        method: 'PUT',
        body: JSON.stringify({ userName, email, bio, age, training_goals }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to update profile');
      }
    }
  };
  
  document
    .querySelector('#profile_form')
    .addEventListener('submit', profileFormHandler);