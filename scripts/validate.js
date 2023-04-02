const validateSettingsObj = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_visible',
};

const enableValidation = ({ formSelector, ...otherSettings }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    setEventListeners(form, otherSettings);
  });
};

const setEventListeners = (
  form,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...otherSettings }
) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const submitButton = form.querySelector(submitButtonSelector);

  disableButton(submitButton, inactiveButtonClass);

  form.addEventListener('reset', () => {
    disableButton(submitButton, inactiveButtonClass);
  });

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(input, otherSettings);
      if (hasInvalidInput(inputList)) {
        disableButton(submitButton, inactiveButtonClass);
      } else {
        enableButton(submitButton, inactiveButtonClass);
      }
    });
  });
};

const checkValidity = (input, otherSettings) => {
  if (!input.validity.valid) {
    showErrorMessage(input, otherSettings);
  } else {
    hideErrorMessage(input, otherSettings);
  }
};

const showErrorMessage = (input, { inputErrorClass, errorClass }) => {
  input.classList.add(inputErrorClass);

  const errorMessage = document.querySelector(`.${input.id}-error`);
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(errorClass);
};

const hideErrorMessage = (input, { inputErrorClass, errorClass }) => {
  input.classList.remove(inputErrorClass);

  const errorMessage = document.querySelector(`.${input.id}-error`);
  errorMessage.classList.remove(errorClass);
  errorMessage.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const disableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
};

const enableButton = (submitButton, inactiveButtonClass) => {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
};

enableValidation(validateSettingsObj);
