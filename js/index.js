import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDBVHZ0JlEZsFZ0gw7WXcnkF8dwh-XK3h8",
  authDomain: "human-upd.firebaseapp.com",
  databaseURL: "https://human-upd-default-rtdb.firebaseio.com",
  projectId: "human-upd",
  storageBucket: "human-upd.appspot.com",
  messagingSenderId: "949543419997",
  appId: "1:949543419997:web:f1e58b9b48710c85e64db4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

addFormListeners();

function addFormListeners() {
  const formEl = document.querySelector('.main__form');
  const inputEl = document.querySelector('.main__form_input');
  const successEl = document.querySelector('.main__form_success');
  const errorEl = document.querySelector('.main__form_error');
  const shownCn = 'main__form_result--shown';

  inputEl.addEventListener('input', function() {
    successEl.classList.remove(shownCn);
    errorEl.classList.remove(shownCn);
  });

  formEl.addEventListener('submit', function(event) {
    event.preventDefault();
    const emailAddress = inputEl.value;

    if (!validateEmail(emailAddress)) {
      errorEl.classList.add(shownCn);
      setTimeout(() => {
        errorEl.classList.remove(shownCn);
      }, 3000)
      return;
    }

    sendEmailAddress(emailAddress);
    resetEmailInput();
  });

  function resetEmailInput() {
    successEl.classList.add(shownCn);
    setTimeout(() => {
      successEl.classList.remove(shownCn);
    }, 3000)
    inputEl.value = '';
  }
}


function validateEmail(value) {
  const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  return EMAIL_REGEXP.test(value);
}

function sendEmailAddress(emailAddress) {
  const id = `f${Date.now().toString(16)}`;

  set(ref(db, 'email_addresses/' + id), emailAddress);
}