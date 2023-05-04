class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return card;
  }

  _likeCard = () => {
    this._cardLikeButton.classList.toggle('card__like-button_active');
  };

  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardDeleteButton = this._element.querySelector(
      '.card__delete-button'
    );
    this._cardImage = this._element.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', this._likeCard);
    this._cardDeleteButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', this._handleCardClick.bind(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
