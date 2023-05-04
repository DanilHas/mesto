import './index.css';
import initialCards from '../utils/cards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validateSettingsObj from '../utils/validateSettings.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  editButtonElement,
  addButtonElement,
  editProfilePopupFormElement,
  formList,
  nameInput,
  jobInput,
} from '../utils/constants.js';


const cardsList = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(
        {
          data: cardItem,
          handleCardClick: () => {
            const upscalingCardImagePopup = new PopupWithImage(
              '.popup_type_upscaling',
              cardItem
            );
            upscalingCardImagePopup.open();
          },
        },
        '#card-template'
      );

      const cardElement = card.generateCard();

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
    const card = new Card(
      {
        data: formData,
        handleCardClick: () => {
          const upscalingCardImagePopup = new PopupWithImage(
            '.popup_type_upscaling',
            formData
          );
          upscalingCardImagePopup.open();
        },
      },
      '#card-template'
    );

    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
  },
});

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
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.job;

  resetErrorMessages(editProfilePopupFormElement);

  editProfilePopup.open();
});

editProfilePopup.setEventListeners();

// обработчики событий по добавлению карточки
addButtonElement.addEventListener('click', () => {
  addCardPopup.open();
});

addCardPopup.setEventListeners();
