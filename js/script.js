const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const titleSelect = document.querySelector("#title");
const otherJobRoleInput = document.querySelector("#other-job-role");
const designSelect = document.querySelector("#design");
const colorSelect = document.querySelector("#color");
const colorOptions = colorSelect.querySelectorAll("option[data-theme]");
const activitiesFieldset = document.querySelector("#activities");
const activitiesBoxDiv = activitiesFieldset.querySelector("#activities-box");
const activityCheckboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]');
const activitiesCostParagraph = document.querySelector("#activities-cost");
const paymentSelect = document.querySelector("#payment");
const creditCardDiv = document.querySelector("#credit-card");
const ccNumInput = document.querySelector("#cc-num");
const zipInput = document.querySelector("#zip");
const cvvInput = document.querySelector("#cvv");
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

// Listen for form submit
form.addEventListener("submit", (e) => {
  let formError = false;
  // The name input cannot be blank or empty
  const isValidName = (name) => name.trim() !== "";
  // The email input must contain a correctly formatted email address
  const isValidEmail = (email) => /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  // There must be at least one activity selected
  const activitySelected = () => {
    const checkedCheckboxes = activitiesFieldset.querySelectorAll('input[type="checkbox"]:checked');
    return checkedCheckboxes.length > 0;
  };
  // The credit card number input must contain a 13-16 digit number
  const isValidCreditCard = (ccNum) => /^\d{13,16}$/.test(ccNum);
  // The zip code input must contain a 5-digit number
  const isValidZip = (zip) => /^\d{5}$/.test(zip);
  // The CVV input must contain a 3-digit number
  const isValidCVV = (cvv) => /^\d{3}$/.test(cvv);
  // Display error helper function
  const displayError = (element) => {
    element.parentElement.classList.add("not-valid");
    element.parentElement.classList.remove("valid");
    element.parentElement.lastElementChild.style.display = "block";
  };
  // Hide error helper function
  const hideError = (element) => {
    element.parentElement.classList.add("valid");
    element.parentElement.classList.remove("not-valid");
    element.parentElement.lastElementChild.style.display = "none";
  };
  // If name fails validation
  if (!isValidName(nameInput.value)) {
    formError = true;
    displayError(nameInput);
  } else {
    hideError(nameInput);
  }
  // If email fails validation
  if (!isValidEmail(emailInput.value)) {
    formError = true;
    displayError(emailInput);
  } else {
    hideError(emailInput);
  }
  // If activity selection fails validation
  if (!activitySelected()) {
    formError = true;
    displayError(activitiesBoxDiv);
  } else {
    hideError(activitiesBoxDiv);
  }
  // If credit card is the selected payment method
  if (paymentSelect.value === "credit-card") {
    // If credit card number fails validation
    if (!isValidCreditCard(ccNumInput.value)) {
      formError = true;
      displayError(ccNumInput);
    } else {
      hideError(ccNumInput);
    }
    // If zip fails validation
    if (!isValidZip(zipInput.value)) {
      formError = true;
      displayError(zipInput);
    } else {
      hideError(zipInput);
    }
    // If CVV fails validation
    if (!isValidCVV(cvvInput.value)) {
      formError = true;
      displayError(cvvInput);
    } else {
      hideError(cvvInput);
    }
  }
  // Form submission prevented if form validation fails
  if (formError) {
    e.preventDefault();
  }
});

// Add visible focus states to the activity checkboxes
for (let i = 0; i < activityCheckboxes.length; i++) {
  const activityCheckbox = activityCheckboxes[i];
  activityCheckbox.addEventListener("focus", () => {
    activityCheckbox.parentElement.classList.add("focus");
  });
  activityCheckbox.addEventListener("blur", () => {
    activityCheckbox.parentElement.classList.remove("focus");
  });
}