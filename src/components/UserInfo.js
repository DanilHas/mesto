export default class UserInfo {
  constructor({ nameElementSelector, jobElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
  }

  getUserInfo() {
    this._userInfo = {
      username: this._nameElement.textContent,
      'user-info': this._jobElement.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.name;
    this._jobElement.textContent = data.about;
  }
}
