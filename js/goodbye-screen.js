class GoodbyeScreen {
	constructor() {
		this._goodbyeScreen = document.querySelector('#goodbyeScreen');
		this._goodbyeImage = document.querySelector('#goodbyeImage');
		this._goodbyeMessage = document.querySelector('#goodbyeMessage');
	}

	// Show goodbye screen
	showGoodbyeScreen(icon, message) {
		this._goodbyeImage.style.backgroundImage = `url('assets/${icon}.svg')`;
		this._goodbyeMessage.textContent = message;
		this._goodbyeScreen.classList.add('showGoodbyeScreen');
	}

	// Hide goodbye screen
	hideGoodbyeScreen() {
		this._goodbyeScreen.classList.remove('showGoodbyeScreen');
	}
}
