class KeyEvents {
	constructor() {
		this._passwordInputEl = document.querySelector('#passwordInput');
		this._goodbyeScreen = document.querySelector('#goodbyeScreen');
		this._registerOnKeyDown();
	}

	// Document on key down events
	_registerOnKeyDown() {
		document.onkeyup = (e) => {
			if (e.key === 'Escape') {

				if (powerButtons.getPowerButtonsVisiblity()) {
					powerButtons.togglepowerButtons();
					return;
				}

				if (usersScreen.getUsersScreenVisibility()) {
					usersScreen.toggleUsersScreen();
					return;
				}

				if (sessionsScreen.getSessionsScreenVisibility()) {
					sessionsScreen.hideSessionsScreen();
					return;
				}

				if (this._goodbyeScreen.classList.contains('showGoodbyeScreen')) {
					goodbyeScreen.hideGoodbyeScreen();
					return;
				}
				greeterScreen.toggleGreeterScreen();
				this._passwordInputEl.value = '';
			}
		};
	}
}
