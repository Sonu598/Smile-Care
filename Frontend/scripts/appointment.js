$(function () {
    $('#navbar').load('navbar.html');
    $('#foot').load('footer.html');
}) 
    

 document.addEventListener("DOMContentLoaded", function() {
  let doc=JSON.parse(localStorage.getItem("doc_name"));

  const doctorname = document.getElementById("doctorId");
  doctorname.innerText=doc

  const username = document.getElementById("userId");
  doctorname.innerText=username

  let fee=JSON.parse(localStorage.getItem("amount"));
  console.log(doc);
  const appointmentForm = document.getElementById("appointmentForm");

  appointmentForm.addEventListener("submit", function(event) {
    alert("okkkkkkkkkkkkkkkkk")

      event.preventDefault();

      const doctorname = document.getElementById("doctorId").value;
      const username = document.getElementById("userId").value;
      const time = document.getElementById("time").value;
      const date = document.getElementById("date").value;
      const fees = document.getElementById("fees").value;


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
              date,
              fees
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