// попапы
const editProfilePopupElement = document.querySelector(
  '.popup_type_edit-profile'
);
const addCardPopupElement = document.querySelector('.popup_type_add-card');
const upscalingCardImagePopupElement = document.querySelector(
  '.popup_type_upscaling'
);
const popupList = Array.from(document.querySelectorAll('.popup'));

// кнопки на главной странице (открытия попапов)
const editButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');

// кнопки закрытия попапов
const popupCloseButtonElements = Array.from(
  document.querySelectorAll('.popup__close-button')
);

// формы
const editProfilePopupFormElement =
  editProfilePopupElement.querySelector('.form');
const addCardPopupFormElement = addCardPopupElement.querySelector('.form');

// инпуты форм
const nameInput = editProfilePopupFormElement.querySelector(
  '.form__input_info_name'
);
const jobInput = editProfilePopupFormElement.querySelector(
  '.form__input_info_job'
);
const placeInput = addCardPopupFormElement.querySelector(
  '.form__input_name_place'
);
const imageLinkInput = addCardPopupFormElement.querySelector(
  '.form__input_name_image-link'
);

// template
const cardTemplate = document.querySelector('#card-template');

const cardsListElement = document.querySelector('.cards__list');

const popupCardImage =
  upscalingCardImagePopupElement.querySelector('.popup__image');

const popupImageCaption = upscalingCardImagePopupElement.querySelector(
  '.popup__image-caption'
);

const nameElement = document.querySelector('.profile__name');

const jobElement = document.querySelector('.profile__about-yourself');

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
  popupCardImage.src = data.link;
  popupCardImage.alt = data.alt;
  popupImageCaption.textContent = data.name;

  openPopup(upscalingCardImagePopupElement);
};

// функция создания карточки
const createCard = (data) => {
  const card = cardTemplate.content.querySelector('.card').cloneNode(true);

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

// функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByClickOnEsc);
};

// функция закртыия попапа
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByClickOnEsc);

  const popupForm = popup.querySelector('.form');

  if (popup.contains(popupForm)) {
    resetErrorMessages(popupForm);

    resetFormInputs(popupForm);
  }
};

// функция отправки формы редактирования профиля
const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(editProfilePopupElement);
};

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

  addCardPopupFormElement.reset();
};

// функция для очищения полей формы
const resetFormInputs = (form) => {
  form.reset();
};

// функция для очищения сообщений об ошибке
const resetErrorMessages = (form) => {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const errorClass = validateSettingsObj.errorClass;
  const inputErrorClass = validateSettingsObj.inputErrorClass;

  inputList.forEach((input) => {
    if (!input.validity.valid) {
      hideErrorMessage(input, { inputErrorClass, errorClass });
    }
  });
};

// функция закрытия попала на клавишу Esc
const closePopupByClickOnEsc = (event) => {
  const currentPopup = document.querySelector('.popup_opened');

  if (event.key === 'Escape') {
    closePopup(currentPopup);
  }
};

// функция закрытия попапа по клику на оверлей
const closePopupByClickOnOverlay = (event) => {
  if (event.currentTarget === event.target) {
    closePopup(event.currentTarget);
  }
};

// функция управления неактивной кнопкой
const handleDisableButton = (form) => {
  const submitButton = form.querySelector('.form__submit-button');
  const disableButtonClass = validateSettingsObj.inactiveButtonClass;

  disableButton(submitButton, disableButtonClass);
};

// обработчики событий для редактирования профиля
editButtonElement.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
  openPopup(editProfilePopupElement);
  handleDisableButton(editProfilePopupFormElement);
});

editProfilePopupFormElement.addEventListener(
  'submit',
  handleEditProfileFormSubmit
);

// обработчики событий по добавлению карточки
addButtonElement.addEventListener('click', () => {
  openPopup(addCardPopupElement);
  handleDisableButton(addCardPopupFormElement);
});

addCardPopupFormElement.addEventListener('submit', handleAddCardFormSubmit);

// обработчики событий закрытия попапов на кнопку
popupCloseButtonElements.forEach((closeButton) => {
  const popup = closeButton.closest('.popup');

  closeButton.addEventListener('click', () => {
    closePopup(popup);
  });
});

// обработчики событий закрытия попапов по клику на оверлей
popupList.forEach((popup) => {
  popup.addEventListener('click', closePopupByClickOnOverlay);
});
