const nameInput = document.querySelector("#name");
const titleSelect = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const colorOptions = colorSelect.querySelectorAll("option[data-theme]");
const activitiesFieldset = document.querySelector("#activities");
const activitiesCostParagraph = document.querySelector("#activities-cost");
const paymentSelect = document.querySelector("#payment");
const creditCardDiv = document.querySelector("#credit-card");
const paypalDiv = document.querySelector("#paypal");
const bitcoinDiv = document.querySelector("#bitcoin");

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

// Listen for activities fieldset change
activitiesFieldset.addEventListener("change", () => {
  // Select checked activity checkboxes
  const checkedCheckboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]:checked');
  let totalCost = 0;
  // Calculate total cost of activities
  for (let i = 0; i < checkedCheckboxes.length; i++) {
    const dataCostStr = checkedCheckboxes[i].getAttribute("data-cost");
    totalCost += parseInt(dataCostStr);
  }
  // Display total cost of activities
  activitiesCostParagraph.textContent = `Total: $${totalCost}`;
});

// Set payment select to credit card and hide other payment divs by default
paymentSelect.value = "credit-card";
paypalDiv.style.display = "none";
bitcoinDiv.style.display = "none";

// Listen for payment select change
paymentSelect.addEventListener("change", () => {
  const displayOrHidePaymentDiv = (paymentType, paymentDiv) => {
    if (paymentSelect.value === paymentType) {
      paymentDiv.style.display = "inherit";
    } else {
      paymentDiv.style.display = "none";
    }
  };
  // Display only the seleected payment method div
  displayOrHidePaymentDiv("credit-card", creditCardDiv);
  displayOrHidePaymentDiv("paypal", paypalDiv);
  displayOrHidePaymentDiv("bitcoin", bitcoinDiv);
});