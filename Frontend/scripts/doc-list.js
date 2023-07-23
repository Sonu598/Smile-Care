let contain = document.getElementById("content");
let sortSelect = document.getElementById("sort-select");
let locationInput = document.getElementById("locationInput");
let doctorsData = []; // Array to store the fetched data

// Fetch initial data and store it in the doctorsData array
fetch("http://localhost:2015/doctor/allDoctor")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    doctorsData = data; // Store the fetched data in the array
    TutorsDomain(doctorsData); // Display the data on the page
  });

function TutorsDomain(data) {
  contain.innerHTML = `${data.map((element, index) => doc_card(element)).join(" ")}`;
}

function doc_card(element) {
  return `
    <div class="card">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r8Q7-RgTO0jrN80AHUj139ftv3ZeKnpg5Q&usqp=CAU" alt="Doctor Image" />
      <div class="detail">
        <h1 class="naam">${element.name} <span style="font-size:x-small;">( MBBS )</span></h1>
        <p>An experience of ${element.experience} years from ${element.location}</p>
        <h4>Fees : <span class="paise">${element.fees}</span>/-</h4>
        <a href="./appointment.html"><button class="btn">Book Appointment</button></a>
      </div>
    </div>`;
}

let cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  let btn = card.querySelector(".btn");
  let naam = card.querySelector(".naam").innerText;
  let paise = card.querySelector(".paise").innerText;

  btn.addEventListener("click", () => {
    localStorage.setItem("Doc_name", naam);
    localStorage.setItem("amount", paise);
  });
});


function filterData(data, sortingOption) {
  let sortedData = data.slice(); // Create a shallow copy of the original data

  switch (sortingOption) {
    case "lowPrice":
      sortedData.sort((a, b) => a.fees - b.fees);
      break;
    case "highPrice":
      sortedData.sort((a, b) => b.fees - a.fees);
      break;
    // "Price" or default case: no sorting required, keep the original order
    default:
      break;
  }

  return sortedData;
}
locationInput.addEventListener("input", performSearch);

function performSearch() {
  let locationTerm = locationInput.value.toLowerCase();

  let filteredData = doctorsData.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm) &&
      doctor.location.toLowerCase().includes(locationTerm)
  );

  TutorsDomain(filteredData);
}

sortSelect.addEventListener("change", () => {
  let selectedOption = sortSelect.value;
  let sortedData = filterData(doctorsData, selectedOption);
  TutorsDomain(sortedData);
});

