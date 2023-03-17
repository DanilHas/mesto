const initialCards = [
  {
    name: 'Ватикан',
    link: './images/vatican-museum.jpg',
    alt: 'Изображение спиральной лестницы в Ватиканском музее',
  },
  {
    name: 'Сидней',
    link: './images/sydney-opera-house.jpg',
    alt: 'Изображение оперного театра в Сиднее',
  },
  {
    name: 'Амстердам',
    link: './images/amsterdam-sluishuis.jpg',
    alt: 'Изображение необычного жилого здания в Амстердаме',
  },
  {
    name: 'Холмогорский район',
    link: './images/kholmogorsky-rayon.jpg',
    alt: 'Изображение путей железной дороги посреди леса',
  },
  {
    name: 'Иваново',
    link: './images/ivanovo.jpg',
    alt: 'Вечернее изображение жилых многоквартирных домов. Вид сверху',
  },
  {
    name: 'Архыз',
    link: './images/arkhyz.jpg',
    alt: 'Изображение горных вершин в районе Архыза',
  },
];

const cardsListElement = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card-template');
const upscalingCardImagePopupElement = document.querySelector(
  '.popup_type_upscaling'
);

// Функция, чтобы поставить/убрать лайк
const likeCard = (event) => {
  event.target.classList.toggle('card__like-button_active');
};

// Функция удаления карточки
const deleteCard = (event) => {
  const card = event.target.closest('.card');
  card.remove();
};

//Функция увеличения изображения картинки
const upscalingCardImage = (data) => {
  const popupCardImage = document.querySelector('.popup__image');
  const popupImageCaption = document.querySelector('.popup__image-caption');

  popupCardImage.src = data.link;
  popupCardImage.alt = data.alt;
  popupImageCaption.textContent = data.name;

  openPopup(upscalingCardImagePopupElement);
};

// функция создания карточки
const createCard = (data) => {
  const card = cardTemplate.content.cloneNode(true);

  const cardImage = card.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = data.alt;

  card.querySelector('.card__title').textContent = data.name;

  const cardLikeButton = card.querySelector('.card__like-button');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  cardLikeButton.addEventListener('click', likeCard);
  cardDeleteButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => upscalingCardImage(data));

  return card;
};

// функция добавления карточки в разметку
const addCard = (data, cardsContainer) => {
  cardsContainer.prepend(createCard(data));
};

// добавление первых 6-ти карточек на страницу
initialCards.forEach((card) => {
  addCard(card, cardsListElement);
});

// инициализация элементов, необходимых для редактирования профиля
const editButtonElement = document.querySelector('.profile__edit-button');
const editProfilePopupElement = document.querySelector(
  '.popup_type_edit-profile'
);
const editProfilePopupCloseButtonElement =
  editProfilePopupElement.querySelector('.popup__close-button');
const editProfilePopupFormElement =
  editProfilePopupElement.querySelector('.form');
const nameInput = editProfilePopupFormElement.querySelector(
  '.form__input_info_name'
);
const jobInput = editProfilePopupFormElement.querySelector(
  '.form__input_info_job'
);
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__about-yourself');

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// функция закртыия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

// функция отправки формы редактирования профиля
const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup(editProfilePopupElement);
};

// навешивание событий для редактирования профиля
editButtonElement.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(editProfilePopupElement);
});
editProfilePopupCloseButtonElement.addEventListener('click', () =>
  closePopup(editProfilePopupElement)
);
editProfilePopupFormElement.addEventListener(
  'submit',
  handleEditProfileFormSubmit
);

// инициализация элементов, необходимых для добавления карточки
const addCardPopupElement = document.querySelector('.popup_type_add-card');
const addCardPopupCloseButtonElement = addCardPopupElement.querySelector(
  '.popup__close-button'
);
const addButtonElement = document.querySelector('.profile__add-button');
const addCardPopupFormElement = addCardPopupElement.querySelector('.form');
const placeInput = addCardPopupFormElement.querySelector(
  '.form__input_name_place'
);
const imageLinkInput = addCardPopupFormElement.querySelector(
  '.form__input_name_image-link'
);

// функция отправки формы добавления карточки
const handleAddCardFormSubmit = (event) => {
  event.preventDefault();

  const data = {
    name: placeInput.value,
    link: imageLinkInput.value,
    alt: placeInput.value,
  };

  addCard(data, cardsListElement);
  closePopup(addCardPopupElement);

  placeInput.value = '';
  imageLinkInput.value = '';
};

// события по добавлению карточки
addButtonElement.addEventListener('click', () =>
  openPopup(addCardPopupElement)
);
addCardPopupCloseButtonElement.addEventListener('click', () =>
  closePopup(addCardPopupElement)
);
addCardPopupFormElement.addEventListener('submit', handleAddCardFormSubmit);

// инициализация кнопки закрытия попапа увеличения изображения картинки
const upscalingCardImagePopupCloseButton =
  upscalingCardImagePopupElement.querySelector('.popup__close-button');

// событие закрытия попапа увеличения изображения картинки
upscalingCardImagePopupCloseButton.addEventListener('click', () =>
  closePopup(upscalingCardImagePopupElement)
);
