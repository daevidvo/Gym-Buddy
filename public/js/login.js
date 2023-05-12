// This code block defines an asynchronous function 'loginFormHandler' that handles the form submission for the login page.
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#login_email").value.trim();
  const password = document.querySelector("#login_password").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/");
    } else {
      alert('Please try again');
    }
  }
};
// Attach an event listener to the login form and call the loginFormHandler function when the form is submitted
document
  .querySelector("#login_form")
  .addEventListener("submit", loginFormHandler);
