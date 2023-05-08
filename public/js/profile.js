const profileFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const age = document.querySelector('#age').value.trim();
    const bio = document.querySelector('#bio').value.trim();
    const training_goals = document.querySelector('#training-goals-signup').value.trim();
  
    if (name && email && age && bio && training_goals) {
      const response = await fetch(`/api/users/profile`, {
        method: 'PUT',
        body: JSON.stringify({ name, email, age, bio, training_goals }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to update profile');
      }
    }
  };
  
  document
    .querySelector('.profile-form')
    .addEventListener('submit', profileFormHandler);