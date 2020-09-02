import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, popupAttribute} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';

const popupProfile = document.querySelector('.popup-profile');
const popupProfileName = popupProfile.querySelector('input[name="name"]');
const popupProfileStatus = popupProfile.querySelector('input[name="status"]');
const profileEdit = document.querySelector('.profile-info__change');
const cardAdd = document.querySelector('.profile__add');

function cardCreate(data) {
  const cardElement = new Card(data, '#place-template', (name, link) => {
    picture.open(name, link);
  });
  card.addItem(cardElement.generateCard());
}

const card = new Section({
  items: initialCards, 
  renderer: (item) => {
    cardCreate(item);
  }
}, '.places');

card.renderItems();

const validCard = new FormValidator(popupAttribute, '.popup-card');
const validProfile = new FormValidator(popupAttribute, '.popup-profile');
validCard.enableValidation();
validProfile.enableValidation();

const info = new UserInfo({nameSelector: '.profile-info__name', statusSelector: '.profile-info__status'});
const picture = new PopupWithImage('.popup-pic');
const profile = new PopupWithForm('.popup-profile', (evt, data) => {
  evt.preventDefault();
  info.setUserInfo(data);
});
const places = new PopupWithForm('.popup-card', (evt, data) => {
  evt.preventDefault();
  cardCreate(data);
});

picture.setEventListeners();
places.setEventListeners();
profile.setEventListeners();


function openPopupProfile() {
  const params = info.getUserInfo();
  popupProfileName.value = params.name;
  popupProfileStatus.value = params.status;
  validProfile.resetInputError();
  profile.open();
}

function openPopupCard() {
  validCard.resetInputError();
  places.open();
}

profileEdit.addEventListener('click', openPopupProfile);
cardAdd.addEventListener('click', openPopupCard);