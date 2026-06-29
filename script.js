const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];

// Data Fetch
fetch(api)
  .then(res => res.json())
  .then(data => {
    allMembers = data;
    renderMembers(allMembers);
  })
  .catch(err => {
    console.log("Error:", err);
    membersContainer.innerHTML = "<p>Failed to load members.</p>";
  });

// Show Members
function renderMembers(data) {
  membersContainer.innerHTML = "";

  data.forEach(user => {
    membersContainer.innerHTML += `
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
}

// Search
searchInput.addEventListener("input", function (e) {
  const value = e.target.value.toLowerCase();

  const filtered = allMembers.filter(user =>
    (user["Full Name"] || "").toLowerCase().includes(value) ||
    (user["Role"] || "").toLowerCase().includes(value) ||
    (user["City"] || "").toLowerCase().includes(value) ||
    (user["Genre"] || "").toLowerCase().includes(value)
  );

  renderMembers(filtered);
});
