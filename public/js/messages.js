async function messageFormHandler(event) {
    event.preventDefault();
  
    const message = document.querySelector('#message-body').value.trim();
  
    const userId = 123; // replace with actual user ID
  
    if (message) {
      const response = await fetch('/messages', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          message,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
        document.querySelector('#message-form').style.display = "block";
      }
    }
  }
  
  document.querySelector('.message-form').addEventListener('submit', messageFormHandler);