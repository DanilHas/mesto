import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._data = data;
    this._popup = document.querySelector(popupSelector);
    this._popupCardImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector(
      '.popup__image-caption'
    );
  }

  open() {
    this._popupCardImage.src = this._data.link;
    this._popupCardImage.alt = this._data.name;
    this._popupImageCaption.textContent = this._data.name;

    super.setEventListeners();
    super.open();
  }
}
