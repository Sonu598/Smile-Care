let contain= document.getElementById("content")

fetch("http://localhost:2015/doctor/allDoctor")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    TutorsDomain(data)
  });
 let data=[{name:"amit", fees:30}]
 TutorsDomain(data)

function TutorsDomain(data) {
  contain.innerHTML = `${data
    .map((element, index) =>
      doc_card(element)
    ).join(" ")}`;
}

function doc_card(element){
  return `
  <div id="card">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-r8Q7-RgTO0jrN80AHUj139ftv3ZeKnpg5Q&usqp=CAU" alt="Doctor Image" />
  <div id="detail">
          <h1 id="naam">${element.name} <span style="font-size:x-small;">( MBBS )</span></h1>
          <p>An experience of ${element.experience} years from ${element.location}</p>
          <h4>Fees : <span  id="paise">${element.fees}</span>/-</h4>
          <a href="./appointment.html"><button id="btn">Book Appointment</button></a>
      
  </div>
</div>

      `;
}


let btn=document.getElementById("btn")
let naam=document.getElementById("naam").innerText
let paise=document.getElementById("paise").innerText

btn.addEventListener("click",()=>{
 localStorage.setItem("Doc_name",naam)
 localStorage.setItem("amount",paise)
})

