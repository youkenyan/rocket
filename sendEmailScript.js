// sendEmailScript.js
document.getElementById('contact_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  sendEmail();
});

function sendEmail() {
  const form = document.getElementById('contact_form');
  const formData = new FormData(form);

  fetch('./JScripts/sendEmail.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      alert(data);
      form.reset(); // Reset the form after submission
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
