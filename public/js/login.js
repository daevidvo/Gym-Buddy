const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#login_email").value.trim();
  const password = document.querySelector("#login_password").value.trim();

  console.log(password)

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
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#login_form")
  .addEventListener("submit", loginFormHandler);
