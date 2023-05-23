import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { removeItem }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
    this._removeItem = removeItem;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._removeItem(this._card, this._cardId);

      super.close();
    });

    super.setEventListeners();
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
}
