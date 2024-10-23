document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const number = document.getElementById('number').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (firstName === '' || lastName === '' || email === '' || number === '' || subject === '' || message === '') {
      alert('Please fill in all fields.');
      return;
    }
  
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    alert('Message sent successfully!');
    // Here you can add the logic to send the form data to your server
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  