const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const userName = document.querySelector('#signup_username').value.trim();
    const email = document.querySelector('#signup_email').value.trim();
    const password = document.querySelector('#signup_password').value.trim();
    const bio = document.querySelector('#signup_bio').value.trim();
    const age = document.querySelector('#signup_age').value.trim();
    const training_goals = document.querySelector('#signup_goals').value.trim();
    
    if (userName && email && password && bio && training_goals && age) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ userName, email, password, bio, training_goals, age }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } else {
      alert('Invalid sign up information')
    }
  };
  
  document
    .querySelector('#signup_form')
    .addEventListener('submit', signupFormHandler);