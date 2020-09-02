export default class Card {
  constructor (data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._cardClick = handleCardClick;
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
      this._cardClick(this._name, this._link);
    });
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  }

  _likeCard() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }
}