import './index.css';
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
  profileName,
  profileAboutYourself,
  profileAvatar,
  changeAvatarButtonElement,
} from '../utils/constants.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '7465e869-899f-4ef6-ae51-f5f41eae39be',
    'Content-Type': 'application/json',
  },
});

api.renderInitialData()
  .then((result) => {
    const [initialUserInfo, initialCards] = result;

    profileName.textContent = initialUserInfo.name;
    profileAboutYourself.textContent = initialUserInfo.about;
    profileAvatar.src = initialUserInfo.avatar;

    const upscalingCardImagePopup = new PopupWithImage('.popup_type_upscaling');

    const deleteCardPopup = new PopupWithConfirmation(
      '.popup_type_delete-card',
      {
        removeCardItem: (classCopy, cardId) => {
          api.deleteCard(cardId)
            .then(() => {
              classCopy.deleteCard();
            })
            .catch((err) => console.error(err));
        },
      }
    );

    const createCard = (item) => {
      const card = new Card(
        {
          data: {
            item,
            userId: initialUserInfo._id,
            ownerId: item.owner._id,
          },
          handleCardClick: () => {
            upscalingCardImagePopup.open(item);
          },
          handleDeleteIconClick: (classCopy, cardId) => {
            deleteCardPopup.open(classCopy, cardId);
          },
          handleLikeCard: (cardId) => {
            const isLiked = card.isLiked(item.likes);

            if (isLiked) {
              api.deleteLike(cardId)
                .then((result) => {
                  card.deactivateLikeButton();
                  card.changeLikeCounter(result.likes);
                  item = result;

                  return item;
                })
                .catch((err) => console.error(err));
            } else {
              api.likeCard(cardId)
                .then((result) => {
                  card.activateLikeButton();
                  card.changeLikeCounter(result.likes);
                  item = result;

                  return item;
                })
                .catch((err) => console.error(err));
            }
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

    const userInfo = new UserInfo({
      nameElementSelector: '.profile__name',
      jobElementSelector: '.profile__about-yourself',
    });

    const editProfilePopup = new PopupWithForm({
      popupSelector: '.popup_type_edit-profile',
      handleFormSubmit: (formData) => {
        api.editUserInfo(formData)
          .then((result) => {
            userInfo.setUserInfo(result);
          })
          .catch((err) => console.error(err))
          .finally(() => {
            editProfilePopup.renderLoading(false);
          });
      },
    });

    const addCardPopup = new PopupWithForm({
      popupSelector: '.popup_type_add-card',
      handleFormSubmit: (formData) => {
        api.addNewCard(formData)
          .then((result) => {
            const cardElement = createCard(result);
            cardsList.addItem(cardElement);
          })
          .catch((err) => console.error(err))
          .finally(() => {
            addCardPopup.renderLoading(false);
          });
      },
    });

    const changeAvatarPopup = new PopupWithForm({
      popupSelector: '.popup_type_change-avatar',
      handleFormSubmit: (formData) => {
        api.changeAvatar(formData.avatar)
          .then((result) => {
            profileAvatar.src = result.avatar;
          })
          .catch((err) => console.error(err))
          .finally(() => {
            changeAvatarPopup.renderLoading(false);
          });
      },
    });

    // включение валидации форм
    const formValidators = {};

    const enableValidation = (config) => {
      const formList = Array.from(
        document.querySelectorAll(config.formSelector)
      );
      formList.forEach((form) => {
        const validator = new FormValidator(config, form);

        const formName = form.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
      });
    };

    return {
      userInfo,
      editProfilePopup,
      addCardPopup,
      cardsList,
      upscalingCardImagePopup,
      deleteCardPopup,
      changeAvatarPopup,
      enableValidation,
      formValidators,
    };
  })
  .then((data) => {
    const {
      userInfo,
      editProfilePopup,
      addCardPopup,
      cardsList,
      upscalingCardImagePopup,
      deleteCardPopup,
      changeAvatarPopup,
      enableValidation,
      formValidators,
    } = data;

    cardsList.renderItems();
    addCardPopup.setEventListeners();
    editProfilePopup.setEventListeners();
    upscalingCardImagePopup.setEventListeners();
    deleteCardPopup.setEventListeners();
    changeAvatarPopup.setEventListeners();
    enableValidation(validateSettingsObj);

    addButtonElement.addEventListener('click', () => {
      formValidators['addCardForm'].resetValidation();

      addCardPopup.open();
    });

    editButtonElement.addEventListener('click', () => {
      const userInfoObj = userInfo.getUserInfo();
      editProfilePopup.setInputValues(userInfoObj);

      formValidators['editProfileForm'].resetValidation();

      editProfilePopup.open();
    });

    changeAvatarButtonElement.addEventListener('click', () => {
      formValidators['changeAvatarForm'].resetValidation();

      changeAvatarPopup.open();
    });
  })
  .catch((err) => console.error(err));
