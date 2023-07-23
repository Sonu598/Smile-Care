$(function () {
    $('#navbar').load('navbar.html');
    $('#footer').load('footer.html');
}) 
    

 document.addEventListener("DOMContentLoaded", function() {
  const appointmentForm = document.getElementById("appointmentForm");

  appointmentForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const doctorname = document.getElementById("doctorId").value;
      const username = document.getElementById("userId").value;
      const time = document.getElementById("time").value;
      const date = document.getElementById("date").value;

      // Use AJAX or Fetch API to send the appointment data to the backend
      // Example:
      fetch("/api/appointments", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              doctorname,
              username,
              time,
              date
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
      })
      .catch(error => {
          console.error("Error:", error);
      });
  });
});