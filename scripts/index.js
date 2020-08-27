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
const picView = document.querySelector('.pic-view');
const cardAdd = document.querySelector('.profile__add');
const picClose = document.querySelector('.pic-view__close');
const profileName = document.querySelector('.profile-info__name');
const profileStatus = document.querySelector('.profile-info__status');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupAttribute = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__error_visible'
};

const popupTypes = ['.popup-profile', '.popup-card'];

popupTypes.forEach(function (item) {
  const valid = new FormValidator(popupAttribute, item);
  valid.enableValidation();
});

initialCards.forEach(function (item){
  const card = new Card(item, '#place-template');
  document.querySelector('.places').prepend(card.generateCard());
});

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    popupProfile.classList.remove('popup_opened');
    popupCard.classList.remove('popup_opened');
    picView.classList.remove('pic-view_opened');
    document.removeEventListener('keydown', closeByEsc);
  }
}

function openPopupProfile() {
  popupProfileSubmit.classList.remove('popup__submit_inactive');
  const errorMessage = popupProfile.querySelectorAll('.popup__error');
  errorMessage.forEach(function(item){
    item.textContent = '';
  });
  popupProfileName.classList.remove('popup__text_type_error');
  popupProfileStatus.classList.remove('popup__text_type_error');
  popupProfileName.value = profileName.textContent;
  popupProfileStatus.value = profileStatus.textContent;
  popupProfile.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopupProfile(evt) {
  if (evt.target === popupProfile || evt.target === popupProfileClose || evt.target === popupProfileSubmit) {
    document.removeEventListener('keydown', closeByEsc);
    popupProfile.classList.remove('popup_opened');
  }
}

function openPopupCard() {
  popupCardSubmit.classList.add('popup__submit_inactive');
  const errorMessage = popupCard.querySelectorAll('.popup__error');
  errorMessage.forEach(function(item){
    item.textContent = '';
  });
  popupCardName.classList.remove('popup__text_type_error');
  popupCardLink.classList.remove('popup__text_type_error');
  popupCardName.value = '';
  popupCardLink.value = '';
  popupCard.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopupCard(evt) {
  if (evt.target === popupCard || evt.target === popupCardClose || evt.target === popupCardSubmit) {
    document.removeEventListener('keydown', closeByEsc);
    popupCard.classList.remove('popup_opened');
  }
}

function popupProfileSave(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
}

function popupCardSave(evt) {
  evt.preventDefault();
  const card = new Card({
    name: popupCardName.value,
    link: popupCardLink.value
  }, '#place-template');
  document.querySelector('.places').prepend(card.generateCard());
}

profileEdit.addEventListener('click', openPopupProfile);
popupProfile.addEventListener('click', closePopupProfile);
cardAdd.addEventListener('click', openPopupCard);
popupCard.addEventListener('click', closePopupCard);

picView.addEventListener('click', function(evt){
  if (evt.target === picView || evt.target === picClose) {
    picView.classList.remove('pic-view_opened');
  }
});

popupProfile.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && popupProfileSubmit.classList.contains('popup__submit_inactive')) {
  evt.preventDefault();
  }
  
});

popupProfile.addEventListener('keydown', function (evt) {
  if (evt.key === ' ') {
  evt.preventDefault();
  }
  
});

popupCard.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter' && popupCardSubmit.classList.contains('popup__submit_inactive')) {
  evt.preventDefault();
  }
  
});

popupProfile.addEventListener('submit', popupProfileSave);
popupCard.addEventListener('submit', popupCardSave);




