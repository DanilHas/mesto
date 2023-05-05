import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupCardImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector(
      '.popup__image-caption'
    );
  }

  open(data) {
    this._popupCardImage.src = data.link;
    this._popupCardImage.alt = data.name;
    this._popupImageCaption.textContent = data.name;

    super.open();
  }
}
