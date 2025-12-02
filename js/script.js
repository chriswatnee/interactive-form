const nameInput = document.querySelector("#name");
const titleSelect = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");

// Set focus on name input field
nameInput.focus();

// Hide other job role input field
otherJobRoleInput.style.display = "none";

// Listen for title select change
titleSelect.addEventListener("change", () => {
  // Display/hide the other job role input based on the selection
  if (titleSelect.value === "other") {
    otherJobRoleInput.style.display = "inherit";
  } else {
    otherJobRoleInput.style.display = "none";
  }
});