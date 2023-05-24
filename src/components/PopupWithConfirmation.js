import Popup from './Popup';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { removeItem }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.popup__submit-button');
    this._removeItem = removeItem;
  }

  setEventListeners() {
    this._confirmButton.addEventListener('click', () => {
      this._removeItem(this._item, this._itemId);

      super.close();
    });

    super.setEventListeners();
  }

  open(item, itemId) {
    super.open();
    this._item = item;
    this._itemId = itemId;
  }
}
