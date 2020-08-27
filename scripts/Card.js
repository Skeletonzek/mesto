export default class Card {
  constructor (data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.place__photo').src = this._link;
    this._element.querySelector('.place__photo').alt = this._name;
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
  }

  _likeCard() {
    this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _overviewCard() {
    const picView = document.querySelector('.pic-view');
    picView.querySelector('.pic-view__img').src = this._link;
    picView.querySelector('.pic-view__img').alt = this._name;
    picView.querySelector('.pic-view__title').textContent = this._name;
    picView.classList.add('pic-view_opened');
    document.addEventListener('keydown', closeByEsc);
  }
}