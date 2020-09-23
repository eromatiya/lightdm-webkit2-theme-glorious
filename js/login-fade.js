class LoginFade {
	constructor() {
		this._goodbyeScreen = document.querySelector('#screen-dark.screen');
	}

	showLoginFade(icon, message) {
		this._goodbyeScreen.classList.add('screen-dark-show');
		this._goodbyeScreenVisible = true;
	}
}
