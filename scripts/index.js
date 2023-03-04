const editButtonElement = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButtonElement = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_info_name');
const jobInput = formElement.querySelector('.form__input_info_job');
const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__about-yourself');

const openPopup = () => {
  popupElement.classList.add('popup_opened');
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
};

const closePopup = () => {
  popupElement.classList.remove('popup_opened');
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
  closePopup();
};

editButtonElement.addEventListener('click', openPopup);
closeButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);
