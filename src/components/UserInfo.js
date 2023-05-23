export default class UserInfo {
  constructor({
    nameElementSelector,
    jobElementSelector,
    avatarElementSelector,
  }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
    this._avatarElement = document.querySelector(avatarElementSelector);
  }

  getUserInfo() {
    this._userInfo = {
      username: this._nameElement.textContent,
      'user-info': this._jobElement.textContent,
    };

    return this._userInfo;
  }

  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;
    this.setUserAvatar(data);
  }
}
