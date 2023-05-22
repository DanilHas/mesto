class Card {
  constructor(
    { data, handleCardClick, handleDeleteIconClick, handleLikeCard },
    templateSelector
  ) {
    this._item = data.item;
    this._name = this._item.name;
    this._link = this._item.link;
    this._likes = this._item.likes;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return card;
  }

  activateLikeButton() {
    this._cardLikeButton.classList.add('card__like-button_active');
  }

  deactivateLikeButton() {
    this._cardLikeButton.classList.remove('card__like-button_active');
  }

  changeLikeCounter(likesArr) {
    this._likeCounter.textContent = likesArr.length;
  }

  isLiked(likesArr) {
    const myLike = likesArr.find((like) => {
      return like._id === this._userId;
    });

    return myLike;
  }

  deleteCard = () => {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners() {
    this._cardLikeButton = this._element.querySelector('.card__like-button');
    this._cardDeleteButton = this._element.querySelector(
      '.card__delete-button'
    );
    this._cardImage = this._element.querySelector('.card__image');

    this._cardLikeButton.addEventListener('click', () =>
      this._handleLikeCard(this._item._id)
    );
    this._cardDeleteButton.addEventListener('click', () =>
      this._handleDeleteIconClick(this, this._item._id)
    );
    this._cardImage.addEventListener('click', this._handleCardClick.bind(this));
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._setEventListeners();
    this.changeLikeCounter(this._likes);

    if (this.isLiked(this._likes)) {
      this.activateLikeButton();
    } else {
      this.deactivateLikeButton();
    }

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.remove();
      this._cardDeleteButton = null;
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
