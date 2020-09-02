import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(item) {
    const popupPicImg = this._popup.querySelector('.popup-pic__img');
    popupPicImg.src = item._link;
    popupPicImg.alt = item._name;
    this._popup.querySelector('.popup-pic__title').textContent = item._name;

    super.open();
  }
}