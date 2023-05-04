export default class UserInfo {
  constructor({ nameElementSelector, jobElementSelector }) {
    this._nameElement = document.querySelector(nameElementSelector);
    this._jobElement = document.querySelector(jobElementSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };

    return this._userInfo;
  }

  setUserInfo(data) {
    this._nameElement.textContent = data.username;
    this._jobElement.textContent = data['user-info'];
  }
}
