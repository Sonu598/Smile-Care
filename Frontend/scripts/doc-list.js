let contain= document.getElementById("content")

fetch("http://localhost:9090/teachers/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    fetchdoc(data)
  });

function TutorsDomain(data) {
  contain.innerHTML = `${data
    .map((element, index) =>
      doc_card()
    ).join(" ")}`;
}

function doc_card(){
  return `
  <div id="card">
  <img src="" alt="Doctor Image" />
  <div id="detail">
          <h1>Doc Spidy <span style="font-size:x-small;">( MBBS )</span></h1>
          <p>
           </p>
          <h4>Fees : <span>2500 /-</span></h4>
          <button>Book Appointment</button>
      
  </div>
</div>

      `;
}


