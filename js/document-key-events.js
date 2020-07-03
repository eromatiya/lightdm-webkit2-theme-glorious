class KeyEvents {
	constructor() {
		this._keysLog = {};

		this._onKeyDownEvent = this._onKeyDownEvent.bind(this);
		this._onKeyUpEvent = this._onKeyUpEvent.bind(this);

		this._registerOnKeyDown();
		this._registerOnKeyUp();
	}

	// Document on key ip events
	_onKeyUpEvent(e) {

		if (this._keysLog['Alt'] && e.key === 's') {
			e.preventDefault();
			sessionsScreen.toggleSessionsScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'e') {
			e.preventDefault();
			powerScreen.togglePowerScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'x') {
			e.preventDefault();
			settingsScreen.toggleSettingsScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'y') {
			e.preventDefault();
			usersScreen.toggleUsersScreen();
			return;
		}

		if (e.key === 'Escape') {

			// Prevent default escape key function
			e.preventDefault();

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
				sessionsScreen.toggleSessionsScreen();
				return;
			}

			// Settings Screen
			if (settingsScreen.getSettingsScreenVisibility()) {
				settingsScreen.toggleSettingsScreen();
				return;
			}

			// Goodbye Screen
			if (goodbyeScreen.getGoodbyeScreenVisibility()) {
				goodbyeScreen.hideGoodbyeScreen();
				return;
			}

			greeterScreen.toggleGreeterScreen();
			document.querySelector('#passwordInput').value = '';

			return;
		}

		delete this._keysLog[e.key];
	}

	// Document on key down events
	_onKeyDownEvent(e) {
		this._keysLog[e.key] = true;
	}

	_registerOnKeyDown() {
		document.addEventListener('keydown', this._onKeyDownEvent);
	}

	_registerOnKeyUp() {
		document.addEventListener('keyup', this._onKeyUpEvent);
	}
}


