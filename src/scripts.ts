// eslint-disable-next-line import/no-extraneous-dependencies
const $ = require('jquery');

const registerBtn = $('.js-register-btn');
let registeredName: string;
let registeredPassword: string;
let registeredEmail: string;

$('.js-form-name').on('input', function () {
  registeredName = String($(this).val());
});

$('.js-form-password').on('input', function () {
  registeredPassword = String($(this).val());
});

$('.js-form-email').on('input', function () {
  registeredEmail = String($(this).val());
});

const verifyRegistrationForm = (name: string, password: string, email: string) => {
  // const registeredName = $('.js-form-name').val();
  // const registeredPassword = $('.js-form-password').val();
  // const registeredEmail = $('.js-form-email').val();
  const msgContainer = $('.form-container__footer');
  const emptyFieldsErrorMsgEle = $('<span />').attr({ class: 'footer__message footer__message--error js-empty-field-err-msg' });
  const nameErrorMsgEle = $('<span />').attr({ class: 'footer__message footer__message--error js-name-error-msg' });
  const passwordErrorMsgEle = $('<span />').attr({ class: 'footer__message footer__message--error js-password-error-msg' });
  const emailErrorMsgEle = $('<span />').attr({ class: 'footer__message footer__message--error js-email-error-msg' });
  const successMsgEle = $('<span />').attr({ class: 'footer__message footer__message--success js-success-msg' });
  const successMsg = $('.js-success-msg');
  const emptyFieldsErrorMsg = $('.js-empty-field-err-msg');
  const nameErrorMsg = $('.js-name-error-msg');
  const passwordErrorMsg = $('.js-password-error-msg');
  const emailErrorMsg = $('.js-email-error-msg');
  let isValidCounter = 0;

  const checkFieldsNotEmpty = () => {
    if (!name || !password || !email) {
      emptyFieldsErrorMsgEle.html('- Some fields are empty. Please fill out all fields!');
      msgContainer.append(emptyFieldsErrorMsgEle);
      console.log('Empty fields');
    } else {
      isValidCounter += 1;
      console.log('Fields ok');
    }
  };

  const validateName = () => {
    if (!(/^[a-zA-Z]{2,50}$/.test(String(name)))) {
      nameErrorMsgEle.html('- The <i>name</i> must have at least 2 characters and can only contain letters. Max 50 characters.');
      msgContainer.append(nameErrorMsgEle);
      console.log('Invalid name');
    } else {
      isValidCounter += 1;
      console.log('Name ok');
    }
  };

  const validatePassword = () => {
    if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(String(password)))) {
      passwordErrorMsgEle.html('- The <i>password</i> must be at least 8 characters long and must contain at least 1 number and 1 special character (!, @, #, $, %, ^, &, *).');
      msgContainer.append(passwordErrorMsgEle);
      console.log('Invalid password');
    } else {
      isValidCounter += 1;
      console.log('Password ok');
    }
  };

  const validateEmail = () => {
    if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(email)))) {
      emailErrorMsgEle.html('- The <i>email</i> must be in a valid format (e.g. example@example.com).');
      msgContainer.append(emailErrorMsgEle);
      console.log('Invalid email');
    } else {
      isValidCounter += 1;
      console.log('Email ok');
    }
  };

  const success = () => {
    successMsgEle.html('- Registration form is valid!');
    msgContainer.append(successMsgEle);
    console.log('Success');
  };

  const removeMessages = () => {
    emptyFieldsErrorMsg.slideUp('normal', () => $(emptyFieldsErrorMsg).remove());
    successMsg.slideUp('normal', () => $(successMsg).remove());
    emailErrorMsg.slideUp('normal', () => $(emailErrorMsg).remove());
    passwordErrorMsg.slideUp('normal', () => $(passwordErrorMsg).remove());
    nameErrorMsg.slideUp('normal', () => $(nameErrorMsg).remove());
  };

  const testInput = () => {
    removeMessages();
    checkFieldsNotEmpty();
    if (isValidCounter === 1) {
      validateName();
      validatePassword();
      validateEmail();
    }
    if (isValidCounter === 4) {
      success();
    }
  };

  testInput(); // Call testInput() to test all inputs and give error/success message.
};

$(() => { // shorthand for $(document).ready(function(){ ... });
  registerBtn.on('click', (event: Event) => {
    event.preventDefault();
    verifyRegistrationForm(registeredName, registeredPassword, registeredEmail);
  });
});

export default verifyRegistrationForm;
