export default class UserInfo {
  constructor({nameSelector, statusSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(statusSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return this.info = {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
    this._id = data._id;
  }
}