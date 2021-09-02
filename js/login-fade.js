class LoginFade {
  constructor() {
    this._goodbyeScreen = document.getElementById("screen-dark");
  }

  showLoginFade(icon, message) {
    this._goodbyeScreen.classList.add("screen-dark-show");
    this._goodbyeScreenVisible = true;
  }
}
