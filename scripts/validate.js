function showInputError(formElement, inputElement, errorMessage, popupObj) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(popupObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(popupObj.errorClass);
}

function hideInputError(formElement, inputElement, popupObj)  {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(popupObj.inputErrorClass);
  errorElement.classList.remove(popupObj.errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, popupObj) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, popupObj);
  } else {
    hideInputError(formElement, inputElement, popupObj);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
});
}

function toggleButtonState(inputList, buttonElement, popupObj) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(popupObj.inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(popupObj.inactiveButtonClass);
  }
}

function setEventListeners(formElement, popupObj) {
  const inputList = Array.from(formElement.querySelectorAll(popupObj.inputSelector));
  const buttonElement = formElement.querySelector(popupObj.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, popupObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, popupObj);
      toggleButtonState(inputList, buttonElement, popupObj);
    });
  });
}

function enableValidation(popupObj) {
  const formList = Array.from(document.querySelectorAll(popupObj.formSelector));
  
  formList.forEach((formElement) => {
    setEventListeners(formElement, popupObj);    
  });
}

enableValidation({  
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
});