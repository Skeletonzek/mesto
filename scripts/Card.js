import { openModalWindow } from './utils.js';

export default class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardPhoto = this._element.querySelector('.place__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._element.querySelector('.place__title').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.place__bin').addEventListener('click', () => {
      this._removeCard();
    });
  
    this._element.querySelector('.place__like').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._overviewCard();
    });
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _overviewCard() {
    const popupPic = document.querySelector('.popup-pic');
    const popupPicImg = popupPic.querySelector('.popup-pic__img');
    popupPicImg.src = this._link;
    popupPicImg.alt = this._name;
    popupPic.querySelector('.popup-pic__title').textContent = this._name;
    openModalWindow(popupPic);
  }
}