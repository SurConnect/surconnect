alert("JavaScript Loaded");

const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const members = document.getElementById("members");

fetch(api)
.then(res => res.json())
.then(data => {

members.innerHTML="";

data.forEach(user=>{

members.innerHTML += `

<div class="card">

<h2>${user["Full Name"]}</h2>

<p><b>Role:</b> ${user["Role"]}</p>

<p><b>City:</b> ${user["City"]}</p>

<p><b>Experience:</b> ${user["Experience "]}</p>

<p><b>Genre:</b> ${user["Genre"]}</p>

<p><b>Looking For:</b> ${user["Looking For"]}</p>

<p><b>${user["Free / Paid"]}</b></p>

<button>View Profile</button>

</div>

`;

});

});
