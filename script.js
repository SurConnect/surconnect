const SUPABASE_URL = "https://mrzbadbnluqttkkwrllz.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yemJhZGJubHVxdHRra3dybGx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MjgyMTcsImV4cCI6MjA5ODQwNDIxN30.ZQgYt9G73aERGI4v1cpZ5a_Lk3RLSmqtCoOitdc_J9A";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const membersContainer = document.getElementById("members");
const searchInput = document.getElementById("search");

let allMembers = [];
let currentRole = "All";

function get(user, key) {
  return (user[key] || "").toString().trim();
}

async function loadMembers() {

  membersContainer.innerHTML = "<h2>Loading...</h2>";

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    membersContainer.innerHTML = "<h2>Failed to load members.</h2>";
    return;
  }

  allMembers = data;
  render(allMembers);
}

function render(data) {

  membersContainer.innerHTML = "";

  if (data.length === 0) {
    membersContainer.innerHTML = "<h2>No members found.</h2>";
    return;
  }

  data.forEach(user => {

    membersContainer.innerHTML += `
      <div class="card">

      <h2>${get(user,"name")}</h2>

      <p><b>Role:</b> ${get(user,"role")}</p>
      <p><b>Experience:</b> ${get(user,"experience")}</p>
      <p><b>City:</b> ${get(user,"city")}</p>
      <p><b>Genre:</b> ${get(user,"genre")}</p>
      <p><b>Looking For:</b> ${get(user,"looking_for")}</p>
      <p><b>Free/Paid:</b> ${get(user,"pricing")}</p>
      <p><b>About:</b> ${get(user,"about")}</p>

      ${
        get(user,"instagram")
        ? `<a href="${get(user,"instagram")}" target="_blank">📷 Instagram</a>`
        : ""
      }

      </div>
    `;

  });

}

function applyFilters() {

  const search = searchInput.value.toLowerCase();

  const filtered = allMembers.filter(user=>{

    const matchSearch =

      get(user,"name").toLowerCase().includes(search) ||
      get(user,"role").toLowerCase().includes(search) ||
      get(user,"city").toLowerCase().includes(search) ||
      get(user,"genre").toLowerCase().includes(search);

    const matchRole =

      currentRole==="All" ||
      get(user,"role").toLowerCase()===currentRole.toLowerCase();

    return matchSearch && matchRole;

  });

  render(filtered);

}

searchInput.addEventListener("input",applyFilters);

function filterRole(role){

  currentRole=role;
  applyFilters();

}

loadMembers();
