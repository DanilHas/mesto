export default class FormValidator {
  constructor(validateSettings, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(validateSettings.inputSelector)
    );
    this._inputErrorClass = validateSettings.inputErrorClass;
    this._errorClass = validateSettings.errorClass;
    this._submitButton = this._formElement.querySelector(
      validateSettings.submitButtonSelector
    );
    this._inactiveButtonClass = validateSettings.inactiveButtonClass;
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);

        this._toggleButtonState();
      });
    });

    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  _checkValidity(input) {
    if (!input.validity.valid) {
      this._showErrorMessage(input);
    } else {
      this.hideErrorMessage(input);
    }
  }

  _showErrorMessage(input) {
    input.classList.add(this._inputErrorClass);

    const errorMessage = this._formElement.querySelector(`.${input.id}-error`);
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._errorClass);
  }

  hideErrorMessage(input) {
    input.classList.remove(this._inputErrorClass);

    const errorMessage = this._formElement.querySelector(`.${input.id}-error`);
    errorMessage.classList.remove(this._errorClass);
    errorMessage.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      this.hideErrorMessage(input);
    });
  }

  enableValidation() {
    this._disableButton();
    this._setEventListeners();
  }
}
