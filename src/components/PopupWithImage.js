import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picImg = this._popup.querySelector('.popup-pic__img');
    this._picTitle = this._popup.querySelector('.popup-pic__title');
  }

  open(name, link) {
    this._picImg.src = link;
    this._picImg.alt = name;
    this._picTitle.textContent = name;

    super.open();
  }
}