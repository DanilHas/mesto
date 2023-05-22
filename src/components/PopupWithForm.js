import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.form');
    this._formSubmitButton = this._formElement.querySelector(
      '.popup__submit-button'
    );
    this._submitButtonText = this._formSubmitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._formElement.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();

    this._formElement.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formSubmitButton.textContent = 'Сохранение...';
    } else {
      this._formSubmitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);

      this._handleFormSubmit(this._getInputValues());

      this.close();
    });

    super.setEventListeners();
  }
}
