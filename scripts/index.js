const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.profile-info__change');
const picView = document.querySelector('.pic-view');
const cardAdd = document.querySelector('.profile__add');
const popupClose = document.querySelector('.popup__close');
const picClose = document.querySelector('.pic-view__close');
const profileName = document.querySelector('.profile-info__name');
const profileStatus = document.querySelector('.profile-info__status');
const popupName = document.querySelector('input[name="name"]');
const popupStatus = document.querySelector('input[name="status"]');
const popupTitle = document.querySelector('.popup__title');
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
  const placeTemplate = document.querySelector('#place-template').content
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

function popupType(evt) {
  const popupSubmitButton = document.querySelector('.popup__submit');

  if (evt.target === popupEdit) {   
    popupSubmitButton.textContent = 'Сохранить';
    popupTitle.textContent = 'Редактировать профиль';
    popupName.placeholder = '';
    popupStatus.placeholder = '';
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
  }

  else {
    popupSubmitButton.textContent = 'Создать';
    popupTitle.textContent = 'Новое место';
    popupName.placeholder = 'Название';
    popupStatus.placeholder = 'Ссылка на картинку';
    popupName.value = '';
    popupStatus.value = '';
  }
}

function popupVision(evt) {
  if (!popup.classList.contains('popup_opened')) {
    popupType(evt);
    popup.classList.add('popup_opened');
  }
  else {
    popup.classList.remove('popup_opened');
  }
}

function popupSave(evt) {
  evt.preventDefault();

  if (popupTitle.textContent === 'Редактировать профиль') {
    profileName.textContent = popupName.value;
    profileStatus.textContent = popupStatus.value;
  }

  else {
    addCard(popupName.value, popupStatus.value);
  }

  popupVision();
}

cardAdd.addEventListener('click', popupVision);
popupEdit.addEventListener('click', popupVision);
popupClose.addEventListener('click', popupVision);
picClose.addEventListener('click', function () {
  picView.classList.remove('pic-view_opened');
});
popup.addEventListener('submit', popupSave);