class Goodbye {
	constructor() {
		this._goodbyeScreen = document.querySelector('#screen-goodbye.screen');
		this._goodbyePowerIcon = document.querySelector('#goodbye-power-icon');
		this._goodbyeMessage = document.querySelector('#goodbye-message');
		this._goodbyeScreenVisible = false;
	}

	getGoodbyeVisibility() {
		return this._goodbyeScreenVisible;
	}

	showGoodbye(icon, message) {
		this._goodbyePowerIcon.src = `assets/power/${icon}.svg`;
		this._goodbyePowerIcon.onerror = function() {
			this.src = 'assets/power/shutdown.svg';
		};
		this._goodbyeMessage.textContent = message;
		this._goodbyeScreen.classList.add('screen-goodbye-show');
		this._goodbyeScreenVisible = true;
	}

	hideGoodbye() {
		this._goodbyeScreen.classList.remove('screen-goodbye-show');
		this._goodbyeScreenVisible = false;
	}
}
