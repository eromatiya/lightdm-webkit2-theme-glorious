class SettingsScreen {
	constructor() {
		this._settingsScreen = document.querySelector('#settingsScreen');
		this._settingsScreenButton = document.querySelector('#settingsScreenButton');
		this._settingsScreenVisible = false;

		this._settingsApplyButton = document.querySelector('#settingsApplyButton');
		this._settingsResetButton = document.querySelector('#settingsResetButton');

		this._init();
	}

	_init() {
		// Events
		this._settingsScreenButtonOnClickEvent();
		this._settingsApplyButtonOnClickEvent();
		this._settingsResetButtonOnClickEvent();
	}

	_showSettingsScreen() {
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

		this._settingsScreen.classList.add('settingsScreenShow');
		this._settingsScreenVisible = true;
	}

	_hideSettingsScreen() {
		this._settingsScreen.classList.remove('settingsScreenShow');
		this._settingsScreenVisible = false;
	}

	toggleSettingsScreen() {
		if (this._settingsScreenVisible) {
			this._hideSettingsScreen();
		} else {
			this._showSettingsScreen();
		}
	}

	getSettingsScreenVisibility() {
		return this._settingsScreenVisible;
	}

	_settingsScreenButtonOnClickEvent() {
		this._settingsScreenButton.addEventListener(
			'click',
			() => {
				this.toggleSettingsScreen();
			}
		);
	}

	_settingsApplyButtonOnClickEvent() {
		this._settingsApplyButton.addEventListener(
			'click',
			() => {
				settingsBackground.settingsBackgroundApply();
				settingsTheme.settingsThemeApply();
			}
		);
	}

	_settingsResetButtonOnClickEvent() {
		this._settingsResetButton.addEventListener(
			'click',
			() => {
				settingsBackground.settingsBackgroundReset();
				settingsTheme.settingsThemeReset();
			}
		);
	}
}
