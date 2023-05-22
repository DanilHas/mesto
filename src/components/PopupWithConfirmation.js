import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { removeCardItem }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.form__submit-button');
    this._removeCardItem = removeCardItem;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._removeCardItem(this._classCopy, this._cardId);

      super.close();
    });

    super.setEventListeners();
  }

  open(classCopy, cardId) {
    super.open();
    this._classCopy = classCopy;
    this._cardId = cardId;
  }
}
