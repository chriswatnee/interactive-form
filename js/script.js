const nameInput = document.querySelector("#name");
const titleSelect = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const colorOptions = colorSelect.querySelectorAll("option[data-theme]");

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

// Disable color select
colorSelect.disabled = true;

// Listen for design select change
designSelect.addEventListener("change", () => {
  // Enable color select
  colorSelect.disabled = false;
  // Select first color option for design
  const colorOption = colorSelect.querySelector(`option[data-theme="${designSelect.value}"]`);
  colorOption.selected = true;
  // Hide/show and disable/enable color options
  for (let i = 0; i < colorOptions.length; i++) {
    const colorOption = colorOptions[i];
    if (designSelect.value === colorOption.getAttribute("data-theme")) {
      colorOption.hidden = false;
      colorOption.disabled = false;
    } else {
      colorOption.hidden = true;
      colorOption.disabled = true;
    }
  }
});