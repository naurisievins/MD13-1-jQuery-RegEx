import $ from 'jquery';

const registerBtn = $('.js-register-btn');

const verifyRegistrationForm = () => {
  const registeredName = $('.js-form-name').val();
  const registeredPassword = $('.js-form-password').val();
  const registeredEmail = $('.js-form-email').val();
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
    if (!registeredName || !registeredPassword || !registeredEmail) {
      if (emptyFieldsErrorMsgEle) {
        emptyFieldsErrorMsg.slideUp('normal', () => $(emptyFieldsErrorMsg).remove());
      }
      emptyFieldsErrorMsgEle.text('- Some fields are empty. Please fill out all fields!');
      msgContainer.append(emptyFieldsErrorMsgEle);
    } else {
      emptyFieldsErrorMsg.slideUp('normal', () => $(emptyFieldsErrorMsg).remove());
      isValidCounter += 1;
    }
  };

  const validateName = () => {
    if (!(/^[a-zA-Z]{2,50}$/.test(String(registeredName)))) {
      if (nameErrorMsgEle) {
        nameErrorMsg.slideUp('normal', () => $(nameErrorMsg).remove());
      }
      nameErrorMsgEle.html('- The <i>name</i> must have at least 2 characters and can only contain letters. Max 50 characters.');
      msgContainer.append(nameErrorMsgEle);
    } else {
      isValidCounter += 1;
      nameErrorMsg.slideUp('normal', () => $(nameErrorMsg).remove());
    }
  };

  const validatePassword = () => {
    if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(String(registeredPassword)))) {
      if (passwordErrorMsgEle) {
        passwordErrorMsg.slideUp('normal', () => $(passwordErrorMsg).remove());
      }
      passwordErrorMsgEle.html('- The <i>password</i> must be at least 8 characters long and must contain at least 1 number and 1 special character (!, @, #, $, %, ^, &, *).');
      msgContainer.append(passwordErrorMsgEle);
    } else {
      passwordErrorMsg.slideUp('normal', () => $(passwordErrorMsg).remove());
      isValidCounter += 1;
    }
  };

  const validateEmail = () => {
    if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(String(registeredEmail)))) {
      if (emailErrorMsgEle) {
        emailErrorMsg.slideUp('normal', () => $(emailErrorMsg).remove());
      }
      emailErrorMsgEle.html('- The <i>email</i> must be in a valid format (e.g. example@example.com).');
      msgContainer.append(emailErrorMsgEle);
    } else {
      emailErrorMsg.slideUp('normal', () => $(emailErrorMsg).remove());
      isValidCounter += 1;
    }
  };

  const successMessage = () => {
    if (isValidCounter === 4) {
      if (successMsgEle) {
        successMsg.slideUp('normal', () => $(successMsg).remove());
      }
      successMsgEle.html('- Registration form is valid!');
      msgContainer.append(successMsgEle);
    } else {
      successMsg.slideUp('normal', () => $(successMsg).remove());
    }
  };

  const testInput = () => {
    checkFieldsNotEmpty();
    if (isValidCounter === 1) {
      validateName();
      validatePassword();
      validateEmail();
    }
    if (isValidCounter === 4) {
      successMessage();
    }
  };
  testInput();
};

$(() => { // shorthand for $(document).ready(function(){ ... });
  registerBtn.on('click', (event: Event) => {
    event.preventDefault();
    verifyRegistrationForm();
  });
});
