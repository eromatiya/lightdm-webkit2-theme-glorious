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

			// Power Screen
			if (powerScreen.getPowerScreenVisibility()) {
				powerScreen.togglePowerScreen();
			}

			// Users Screen
			if (usersScreen.getUsersScreenVisibility()) {
				usersScreen.toggleUsersScreen();
			}

			// Settings Screen
			if (settingsScreen.getSettingsScreenVisibility()) {
				settingsScreen.toggleSettingsScreen();
			}

			// Goodbye Screen
			if (goodbyeScreen.getGoodbyeScreenVisibility()) {
				goodbyeScreen.hideGoodbyeScreen();
			}

			// Greeter Screen
			if (greeterScreen.getGreeterScreenVisibility()) {
				greeterScreen.toggleGreeterScreen();
			}

			sessionsScreen.toggleSessionsScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'e') {
			e.preventDefault();

			// Settings Screen
			if (settingsScreen.getSettingsScreenVisibility()) {
				settingsScreen.toggleSettingsScreen();
			}

			// Sessions Screen
			if (sessionsScreen.getSessionsScreenVisibility()) {
				sessionsScreen.toggleSessionsScreen();
			}

			// Users Screen
			if (usersScreen.getUsersScreenVisibility()) {
				usersScreen.toggleUsersScreen();
			}

			// Goodbye Screen
			if (goodbyeScreen.getGoodbyeScreenVisibility()) {
				goodbyeScreen.hideGoodbyeScreen();
			}

			// Greeter Screen
			if (greeterScreen.getGreeterScreenVisibility()) {
				greeterScreen.toggleGreeterScreen();
			}

			powerScreen.togglePowerScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'x') {
			e.preventDefault();

			// Power Screen
			if (powerScreen.getPowerScreenVisibility()) {
				powerScreen.togglePowerScreen();
			}

			// Sessions Screen
			if (sessionsScreen.getSessionsScreenVisibility()) {
				sessionsScreen.toggleSessionsScreen();
			}

			// Users Screen
			if (usersScreen.getUsersScreenVisibility()) {
				usersScreen.toggleUsersScreen();
			}

			// Goodbye Screen
			if (goodbyeScreen.getGoodbyeScreenVisibility()) {
				goodbyeScreen.hideGoodbyeScreen();
			}

			// Greeter Screen
			if (greeterScreen.getGreeterScreenVisibility()) {
				greeterScreen.toggleGreeterScreen();
			}

			settingsScreen.toggleSettingsScreen();
			return;
		}

		if (this._keysLog['Alt'] && e.key === 'y') {
			e.preventDefault();

			// Power Screen
			if (powerScreen.getPowerScreenVisibility()) {
				powerScreen.togglePowerScreen();
			}

			// Sessions Screen
			if (sessionsScreen.getSessionsScreenVisibility()) {
				sessionsScreen.toggleSessionsScreen();
			}

			// Settings Screen
			if (settingsScreen.getSettingsScreenVisibility()) {
				settingsScreen.toggleSettingsScreen();
			}

			// Goodbye Screen
			if (goodbyeScreen.getGoodbyeScreenVisibility()) {
				goodbyeScreen.hideGoodbyeScreen();
			}

			// Greeter Screen
			if (greeterScreen.getGreeterScreenVisibility()) {
				greeterScreen.toggleGreeterScreen();
			}

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


