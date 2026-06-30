const api = "https://sheetdb.io/api/v1/ixxby18l8vjrm";

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");
const citySelect = document.getElementById("cityFilter");

let allMembers = [];
let currentRole = "All";
let currentCity = "All";

// Load Data
async function loadMembers() {
  try {
    const res = await fetch(api);
    allMembers = await res.json();
    render(allMembers);
  } catch (err) {
    console.error(err);
    membersContainer.innerHTML = "<h2>Failed to load members.</h2>";
  }
}

// Safe Get
function get(user, key) {
  return (user[key] || "").toString().trim();
}

// Function to generate class names safely based on Google Form options
function getClassFriendlyRole(role) {
  return role.toLowerCase()
             .replace(/[^a-z0-9]/g, '-') // Special characters jaise '/' ko '-' bana dega
             .replace(/-+/g, '-');       // Double spaces/hyphens ko single karega
}

// Render Cards
function render(data) {
  membersContainer.innerHTML = "";

  if (data.length === 0) {
    membersContainer.innerHTML = "<h2>No members found.</h2>";
    return;
  }

  data.forEach(user => {
    const rawRole = get(user, "Role");
    const roleClass = getClassFriendlyRole(rawRole); // For styling card & badge

    membersContainer.innerHTML += `
      <div class="card card-${roleClass}">
        <h2>${get(user, "Name")}</h2>
        
        <span class="role-badge badge-${roleClass}">${rawRole}</span>
        <hr style="border:0; border-top:1px solid #eee; margin:10px 0;">

        <p><b>Experience:</b> ${get(user, "Experience")}</p>
        <p><b>City:</b> 📍 ${get(user, "City")}</p>
        <p><b>Genre:</b> ${get(user, "Genre")}</p>
        <p><b>Looking For:</b> ${get(user, "Looking For")}</p>
        <p><b>Free/Paid:</b> ${get(user, "Free/Paid")}</p>
        <p><b>About:</b> ${get(user, "About")}</p>

        ${
          get(user, "Instagram Link")
            ? `<a href="${get(user, "Instagram Link")}" target="_blank">📷 Instagram</a>`
            : ""
        }
      </div>
    `;
  });
}

// Search + Role + City Filter Combo
function applyFilters() {
  const search = searchInput.value.toLowerCase().trim();

  const filtered = allMembers.filter(user => {
    // 1. Search Bar Match
    const matchSearch =
      get(user, "Name").toLowerCase().includes(search) ||
      get(user, "Role").toLowerCase().includes(search) ||
      get(user, "City").toLowerCase().includes(search) ||
      get(user, "Genre").toLowerCase().includes(search);

    // 2. Role Button Match
    const matchRole =
      currentRole === "All" ||
      get(user, "Role").toLowerCase() === currentRole.toLowerCase();

    // 3. City Dropdown Match
    const matchCity =
      currentCity === "All" ||
      get(user, "City").toLowerCase() === currentCity.toLowerCase();

    return matchSearch && matchRole && matchCity;
  });

  render(filtered);
}

// Search Event
searchInput.addEventListener("input", applyFilters);

// Role Filter Button Trigger
function filterRole(role) {
  currentRole = role;
  applyFilters();
}

// City Filter Dropdown Trigger
function filterCity() {
  currentCity = citySelect.value;
  applyFilters();
}

// Start
loadMembers();
