import './index.css';
import Api from '../components/Api.js'
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {popupAttribute} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/popupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';


const popupProfile = document.querySelector('.popup-profile');
console.log(popupProfile);
const popupProfileName = popupProfile.querySelector('input[name="name"]');
const popupProfileStatus = popupProfile.querySelector('input[name="about"]');
const profileEdit = document.querySelector('.profile-info__change');
const cardAdd = document.querySelector('.profile__add');
const avatarChange = document.querySelector('.profile__img-hover');

function cardCreate(data) {
  const cardElement = new Card(data, '#place-template', {
    handleCardClick: (name, link) => {
      picture.open(name, link);
    }, 
    handleBinClick: (id, removeCard) => {    
      confirm.open(id, removeCard);
    }, 
    handleLikeClick: (id) => {
    if (!cardElement.isLiked) {
      api.likeCard(id)
        .then((res) => {
          cardElement.isLiked = !cardElement.isLiked;
          cardElement.likeCount(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    else {
      api.dislikeCard(id)
        .then((res) => {
          cardElement.isLiked = !cardElement.isLiked;
          cardElement.likeCount(res.likes);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }
  }); 

  const isLiked = data.likes.some((item) => {
    return item._id === info._id;
  })

  if (isLiked) {
    cardElement.isLiked = true;  
  }

  if (data.owner._id === info._id) {
    cardElement.mine = true;
  }  
 
  card.addItem(cardElement.generateCard());
}

const card = new Section({ 
  renderer: (item) => {
    cardCreate(item);
  }
}, '.places');

const validCard = new FormValidator(popupAttribute, '.popup-card');
const validProfile = new FormValidator(popupAttribute, '.popup-profile');
const validAvatar = new FormValidator(popupAttribute, '.popup-avatar');

validAvatar.enableValidation();
validCard.enableValidation();
validProfile.enableValidation();

const info = new UserInfo({nameSelector: '.profile-info__name', statusSelector: '.profile-info__status', avatarSelector: '.profile__img'});
const picture = new PopupWithImage('.popup-pic');
const profile = new PopupWithForm('.popup-profile', {
  submit: (evt, data) => {
    evt.preventDefault();
    api.sendUserInfo(data)
      .then((res) => {
        profile.close();
        info.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        document.querySelector('.popup-profile__submit').textContent = "Сохранить";  
      });
  }
});

const avatar = new PopupWithForm('.popup-avatar', {
  submit: (evt, data) => {
    evt.preventDefault();
    api.changeAvatar(data)
      .then((res) => {
        avatar.close();
        info.setUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        document.querySelector('.popup-avatar__submit').textContent = "Сохранить";  
      });
  }
});

const places = new PopupWithForm('.popup-card', {
  submit: (evt, data) => {
    evt.preventDefault();
    api.postNewCard(data)
      .then((res) => {
        places.close();
        cardCreate(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      document.querySelector('.popup-card__submit').textContent = "Создать";  
    });
  }
});

const confirm = new PopupConfirm('.popup-confirm', {
  submit: (evt, id, removeCard) => {
    evt.preventDefault();
    api.deleteCard(id)
      .then(() => {
        confirm.close();
        removeCard.remove();
        removeCard = null;
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        document.querySelector('.popup-confirm__submit').textContent = "Да";  
      });    
  }
});

avatar.setEventListeners();
confirm.setEventListeners();
picture.setEventListeners();
places.setEventListeners();
profile.setEventListeners();


function openPopupProfile() {
  const params = info.getUserInfo();
  popupProfileName.value = params.name;
  popupProfileStatus.value = params.about;
  validProfile.resetInputError();
  profile.open();
}

function openPopupCard() {
  validCard.resetInputError();
  places.open();
}


avatarChange.addEventListener('click', () => {
  validAvatar.resetInputError();
  avatar.open();
})
profileEdit.addEventListener('click', openPopupProfile);
cardAdd.addEventListener('click', openPopupCard);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'c6fbdf87-9fb5-4058-8a57-a3f72470dc3f',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((res) => {
    info.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err);
  });

  api.getInitialCards()
  .then((res) => {
    card.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  });
