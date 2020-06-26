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

				// Power Screen
				if (powerScreen.getPowerScreenVisibility()) {
					powerScreen.togglePowerScreen();
					return;
				}

				// Users Screen
				if (usersScreen.getUsersScreenVisibility()) {
					usersScreen.toggleUsersScreen();
					return;
				}

				// Sessions Screen
				if (sessionsScreen.getSessionsScreenVisibility()) {
					sessionsScreen.hideSessionsScreen();
					return;
				}	

				// Goodbye Screen
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
