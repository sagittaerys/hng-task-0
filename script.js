const form = document.getElementById("contactForm");
const successMessage = document.querySelector(
  '[data-testid="test-contact-success"]'
);

// input validation
const validators = {
  fullName: (value) => {
    if (!value.trim()) {
      return "Full name is required.";
    }
    return null;
  },
  email: (value) => {
    if (!value.trim()) {
      return "Email is required.";
    }

    // a simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address (e.g., name@example.com).";
    }
    return null;
  },
  subject: (value) => {
    if (!value.trim()) {
      return "Subject is required.";
    }
    return null;
  },
  message: (value) => {
    if (!value.trim()) {
      return "Message is required.";
    }
    if (value.trim().length < 10) {
      return "Message must be at least 10 characters long.";
    }
    return null;
  },
};

// function to validate a single field
function validateField(fieldName, value) {
  const error = validators[fieldName](value);
  const input = document.querySelector(`[name="${fieldName}"]`);
  const errorDiv = document.getElementById(
    `${fieldName === "fullName" ? "name" : fieldName}Error`
  );

  if (error) {
    // higlight error
    errorDiv.textContent = error;
    errorDiv.classList.add("show");
    input.classList.add("input-error");
    return false;
  } else {
    errorDiv.textContent = "";
    errorDiv.classList.remove("show");
    input.classList.remove("input-error");
    return true;
  }
}

const fields = ["fullName", "email", "subject", "message"];
fields.forEach((fieldName) => {
  const input = document.querySelector(`[name="${fieldName}"]`);
  input.addEventListener("blur", () => {
    validateField(fieldName, input.value);
  });

  // Clear error on input
  input.addEventListener("input", () => {
    const errorDiv = document.getElementById(
      `${fieldName === "fullName" ? "name" : fieldName}Error`
    );
    if (errorDiv.classList.contains("show")) {
      validateField(fieldName, input.value);
    }
  });
});

// form submission handler
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // hide success message initially
  successMessage.classList.remove("show");

  // validating all fields
  let isValid = true;
  fields.forEach((fieldName) => {
    const input = document.querySelector(`[name="${fieldName}"]`);
    const fieldValid = validateField(fieldName, input.value);
    if (!fieldValid) {
      isValid = false;
    }
  });

  // to conditionally render when inputs are valid
  if (isValid) {
    successMessage.classList.add("show");

    // reset form
    form.reset();

    // clear any remaining error styles
    fields.forEach((fieldName) => {
      const input = document.querySelector(`[name="${fieldName}"]`);
      input.classList.remove("input-error");
    });

    // scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

    successMessage.focus();
  } else {
    const firstError = document.querySelector(".input-error");
    if (firstError) {
      firstError.focus();
    }
  }
});

// time update function for home page
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

updateTime();
setInterval(updateTime, 1000);
