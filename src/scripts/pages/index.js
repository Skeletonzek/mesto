import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, popupProfile, popupProfileName, popupProfileStatus, profileEdit, cardAdd, popupAttribute} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';

const card = new Section({
  items: initialCards, 
  renderer: (item) => {
    const cardElement = new Card(item, '#place-template', () => {
      picture.open(cardElement);
    });
    card.addItem(cardElement.generateCard());
  }
}, '.places');

card.renderItems();

const validCard = new FormValidator(popupAttribute, '.popup-card');
const validProfile = new FormValidator(popupAttribute, '.popup-profile');
validCard.enableValidation();
validProfile.enableValidation();

const info = new UserInfo({nameSelector: '.profile-info__name', statusSelector: '.profile-info__status'});
const picture = new PopupWithImage('.popup-pic');
const profile = new PopupWithForm('.popup-profile', (evt) => {
  evt.preventDefault();
  info.setUserInfo(profile);  
});
const places = new PopupWithForm('.popup-card', (evt) => {
  evt.preventDefault();
  const cardElement = new Card({name: places["0"], link: places["1"]}, '#place-template', () => {
    picture.open(cardElement);
  });
  card.addItem(cardElement.generateCard());
});

picture.setEventListeners();
places.setEventListeners();
profile.setEventListeners();


function openPopupProfile() {
  popupProfileName.value = info.getUserInfo().name;
  popupProfileStatus.value = info.getUserInfo().status;
  validProfile.resetInputError();
  profile.open();
}

function openPopupCard() {
  validCard.resetInputError();
  places.open();
}

profileEdit.addEventListener('click', openPopupProfile);
cardAdd.addEventListener('click', openPopupCard);

popupProfile.addEventListener('keydown', function (evt) {
  if (evt.key === ' ') {
  evt.preventDefault();
  }  
});

import '../../pages/index.css';