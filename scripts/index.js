import initialCards from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import validateSettingsObj from './validateSettings.js';

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

// формы
const editProfilePopupFormElement = document.forms.editProfileForm;
const addCardPopupFormElement = document.forms.addCardForm;
const formList = Array.from(document.forms);

// инпуты форм
const nameInput = editProfilePopupFormElement.elements.username;
const jobInput = editProfilePopupFormElement.elements['user-info'];
const placeInput = addCardPopupFormElement.elements.place;
const imageLinkInput = addCardPopupFormElement.elements['image-link'];

const cardsListElement = document.querySelector('.cards__list');

const popupCardImage =
  upscalingCardImagePopupElement.querySelector('.popup__image');

const popupImageCaption = upscalingCardImagePopupElement.querySelector(
  '.popup__image-caption'
);

const nameElement = document.querySelector('.profile__name');

const jobElement = document.querySelector('.profile__about-yourself');

//Функция увеличения изображения картинки
const upscalingCardImage = (data) => {
  popupCardImage.src = data.link;
  popupCardImage.alt = data.name;
  popupImageCaption.textContent = data.name;

  openPopup(upscalingCardImagePopupElement);
};

// функция создания карточки
const createCard = (data) => {
  const card = new Card(data, '#card-template', upscalingCardImage);
  const cardElement = card.generateCard();

  return cardElement;
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
};

// функция отправки формы редактирования профиля
const handleEditProfileFormSubmit = (event) => {
  event.preventDefault();

  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;

  closePopup(editProfilePopupElement);

  editProfilePopupFormElement.reset();
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

// функция закрытия попала на клавишу Esc
const closePopupByClickOnEsc = (event) => {
  if (event.key === 'Escape') {
    const currentPopup = document.querySelector('.popup_opened');

    closePopup(currentPopup);
  }
};

// включение валидации форм
formList.forEach((item) => {
  const form = new FormValidator(validateSettingsObj, item);
  form.enableValidation();
});

// функция для очищения сообщений об ошибке
const resetErrorMessages = (form) => {
  const inputList = Array.from(form.querySelectorAll('.form__input'));

  inputList.forEach((input) => {
    new FormValidator(validateSettingsObj, form).hideErrorMessage(input);
  });
};

// обработчики событий для редактирования профиля
editButtonElement.addEventListener('click', () => {
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;

  resetErrorMessages(editProfilePopupFormElement);

  openPopup(editProfilePopupElement);
});

editProfilePopupFormElement.addEventListener(
  'submit',
  handleEditProfileFormSubmit
);

// обработчики событий по добавлению карточки
addButtonElement.addEventListener('click', () => {
  openPopup(addCardPopupElement);
});

addCardPopupFormElement.addEventListener('submit', handleAddCardFormSubmit);

// обработчики событий закрытия попапов по клику на оверлей и на кнопку
popupList.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }

    if (event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
