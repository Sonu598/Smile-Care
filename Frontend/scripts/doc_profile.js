document.addEventListener("DOMContentLoaded", function () {
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var abut = document.getElementById("abut");
  var exp = document.getElementById("exp");

  skil.addEventListener("click", function () {
    skil.classList.add("active");
    line.classList.remove("active");
    abut.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("a");
    skils.classList.add("b");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  abut.addEventListener("click", function () {
    abut.classList.add("active");
    line.classList.remove("active");
    skil.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("a");
    about_s.classList.add("b");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  line.addEventListener("click", function () {
    abut.classList.remove("active");
    line.classList.add("active");
    skil.classList.remove("active");
    exp.classList.remove("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("b");
    EXP.classList.add("a");
    contact_s.classList.remove("a");
    contact_s.classList.add("b");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var abut = document.getElementById("abut");
  var skil = document.getElementById("skil");
  var line = document.getElementById("line");
  var exp = document.getElementById("exp");

  exp.addEventListener("click", function () {
    abut.classList.remove("active");
    line.classList.remove("active");
    skil.classList.remove("active");
    exp.classList.add("active");
    var about_s = document.getElementById("about_s");
    var contact_s = document.getElementById("contact_s");
    var skils = document.getElementById("skils");
    var EXP = document.getElementById("EXP");
    about_s.classList.remove("b");
    about_s.classList.add("a");
    skils.classList.remove("b");
    skils.classList.add("a");
    EXP.classList.remove("a");
    EXP.classList.add("b");
    contact_s.classList.remove("b");
    contact_s.classList.add("a");
  });
});

let storedId = localStorage.getItem("id");
console.log(storedId);
const url = "http://localhost:9090/teachers/one";

fetch(`${url}/${storedId}`)
  .then((res) => res.json())
  .then((res) => {
    console.log(res.data[0]);
    display(res.data[0]);
    showAvailabeSlots(
      res.data[0].email,
      res.data[0].name,
      res.data[0].subjects[0].name,
      res.data[0].subjects[1].name
    );
  })
  .catch((err) => {
    console.log(err);
  });

function display(data) {
  document.querySelector(".name").value = data.name;
  document.querySelector(".pp").value = data.designation;
  document.querySelector(".gender").value = data.gender;
  document.querySelector("#mai").value = data.email;
  document.querySelector(".loc").value = data.state;
  document.querySelector("#addr").value = data.address;
  document.querySelector("#co").innerText = data.country;
  document.querySelector("#expp").innerText = data.teachingExp;
  document.querySelector("#re").innerText = data.experience;
  document.querySelector("#whrs").innerText = data.workingHrs;
  document.querySelector("#disc").innerText = data.description;
  document.querySelector("#ol").innerText = data.teachesOnline;
  document.querySelector("#HH").innerText = data.homeworkHelp;
  document.querySelector("#fee").innerText = data.fees;
  localStorage.setItem("amo", data.fees);
  let imageUrl = data.image;
  let imageElement = document.getElementById("pic");
  imageElement.setAttribute("src", imageUrl);
}

function showAvailabeSlots(email, teacherName, firstSubject, secondSubject) {
  let scheduleButton = document.getElementById("schedule-meet-btn");

  scheduleButton.addEventListener("click", () => {
    localStorage.setItem("teacherEmail", email);
    localStorage.setItem("teacherName", teacherName);
    localStorage.setItem("secondSubject", secondSubject);
    localStorage.setItem("firstSubject", firstSubject);
    console.log(email, teacherName, firstSubject, secondSubject);
    if (email == localStorage.getItem("userEmail")) {
      console.log("tutor email and student email is same");
      window.location.href = "slot/createSlot.html";
    } else {
      console.log("tutor email and student email is different");
      window.location.href = "tutor/tutorAppointment.html";
    }
  });
}

