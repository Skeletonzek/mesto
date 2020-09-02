import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
  }

  _getInputValues() {
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__text'));
    this._formValues = {};

    this._inputList.forEach((inputElement) => {      
      this._formValues[inputElement.name] = inputElement.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popup.addEventListener('submit', (evt) => {
      this._submit(evt, this._getInputValues());      
      this.close();
    });

    super.setEventListeners();
  }

  close() {    
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}