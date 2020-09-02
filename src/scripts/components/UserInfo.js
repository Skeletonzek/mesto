export default class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._nameSelector = nameSelector;
    this._statusSelector = statusSelector;
  }

  getUserInfo() {
    return this.info = {
      name: document.querySelector(this._nameSelector).textContent,
      status: document.querySelector(this._statusSelector).textContent
    };
  }

  setUserInfo(data) {
    document.querySelector(this._nameSelector).textContent = data["0"];
    document.querySelector(this._statusSelector).textContent = data["1"];
  }
}