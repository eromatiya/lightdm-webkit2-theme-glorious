class GoodbyeScreen {
	constructor() {
		this._goodbyeScreen = document.querySelector('#goodbyeScreen');
		this._goodbyeImage = document.querySelector('#goodbyeImage');
		this._goodbyeMessage = document.querySelector('#goodbyeMessage');
		this._goodbyeScreenVisible = false;
	}

	getGoodbyeScreenVisibility() {
		return this._goodbyeScreenVisible;
	}

	// Show goodbye screen
	showGoodbyeScreen(icon, message) {
		this._goodbyeImage.style.backgroundImage = `url('assets/power/${icon}.svg')`;
		this._goodbyeMessage.textContent = message;
		this._goodbyeScreen.classList.add('showGoodbyeScreen');
		this._goodbyeScreenVisible = true;
	}

	// Hide goodbye screen
	hideGoodbyeScreen() {
		this._goodbyeScreen.classList.remove('showGoodbyeScreen');
		this._goodbyeScreenVisible = false;
	}
}
