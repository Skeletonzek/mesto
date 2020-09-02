export default class UserInfo {
  constructor({nameSelector, statusSelector}) {
    this._name = document.querySelector(nameSelector);
    this._status = document.querySelector(statusSelector)
  }

  getUserInfo() {
    return this.info = {
      name: this._name.textContent,
      status: this._status.textContent
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._status.textContent = data.status;
  }
}