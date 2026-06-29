const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];

// LOAD DATA
async function loadMembers() {
  try {
    const res = await fetch(api);
    allMembers = await res.json();
    render(allMembers);
  } catch (err) {
    membersContainer.innerHTML = "<p>Data load failed</p>";
    console.log(err);
  }
}

// SAFE GET
function get(user, key) {
  return (user[key] || "").toString().trim();
}

// RENDER
function render(data) {
  membersContainer.innerHTML = "";

  data.forEach(user => {
    membersContainer.innerHTML += `
      <div class="card">
        <h2>${get(user, "Name")}</h2>

        <p><b>Role:</b> ${get(user, "Role")}</p>
        <p><b>Experience:</b> ${get(user, "Experience")}</p>
        <p><b>City:</b> ${get(user, "City")}</p>
        <p><b>Genre:</b> ${get(user, "Genre")}</p>
        <p><b>Looking For:</b> ${get(user, "Looking For")}</p>
        <p><b>Type:</b> ${get(user, "Free/paid")}</p>

        <p><b>Instagram:</b> ${get(user, "Instagram Link")}</p>

        <p>${get(user, "About")}</p>
      </div>
    `;
  });
}

// SEARCH
searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase().trim();

  const filtered = allMembers.filter(user =>
    get(user, "Name").toLowerCase().includes(value) ||
    get(user, "Role").toLowerCase().includes(value) ||
    get(user, "City").toLowerCase().includes(value) ||
    get(user, "Genre").toLowerCase().includes(value) ||
    get(user, "Experience").toLowerCase().includes(value)
  );

  render(filtered);
});

// ROLE FILTER (GLOBAL FUNCTION)
function filterRole(role) {
  if (role === "All") {
    render(allMembers);
    return;
  }

  const filtered = allMembers.filter(user =>
    get(user, "Role").toLowerCase().includes(role.toLowerCase())
  );

  render(filtered);
}

// START
loadMembers();
