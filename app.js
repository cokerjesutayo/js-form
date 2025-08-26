const form = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const password2Input = document.querySelector("#password2");
const captchaInput = document.querySelector("#captcha");
const image = document.querySelector("img");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{};:'",./?]).{8,}$/;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // check input fields
  checkInputs();
});

function checkInputs() {
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const confirmpassword = password2Input.value.trim();
  const captcha = captchaInput.value.trim();

  // handle the username
  if (!username) {
    setError(usernameInput, "Username is required");

    //set error class
  } else if (username.length < 5) {
    setError(usernameInput, "Minimum username length is 5");
  } else {
    setSuccess(usernameInput);
  }

  //   handle email
  if (!email) {
    setError(emailInput, "Email is required");
  } else if (!emailRegex.test(email)) {
    setError(emailInput, "Provide a valid email address");
  } else {
    setSuccess(emailInput);
  }

  //handle password
  if (!password) {
    setError(passwordInput, "Password is required");

    //set error class
  } else if (passwordRegex.test(password)) {
    setError(passwordInput, "Uppercase, lowercase, number, special character and min of 8");
  } else {
    setSuccess(passwordInput);
  }

  // confirm password
  if (!confirmpassword) {
    setError(password2Input, " Confirm password is required");

    //set error class
  } else if (confirmpassword !== password) {
    setError(password2Input, "Password do not match");
  } else {
    setSuccess(password2Input);
  }

  // captcha handling

  if (!captcha) {
    setError(captchaInput, " Authentication needed");
  }
}

// className, cla(ssList.add
function setError(input, errorMessage) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form-control error";
  small.textContent = errorMessage;
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
// handle captcha validation
captchaInput.addEventListener("input", (e) => {
  const text = e.target.value;
  const blurValue = 20 - text.length * 2;
  image.style.filter = `blur(${blurValue}px`;
  if (blurValue <= 0) {
    setSuccess(captchaInput);
  } else {
    setError(captchaInput, "text is not long enough");
  }
});


// event propagation
const toggleBtn= document.querySelector(".showbtn");

toggleBtn.addEventListener("click",()=>{
  const type= passwordInput.type;
  if (type === "password"){
    passwordInput.setAttribute("type", "text");
    toggleBtn.textContent="hide";
  }else{
     passwordInput.setAttribute("type", "password");
     toggleBtn.textContent = "show";
  }
})