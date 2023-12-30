"use strict";
// Sign in section
const signinContainer = document.querySelector("#signinContainer");
const signinEmailInput = document.querySelector("#signinEmailInput");
const signinPasswordInput = document.querySelector("#signinPasswordInput");
const signinBtn = document.querySelector("#signinBtn");
const registerBtn = document.querySelector("#registerBtn");
const alertEmail = document.querySelector("#alertEmail");
const alertPassword = document.querySelector("#alertPassword");
const alertEmailNotExist = document.querySelector("#alertEmailNotExist");
// Sign up section
const signupContainer = document.querySelector("#signupContainer");
const signupFirstNameInput = document.querySelector("#signupFirstNameInput");
const signupLastNameInput = document.querySelector("#signupLastNameInput");
const signupEmailInput = document.querySelector("#signupEmailInput");
const signupPasswordInput = document.querySelector("#signupPasswordInput");
const signupBtn = document.querySelector("#signupBtn");
const backToSigninBtn = document.querySelector("#backToSigninBtn");
const welcomeBackUserContainer = document.querySelector(
  "#welcomeBackUserContainer p"
);
const logoutBtn = document.querySelector("#logoutBtn");
const alertupEmail = document.querySelector("#alertupEmail");
const alertupPassword = document.querySelector("#alertupPassword");
const alertFirstName = document.querySelector("#alertFirstName");
const alertLastName = document.querySelector("#alertLastName");
const alertupEmailExist = document.querySelector("#alertupEmailExist");
const alertupSuccess = document.querySelector("#alertupSuccess");
const welcomeImg = document.querySelector("#welcomeBackUserContainer img");
let users = [];

signupContainer.classList.add("d-none");
welcomeBackUserContainer.classList.add("d-none");
logoutBtn.classList.add("d-none");

// Errors Handlers
function errorRemove() {
  signinEmailInput.addEventListener("input", () => {
    alertEmail.classList.add("d-none");
  });
  signinPasswordInput.addEventListener("input", () => {
    alertPassword.classList.add("d-none");
  });
  signinContainer.addEventListener("input", () => {
    alertEmailNotExist.classList.add("d-none");
  })
  signupEmailInput.addEventListener("input", () => {
    alertupEmail.classList.add("d-none");
  });
  signupPasswordInput.addEventListener("input", () => {
    alertupPassword.classList.add("d-none");
  });
  signupFirstNameInput.addEventListener("input", () => {
    alertFirstName.classList.add("d-none");
  });
  signupLastNameInput.addEventListener("input", () => {
    alertLastName.classList.add("d-none");
  });
  signupEmailInput.addEventListener("input", () => {
    alertupEmailExist.classList.add("d-none");
  });
}

// Display Sign up
function signupDisplay() {
  errorRemove();
  signinContainer.classList.add("d-none");
  signupContainer.classList.remove("d-none");
  clearInputs();
}
registerBtn.addEventListener("click", signupDisplay);

// Display Sign in
function signinDisplay() {
  errorRemove();
  signinContainer.classList.remove("d-none");
  signupContainer.classList.add("d-none");
  clearInputs();
}
backToSigninBtn.addEventListener("click", signinDisplay);

// Clear inputs
function clearInputs() {
  signupFirstNameInput.value = "";
  signupLastNameInput.value = "";
  signupEmailInput.value = "";
  signupPasswordInput.value = "";

  alertEmail.classList.add("d-none");
  alertPassword.classList.add("d-none");
  alertupEmail.classList.add("d-none");
  alertupPassword.classList.add("d-none");
  alertFirstName.classList.add("d-none");
  alertLastName.classList.add("d-none");
  alertupEmailExist.classList.add("d-none");

  signinEmailInput.value = "";
  signinPasswordInput.value = "";
}

// Sign up function
function signUp() {
  const user = {
    firstName: signupFirstNameInput.value,
    lastName: signupLastNameInput.value,
    email: signupEmailInput.value,
    password: signupPasswordInput.value,
  };

  if (
    signupFirstNameInput.value === "" &&
    signupLastNameInput.value === "" &&
    signupEmailInput.value === "" &&
    signupPasswordInput.value === ""
  ) {
    alertFirstName.classList.remove("d-none");
    alertLastName.classList.remove("d-none");
    alertupEmail.classList.remove("d-none");
    alertupPassword.classList.remove("d-none");
    errorRemove();
    return;
  }
  // check if email is already exist
  if (users.find((u) => u.email === signupEmailInput.value)) {
    alertupEmailExist.classList.remove("d-none");
    errorRemove();
    return;
  }

  if (signupFirstNameInput.value === "") {
    alertFirstName.classList.remove("d-none");
    errorRemove();
    return;
  }

  if (signupLastNameInput.value === "") {
    alertLastName.classList.remove("d-none");
    errorRemove();
    return;
  }

  if (signupEmailInput.value === "" && signupPasswordInput.value === "") {
    alertupEmail.classList.remove("d-none");
    alertupPassword.classList.remove("d-none");
    errorRemove();
    return;
  }

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!signupEmailInput.value.match(emailRegex)) {
    alertupEmail.classList.remove("d-none");
    errorRemove();
    return;
  }

  let passRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if (!signupPasswordInput.value.match(passRegex)) {
    alertupPassword.innerHTML =
      "Password must be between 8 to 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
    alertupPassword.classList.remove("d-none");
    errorRemove();
    return;
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  alertupSuccess.classList.remove("d-none");
  setTimeout(() => {
    alertupSuccess.classList.add("d-none");
  }, 2000);
  clearInputs();
  console.log(users);
}
signupBtn.addEventListener("click", signUp);

// Sign in function
function signin() {
  if (localStorage.getItem("users") !== null) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  for (let i = 0; i < users.length; i++) {
    if (
      signinEmailInput.value === users[i].email &&
      signinPasswordInput.value === users[i].password
    ) {
      welcomeBackUserContainer.classList.remove("d-none");
      signinContainer.classList.add("d-none");
      signupContainer.classList.add("d-none");
      welcomeBackUserContainer.innerHTML = `Welcome back,
       <span class="user-name">${users[i].firstName} ${users[i].lastName}</span> !`;
      welcomeImg.classList.remove('d-none');
      logoutBtn.classList.remove("d-none");
      return;
    }

    if (
      signinEmailInput.value !== users[i].email &&
      signinPasswordInput.value !== users[i].password
    ) {
      alertEmail.classList.remove("d-none");
      alertPassword.classList.remove("d-none");
      errorRemove();
      return;
    }
    if (
      signinEmailInput.value === users[i].email &&
      signinPasswordInput.value !== users[i].password
    ) {
      alertPassword.classList.remove("d-none");
      errorRemove();
      return;
    }
    if (
      signinEmailInput.value !== users[i].email &&
      signinPasswordInput.value === users[i].password
    ) {
      alertEmailNotExist.classList.remove("d-none");
      errorRemove();
      return;
    }
  }
}

signinBtn.addEventListener("click", signin);

// Log out function
function logOut() {
  welcomeBackUserContainer.classList.add("d-none");
  welcomeBackUserContainer.innerHTML = "";
  signinContainer.classList.remove("d-none");
  welcomeImg.classList.add('d-none');
  logoutBtn.classList.add("d-none");
  clearInputs();
}
logoutBtn.addEventListener("click", logOut);
