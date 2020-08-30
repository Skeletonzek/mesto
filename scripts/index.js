import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards} from './initial-cards.js';
import {openModalWindow, closeModalWindow} from './utils.js';

const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupProfileName = popupProfile.querySelector('input[name="name"]');
const popupProfileStatus = popupProfile.querySelector('input[name="status"]');
const popupCardName = popupCard.querySelector('input[name="name"]');
const popupCardLink = popupCard.querySelector('input[name="link"]');
const popupProfileClose = popupProfile.querySelector('.popup-profile__close');
const popupCardClose = popupCard.querySelector('.popup-card__close');
const popupProfileSubmit = popupProfile.querySelector('.popup-profile__submit');
const popupCardSubmit = popupCard.querySelector('.popup-card__submit');
const profileEdit = document.querySelector('.profile-info__change');
const picView = document.querySelector('.popup-pic');
const cardAdd = document.querySelector('.profile__add');
const picClose = document.querySelector('.popup-pic__close');
const profileName = document.querySelector('.profile-info__name');
const profileStatus = document.querySelector('.profile-info__status');
const places = document.querySelector('.places');

const popupAttribute = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

const validCard = new FormValidator(popupAttribute, '.popup-card');
const validProfile = new FormValidator(popupAttribute, '.popup-profile');

validCard.enableValidation();
validProfile.enableValidation();

const renderCard = (data) => {
  const card = new Card(data, '#place-template');
  places.prepend(card.generateCard());
}

initialCards.forEach(function (item){
  renderCard(item);
});

function openPopupProfile() {
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;
  validProfile.resetInputError();
  openModalWindow(popupProfile);
}

function closePopupProfile(evt) {
  if (evt.target === popupProfile || evt.target === popupProfileClose || evt.target === popupProfileSubmit) {
    closeModalWindow(popupProfile);
  }
}

function openPopupCard() {
  popupCardName.value = '';
  popupCardLink.value = '';
  validCard.resetInputError();
  openModalWindow(popupCard);
}

function closePopupCard(evt) {
  if (evt.target === popupCard || evt.target === popupCardClose || evt.target === popupCardSubmit) {
    closeModalWindow(popupCard);
  }
}

function popupProfileSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
}

function popupCardSave(evt) {
  evt.preventDefault();
  renderCard({
    name: popupCardName.value,
    link: popupCardLink.value
  });
}

profileEdit.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('click', closePopupProfile);
cardAdd.addEventListener('click', openPopupCard);
popupCard.addEventListener('click', closePopupCard);

picView.addEventListener('click', function(evt){
  if (evt.target === picView || evt.target === picClose) {
    closeModalWindow(picView);
  }
});

popupProfile.addEventListener('keydown', function (evt) {
  if (evt.key === ' ') {
  evt.preventDefault();
  }
  
});

popupProfile.addEventListener('submit', popupProfileSave);
popupCard.addEventListener('submit', popupCardSave);




