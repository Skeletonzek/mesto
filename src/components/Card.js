export default class Card {
  constructor (data, selector, handleCardClick, handleBinClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._cardClick = handleCardClick;
    this._binClick = handleBinClick;
    this._likeClick = handleLikeClick;
    this._id = data._id;
    this._likes = data.likes;
    this._owner = data.owner._id;
    
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._deleteCard();
    
   
    

    const cardPhoto = this._element.querySelector('.place__photo');
    cardPhoto.src = this._link;
    cardPhoto.alt = this._name;
    this._likeButton = this._element.querySelector('.place__like-button');
    this._element.querySelector('.place__title').textContent = this._name;
    this._likeContainer = this._element.querySelector('.place__like-count');
    this.likeCount(this._likes);

    this._likeStatus();

    return this._element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selector).content.querySelector('.place').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {    
    this._element.querySelector('.place__like-button').addEventListener('click', () => {
      
      this._likeClick(this._id);
      this._likeCard();
    });

    this._element.querySelector('.place__photo').addEventListener('click', () => {
      this._cardClick(this._name, this._link);
    });
  }

  likeCount(arr) {
    this._likes = arr;
    this._likeContainer.textContent = this._likes.length;
  }

  _likeStatus() {
    if (this.isLiked) {
      this._likeButton.classList.add('place__like-button_active');
    }
  }

  _likeCard() {
    if (this._likeButton.classList.contains('place__like-button_active')) {
      this._likeButton.classList.remove('place__like-button_active');
    }
    else {
      this._likeButton.classList.add('place__like-button_active');
    }
  }

  _deleteCard() {
    if (this.mine === true) {
      this._bin = this._element.querySelector('.place__bin');
      this._bin.classList.remove('place__bin_hidden');
      this._bin.addEventListener('click', () => {        
        this._binClick(this._id, this._element);
      });
    
    }
  }
}