var email    = document.getElementById('email'),
    password = document.getElementById('password'),
    submit   = document.getElementById('loginSubmit');

email.addEventListener('change', () => { validate(); });
password.addEventListener('change', () => { validate(); });
submit.addEventListener('click', ()=> { sendLogin() });

function sendLogin() {
  var e = email.value;
  var p = password.value;
  var data = {
    "email": e,
    "password": p
  };
  app.send('/login', data);

  email.value = "";
  password.value = "";
}

function validate() {
  console.log('validate was called')
  if (email.value.length>6 && password.value.length > 7) {
    if (submit.classList.contains('disabled')) {
      submit.classList.remove('disabled');
    }
  } else {
    if (!submit.classList.contains('disabled')) {
      submit.classList.add('disabled');
    }
  }
}
console.log('login is running');