import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import validateSettingsObj from '../utils/validateSettings.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import {
  profileButtonElement,
  cardButtonElement,
  avatarButtonElement,
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

    const userInfo = new UserInfo({
      nameElementSelector: '.profile__name',
      jobElementSelector: '.profile__about-yourself',
      avatarElementSelector: '.profile__avatar',
    });

    userInfo.setUserInfo(initialUserInfo);

    const popupCardImage = new PopupWithImage('.popup_type_upscaling');

    const popupConfirmation = new PopupWithConfirmation(
      '.popup_type_delete-card',
      {
        removeItem: (card, cardId) => {
          api.deleteCard(cardId)
            .then(() => {
              card.deleteCard();
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
            popupCardImage.open(item);
          },
          handleDeleteIconClick: (card, cardId) => {
            popupConfirmation.open(card, cardId);
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
        items: initialCards.reverse(),
        renderer: (cardItem) => {
          const cardElement = createCard(cardItem);

          cardsList.addItem(cardElement);
        },
      },
      '.cards__list'
    );

    const popupProfile = new PopupWithForm({
      popupSelector: '.popup_type_edit-profile',
      handleFormSubmit: (formData) => {
        api.editUserInfo(formData)
          .then((result) => {
            userInfo.setUserInfo(result);
            popupProfile.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            popupProfile.renderLoading(false);
          });
      },
    });

    const popupCard = new PopupWithForm({
      popupSelector: '.popup_type_add-card',
      handleFormSubmit: (formData) => {
        api.addNewCard(formData)
          .then((result) => {
            const cardElement = createCard(result);
            cardsList.addItem(cardElement);
            popupCard.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            popupCard.renderLoading(false);
          });
      },
    });

    const popupAvatar = new PopupWithForm({
      popupSelector: '.popup_type_change-avatar',
      handleFormSubmit: (formData) => {
        api.changeAvatar(formData.avatar)
          .then((result) => {
            userInfo.setUserAvatar(result);
            popupAvatar.close();
          })
          .catch((err) => console.error(err))
          .finally(() => {
            popupAvatar.renderLoading(false);
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
      popupProfile,
      popupCard,
      cardsList,
      popupCardImage,
      popupConfirmation,
      popupAvatar,
      enableValidation,
      formValidators,
    };
  })
  .then((data) => {
    const {
      userInfo,
      popupProfile,
      popupCard,
      cardsList,
      popupCardImage,
      popupConfirmation,
      popupAvatar,
      enableValidation,
      formValidators,
    } = data;

    cardsList.renderItems();
    popupCard.setEventListeners();
    popupProfile.setEventListeners();
    popupCardImage.setEventListeners();
    popupConfirmation.setEventListeners();
    popupAvatar.setEventListeners();
    enableValidation(validateSettingsObj);

    cardButtonElement.addEventListener('click', () => {
      formValidators['addCardForm'].resetValidation();

      popupCard.open();
    });

    profileButtonElement.addEventListener('click', () => {
      const userInfoObj = userInfo.getUserInfo();
      popupProfile.setInputValues(userInfoObj);

      formValidators['editProfileForm'].resetValidation();

      popupProfile.open();
    });

    avatarButtonElement.addEventListener('click', () => {
      formValidators['changeAvatarForm'].resetValidation();

      popupAvatar.open();
    });
  })
  .catch((err) => console.error(err));
