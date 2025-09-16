const loginbutton = document.querySelector(".login-btn");
const haederButtons =document.querySelectorAll(".header-btn");
const registerButton = document.querySelector(".register-btn");
const formTitle = document.querySelector(".form-title");
const loginform = document.querySelector(".login-form");
const registerform = document.querySelector(".register-form");
const eyeButtons = document.querySelectorAll(".eye-btn");
const alertText = document.querySelectorAll(".alert-text");
const navigateLinks = document.querySelectorAll(".navigate-link");


//login elements



const loginEmailInput = document.getElementById("login-email-input");
const loginEmailAlert = document.getElementById("login-email-alert");
const loginPasswordInput = document.getElementById("login-password-input");
const loginPasswordAlert = document.getElementById("login-password-alert");
// register elements

// Event listeners for login and register buttons
// show register form when click to register button
registerButton.addEventListener("click", () => {
    // Hide the login form and show the register form
    formTitle.innerText = "Register Form";
    // toggel form buttons
    registerButton.classList.add("active");
    loginbutton.classList.remove("active");
    // show the register form and hide the login form
    registerform.classList.add("active");
    loginform.classList.remove("active");

});
// show login form when click to login button
loginbutton.addEventListener("click", () => {
    // Hide the register form and show the login form
    formTitle.innerText = "Login Form";
    // toggel form buttons
    loginbutton.classList.add("active");
    registerButton.classList.remove("active");
    // show the login form and hide the register form
    loginform.classList.add("active");
    registerform.classList.remove("active");
})

// Event listener for eye button
eyeButtons.forEach((eye) => {
    eye.addEventListener("click", () => {
        // المنت قبلی تغییر نماده ای کلمه عبور
        const input = eye.previousElementSibling;

        // input.type = input.type === "password" ? "text" : "password";
        // eye.firstElementChild.classList.replace('fa-eye', input.type === 'password'? 'fa-eye-slash' : 'fa-eye');
        // برای تغییر چشم و تغییر نماده ای کلمه عبور
        if (input.type === "password") {
            input.type = "text";
            // برای تغییر نماده ای کلمه عبور
            eye.firstElementChild.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            // برای تغییر نماده ای کلمه عبور
            input.type = "password";
            eye.firstElementChild.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
});

// register form elements
const registerEmailInput = document.getElementById("register-email-input");
const registerEmailAlert = document.getElementById("register-email-alert");
const registerPasswordInput = document.getElementById("register-password-input");
const registerPasswordAlert = document.getElementById("register-password-alert");
const registerConfirmPasswordInput = document.getElementById("register-confirm-password-input");
const registerConfirmPasswordAlert = document.getElementById("register-confirm-password-alert");



// Event listener for navigate links
navigateLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const dataLink = link.dataset.link;
  
      if (dataLink === "register") {
        registerButton.click();
      } else if (dataLink === "login") {
        loginbutton.click();
      }
    });
});
// vaidate login form
loginform.addEventListener("submit", (e) => {
  if (!validateloginForm()) {
    e.preventDefault();
  }
});
  
// validate login email
loginEmailInput.addEventListener("input", () => {
  const emailFormat =
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
if (!loginEmailInput.value.match(emailFormat)) {
  loginEmailInput.classList.add("wrong-input");
  loginEmailAlert.innerText = "Please Enter Valid Email Address 😡"; 
  
} else {
  loginEmailInput.classList.remove("wrong-input");
  loginEmailInput.classList.add("true-input");
  loginEmailAlert.innerText = "";
  
  }

  
});
// validate login password 
loginPasswordInput.addEventListener("input", () => {
  if (loginPasswordInput.value.length < 6) {
    loginPasswordInput.classList.add("wrong-input");
    loginPasswordAlert.innerText = "Password should be at least 6 characters long 😎";
   
  }
  else {

    loginPasswordInput.classList.remove
    ("wrong-input");
    loginPasswordInput.classList.add("true-input");
    loginPasswordAlert.innerText = "";
  }

  
});
const validateloginForm = () => {

  // validate login email
  const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!loginEmailInput.value.match(emailFormat)) {
    loginEmailInput.classList.add("wrong-input");
    loginEmailAlert.innerText = "Please Enter Valid Email Address 😡";
    return false;
  
  } 
    // validate login password
    if (loginPasswordInput.value.length < 6) {
      loginPasswordInput.classList.add("wrong-input");
      loginPasswordAlert.innerText = "Password should be at least 6 characters long ��";
      return false;
    } 
  return true
};
// vaidate register password
registerform.addEventListener("submit", (e) => {
  if (!validateRegisterForm()) {
    e.preventDefault();
  }
});
// vaidate register email
registerEmailInput.addEventListener("input", () => {
  const emailFormat =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!registerEmailInput.value.match(emailFormat)) {
    registerEmailInput.classList.add("wrong-input");
    registerEmailAlert.innerText = "Please Enter Valid Email Address🙄";
  } else {
    registerEmailInput.classList.remove("wrong-input");
    registerEmailInput.classList.add("true-input");
    registerEmailAlert.innerText = "";
  }

});

// validate register password

registerPasswordInput.addEventListener("input", () => {
  if (registerPasswordInput.value.length < 6) {
    registerPasswordInput.classList.add("wrong-input");
    registerPasswordAlert.innerText = "Password should be at least 6 characters long😏";
  } else {
    registerPasswordInput.classList.remove("wrong-input");
    registerPasswordInput.classList.add("true-input");
    registerPasswordAlert.innerText = "";
  }

});
//  validate register confirm password.
registerConfirmPasswordInput.addEventListener("input", () => {
  if (registerConfirmPasswordInput.value.length < 6) {
    registerConfirmPasswordInput.classList.add("wrong-input");
    registerConfirmPasswordAlert.innerText = "Password should be at least 6 characters long😐";
  }
  else if (registerConfirmPasswordInput.value !== registerPasswordInput.value) {
    registerConfirmPasswordInput.classList.add("wrong-input");
    registerConfirmPasswordAlert.innerText = "Passwords do not match😪";
  
  }
  else {
    registerConfirmPasswordInput.classList.remove("wrong-input");
    registerConfirmPasswordInput.classList.add("true-input");
    registerConfirmPasswordAlert.innerText = "";
  }
});
// validate register form 
const validateRegisterForm = () => {
  // validate register email
  const emailFormat =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!registerEmailInput.value.match(emailFormat)) {
    registerEmailInput.classList.add("wrong-input");
    registerEmailAlert.innerText = "Please Enter Valid Email Address😙";
    return false;
  }
  // validate  password
  if (registerPasswordInput.value.length < 6) {
    registerPasswordInput.classList.add("wrong-input");
    registerPasswordAlert.innerText = "Password should be at least 6 characters long🤐";
    return false;
  }
  // validate confirm password
  if (registerConfirmPasswordInput.value.length < 6) {
    registerConfirmPasswordInput.classList.add("wrong-input");
    registerConfirmPasswordAlert.innerText = "Password should be at least 6 characters long😫";
    return false;
  }
  else if (registerConfirmPasswordInput.value!== registerPasswordInput.value) {
    registerConfirmPasswordInput.classList.add("wrong-input");
    registerConfirmPasswordAlert.innerText = "Passwords do not match😐";
    return false;
  }
  // if all validations passed return true
  return true;


} 
// rest form inputs alert switch to false
haederButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    alertText.forEach((alert) => {
      alert.innerText = "";
    });
    
  });

});