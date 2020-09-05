import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submit){
    super(popupSelector);
    this._submit = submit;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      this._popup.querySelector('.popup__submit').textContent = "Удаление...";
      this._submit(evt, this._cardId, this._cardRemove);      
      this.close();
    });

    super.setEventListeners();
  }

  open(id, remove) {
    super.open();
    this._cardId = id;
    this._cardRemove = remove;
  }
}