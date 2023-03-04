const editButtonElement = document.querySelector(".profile__edit-button");
const popupElement = document.querySelector(".popup");
const closeButtonElement = popupElement.querySelector(".popup__close-button");
const formElement = popupElement.querySelector(".form");
const nameInput = formElement.querySelector(".form__name-input");
const jobInput = formElement.querySelector(".form__job-input");
const nameElement = document.querySelector(".profile__name");
const jobElement = document.querySelector(".profile__about-yourself");
const submitButtonElement = formElement.querySelector(".form__submit-button");

const openPopup = () => {
  popupElement.classList.add("popup_is-opened");
  nameInput.value = nameElement.textContent;
  jobInput.value = jobElement.textContent;
};

const closePopup = () => {
  popupElement.classList.remove("popup_is-opened");
};

const closePopupByClickOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  nameElement.textContent = nameInput.value;
  jobElement.textContent = jobInput.value;
};

editButtonElement.addEventListener("click", openPopup);
closeButtonElement.addEventListener("click", closePopup);
popupElement.addEventListener("click", closePopupByClickOnOverlay);
formElement.addEventListener("submit", handleFormSubmit);
submitButtonElement.addEventListener("click", closePopup);
