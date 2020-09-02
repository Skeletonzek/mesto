import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__text'));
    this._inputList.forEach((inputElement, index) => {
      
      this[`${index}`] = inputElement.value;
    });
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._submit(evt);      
      this.close();      
    });

    super.setEventListeners();
  }

  close() {    
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}