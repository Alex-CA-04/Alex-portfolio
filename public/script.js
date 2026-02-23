const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    const data = {
        name: name,
        email: email,
        message: message
    };
    
    
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        messageDiv.textContent = 'Message sent successfully!';
        messageDiv.style.color = 'green';
        form.reset();
    })
    .catch(error => {
        messageDiv.textContent = 'Error sending message!';
        messageDiv.style.color = 'red';
    });
});
