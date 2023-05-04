// кнопки на главной странице (открытия попапов)
export const editButtonElement = document.querySelector('.profile__edit-button');
export const addButtonElement = document.querySelector('.profile__add-button');

// формы
export const editProfilePopupFormElement = document.forms.editProfileForm;
export const formList = Array.from(document.forms);

// инпуты форм
export const nameInput = editProfilePopupFormElement.elements.username;
export const jobInput = editProfilePopupFormElement.elements['user-info'];
