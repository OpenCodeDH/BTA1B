const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

const loginBtn = document.getElementById('loginBtn');
const cancelBtn = document.getElementById('cancelBtn');

const formValue = {
  passwordValue: null,
  usernameValue: null,
  isRememberMe: false,
};

function isInvalidControl(controlName) {
  return !formValue[controlName] || !formValue[controlName].trim();
}

function showError(errorControlName, message) {
  if (errorControlName === 'usernameError') {
    usernameError.hidden = false;
    usernameError.innerText = message;
  }
  if (errorControlName === 'passwordError') {
    passwordError.hidden = false;
    passwordError.innerText = message;
  }
}

function hideError(errorControlName) {
  if (errorControlName === 'usernameError') {
    usernameError.hidden = false;
    usernameError.innerText = '';
  }
  if (errorControlName === 'passwordError') {
    passwordError.hidden = false;
    passwordError.innerText = '';
  }
}

function validateControl(controlName, errorControlName, errorMessage) {
  let isValid = true;
  if (isInvalidControl(controlName)) {
    showError(errorControlName, errorMessage);
    isValid = false;
  }
  return isValid;
}

//#region Window Load
window.addEventListener('load', () => {
  usernameInput.value = '';
  passwordInput.value = '';
  usernameError.hidden = true;
  passwordError.hidden = true;
});
//#endregion

//#region Handle Keydonw
usernameInput.addEventListener('keyup', function (e) {
  hideError('usernameError');
  formValue.usernameValue = e.target.value;
});
passwordInput.addEventListener('keyup', function (e) {
  hideError('passwordError');
  formValue.passwordValue = e.target.value;
});
//#region

//# Handle Error
usernameInput.addEventListener('blur', () => {
  validateControl('usernameValue', 'usernameError', 'Please enter your username !!');
});

passwordInput.addEventListener('blur', () => {
  validateControl('passwordValue', 'passwordError', 'Please enter your password !!');
});
//#endregion

loginBtn.addEventListener('click', () => {
  const { isRememberMe, ...restInfo } = formValue;
  let countInvalidControl = 0;
  for (const controlValue in restInfo) {
    if (controlValue === 'usernameValue') {
      const isValid = validateControl('usernameValue', 'usernameError', 'Please enter your username !!');
      !isValid && countInvalidControl++;
    }
    if (controlValue === 'passwordValue') {
      const isValid = validateControl('passwordValue', 'passwordError', 'Please enter your password !!');
      !isValid && countInvalidControl++;
    }
  }
  if (!countInvalidControl) {
    fetch('/dang-nhap', {
      method: 'POST',
      body: JSON.stringify(formValue),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Login Failed. Please check your account information');
        }
        return res.json();
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('Loing successfully');
        window.location.href = '/profile';
      })
      .catch((err) => {
        alert(err.message);
      });
  } else {
    return;
  }
});
