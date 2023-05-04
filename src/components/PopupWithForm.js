import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formElement = this._popup.querySelector('.form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll('.form__input');

    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleFormSubmit(this._getInputValues());

      super.close();

      this._formElement.reset();
    });

    super.setEventListeners();
  }
}
