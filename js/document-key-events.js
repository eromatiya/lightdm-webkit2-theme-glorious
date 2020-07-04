class KeyEvents {
	constructor() {
		this._keysLog = {};

		this._onKeyDownEvent = this._onKeyDownEvent.bind(this);
		this._onKeyUpEvent = this._onKeyUpEvent.bind(this);
		
		this._modifierKey = null;
		this._sessionsKey = null;
		this._powerKey = null;
		this._settingsKey = null;
		this._usersKey = null;
		this._closeKey = null;

		this._init();
	}

	_init() {
		// Update keybinds obj
		this.updateKeyBindsObj();

		// Events
		this._registerOnKeyDown();
		this._registerOnKeyUp();
	}

	updateKeyBindsObj() {
		const keyBindsObj = settingsKeybinds.getKeyBindingsObj();
		this._modifierKey = keyBindsObj.defaultModifierKey;
		this._sessionsKey = keyBindsObj.defaultSessionKey;
		this._powerKey = keyBindsObj.defaultPowerKey;
		this._settingsKey = keyBindsObj.defaultSettingsKey;
		this._usersKey = keyBindsObj.defaultUsersKey;
		this._closeKey = keyBindsObj.defaultCloseKey;
	}

	// Document on key ip events
	_onKeyUpEvent(e) {

		if (this._keysLog[this._modifierKey] && e.key === this._sessionsKey) {
			e.preventDefault();
			sessionsScreen.toggleSessionsScreen();
			return;
		}

		if (this._keysLog[this._modifierKey] && e.key === this._powerKey) {
			e.preventDefault();
			powerScreen.togglePowerScreen();
			return;
		}

		if (this._keysLog[this._modifierKey] && e.key === this._settingsKey) {
			e.preventDefault();
			settingsScreen.toggleSettingsScreen();
			return;
		}

		if (this._keysLog[this._modifierKey] && e.key === this._usersKey) {
			e.preventDefault();
			usersScreen.toggleUsersScreen();
			return;
		}

		if (e.key === this._closeKey) {

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


