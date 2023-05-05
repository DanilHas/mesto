import './index.css';
import initialCards from '../utils/cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validateSettingsObj from '../utils/validateSettings.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { editButtonElement, addButtonElement } from '../utils/constants.js';


const upscalingCardImagePopup = new PopupWithImage('.popup_type_upscaling');

const createCard = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        upscalingCardImagePopup.open(item);
      },
    },
    '#card-template'
  );

  const cardElement = card.generateCard();
  return cardElement;
};

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const cardElement = createCard(cardItem);

      cardsList.addItem(cardElement);
    },
  },
  '.cards__list'
);

cardsList.renderItems();

const userInfo = new UserInfo({
  nameElementSelector: '.profile__name',
  jobElementSelector: '.profile__about-yourself',
});

const editProfilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  },
});

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (formData) => {
    const cardElement = createCard(formData);

    cardsList.addItem(cardElement);
  },
});

// включение валидации форм
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    const validator = new FormValidator(config, form);

    const formName = form.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validateSettingsObj);


// обработчики событий для редактирования профиля
editButtonElement.addEventListener('click', () => {
  const userInfoObj = userInfo.getUserInfo();
  editProfilePopup.setInputValues(userInfoObj);

  formValidators['editProfileForm'].resetValidation();

  editProfilePopup.open();
});

editProfilePopup.setEventListeners();

// обработчики событий по добавлению карточки
addButtonElement.addEventListener('click', () => {
  formValidators['addCardForm'].resetValidation();

  addCardPopup.open();
});

addCardPopup.setEventListeners();

upscalingCardImagePopup.setEventListeners();
