let tutors = document.getElementById("tutors");
// Fetching the data from the Tutor-Route
let userName = document.getElementById("userName");
userName.innerText = localStorage.getItem("name");

let storedData = {};

fetch("http://localhost:9090/teachers/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    TutorsDomain(data);
    storedData = { data };
    console.log(data);
    forData();
  });

function TutorsDomain(data) {
  tutors.innerHTML = `${data
    .map((element, index) =>
      tutorCard(
        element._id,
        element.name,
        element.designation,
        element.subjects,
        element.description,
        element.address,
        element.workingHrs,
        element.experience,
        element.teachingExp
      )
    )

    .join(" ")}`;
}

function tutorCard(
  _id,
  name,
  designation,
  subjects,
  description,
  address,
  workingHrs,
  experience,
  teachingExp
) {
  return `
    <div class="tutor-box" id="tutor-box" data-id="${_id}">
                      <div class="tutorIndividual">
                          <div class="name">
                              <h2>${name}</h2>
                              <h4>${designation}</h4>
                          </div>
                          <div class="sub">
                              <h5>${subjects[0].name}</h5>
                              <h5>${subjects[1].name}</h5>
                          </div>
                          <div class="desc">
                              <p>
                                  ${description}
                              </p>
                          </div>
                          <div class="extraDetail">
                              <div class="logos">
                              <i class="uil uil-map-marker"></i>
                              <h6>${address}</h6>
                              </div>
                              <div class="logos">
                              <i class="uil uil-hourglass"></i>
                              <h6>${workingHrs} Hr</h6>
                              </div>
                              <div class="logos">
                              <i class="uil uil-clipboard"></i>
                              <h6>${experience} yrs</h6>
                              </div>
                              <div class="logos">
                              <i class="uil uil-presentation-edit"></i>
                              <h6>${teachingExp} yrs</h6>
                              </div>
                          </div>
                      </div>
                  </div>
      `;
}

///filtering by state & subjects

let searchBtn = document.getElementById("searchBtn");
let subjectInput = document.getElementById("subjectInput");
let locationInput = document.getElementById("locationInput");
let filteredData = [];

searchBtn.addEventListener("click", () => {
  filteredData = [];
  if (locationInput.value && subjectInput.value) {
    storedData.data.forEach((element, i) => {
      if (
        (locationInput.value == element.state &&
          subjectInput.value == element.subjects[0].name) ||
        (locationInput.value == element.state &&
          subjectInput.value == element.subjects[1].name)
      ) {
        filteredData.push(element);
      }
    });
    // console.log(storedData.data)
    TutorsDomain(filteredData);
    forData();
    locationInput.value = null;
    subjectInput.value = null;
  } else if (subjectInput.value) {
    storedData.data.forEach((element, i) => {
      if (
        subjectInput.value == element.subjects[0].name ||
        subjectInput.value == element.subjects[1].name
      ) {
        filteredData.push(element);
      }
    });
    // console.log(storedData.data)

    TutorsDomain(filteredData);
    forData();
    subjectInput.value = null;
  } else if (locationInput.value) {
    storedData.data.forEach((element, i) => {
      if (locationInput.value == element.state) {
        filteredData.push(element);
      }
    });
    // console.log(storedData.data)
    TutorsDomain(filteredData);
    forData();
    locationInput.value = null;
  }
});

///filtering by state options

let statesbtn = document.querySelectorAll(".state");

// btn.addEventListener("click",()=>{
//   filteredData=[]
//   storedData.data.forEach((element,i)=>{
//     if(btn.innerText==element.state ){
//      filteredData.push(element)
//   }
//    })
//    TutorsDomain(filteredData);

// })

statesbtn.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    filteredData = [];
    storedData.data.forEach((element, i) => {
      if (btn.innerText == element.state) {
        filteredData.push(element);
      }
    });
    TutorsDomain(filteredData);
    forData();
  });
});

////Sending Id to teacherdetail_page

function forData() {
  let teacherDivs = document.querySelectorAll("#tutor-box");

  console.log(teacherDivs);
  teacherDivs.forEach((element) => {
    element.addEventListener("click", () => {
      console.log("ye hai email :", element.dataset.id);
      localStorage.setItem("id", element.dataset.id);
      location.href = "../teacher_disc.html";
    });
  });
}
