const popupProfile = document.querySelector('.popup-profile');
const popupCard = document.querySelector('.popup-card');
const popupProfileName = popupProfile.querySelector('input[name="name"]');
const popupProfileStatus = popupProfile.querySelector('input[name="status"]');
const popupCardName = popupCard.querySelector('input[name="name"]');
const popupCardLink = popupCard.querySelector('input[name="link"]');
const popupProfileClose = popupProfile.querySelector('.popup-profile__close');
const popupCardClose = popupCard.querySelector('.popup-card__close');
const profileEdit = document.querySelector('.profile-info__change');
const picView = document.querySelector('.pic-view');
const cardAdd = document.querySelector('.profile__add');
const picClose = document.querySelector('.pic-view__close');
const profileName = document.querySelector('.profile-info__name');
const profileStatus = document.querySelector('.profile-info__status');
const placeTemplate = document.querySelector('#place-template').content
const places = document.querySelector('.places');


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

initialCards.forEach(function (item){
  addCard(item.name, item.link);
});

function addCard (cardTitle, cardSrc) {
  const placeElement = placeTemplate.cloneNode(true);

  placeElement.querySelector('.place__title').textContent = cardTitle;
  placeElement.querySelector('.place__photo').alt = cardTitle;
  placeElement.querySelector('.place__photo').src = cardSrc;

  placeElement.querySelector('.place__bin').addEventListener('click', function (evt) {
    evt.target.closest('.place').remove();
  });

  placeElement.querySelector('.place__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('place__like_active');
  });

  placeElement.querySelector('.place__photo').addEventListener('click', function () {
    picView.querySelector('.pic-view__img').src = cardSrc;
    picView.querySelector('.pic-view__img').alt = cardTitle;
    picView.querySelector('.pic-view__title').textContent = cardTitle;
    picView.classList.add('pic-view_opened');
  });

  places.prepend(placeElement);
}

function popupProfileVision() {
  if (!popupProfile.classList.contains('popup_opened')) {
    popupProfileName.value = profileName.textContent;
    popupProfileStatus.value = profileStatus.textContent;
    popupProfile.classList.add('popup_opened');
  }
  else {
    popupProfile.classList.remove('popup_opened');
  }
}

function popupCardVision() {
  if (!popupCard.classList.contains('popup_opened')) {
    popupCardName.value = '';
    popupCardLink.value = '';
    popupCard.classList.add('popup_opened');
  }
  else {
    popupCard.classList.remove('popup_opened');
  }
}

function popupProfileSave(evt) {
  evt.preventDefault();
  
  profileName.textContent = popupProfileName.value;
  profileStatus.textContent = popupProfileStatus.value;
  
  popupProfileVision();
}

function popupCardSave(evt) {
  evt.preventDefault();
  addCard(popupCardName.value, popupCardLink.value); 
  popupCardVision();
}

profileEdit.addEventListener('click', popupProfileVision);
popupProfileClose.addEventListener('click', popupProfileVision);
cardAdd.addEventListener('click', popupCardVision);
popupCardClose.addEventListener('click', popupCardVision);
picClose.addEventListener('click', function () {
  picView.classList.remove('pic-view_opened');
});
popupProfile.addEventListener('submit', popupProfileSave);
popupCard.addEventListener('submit', popupCardSave);