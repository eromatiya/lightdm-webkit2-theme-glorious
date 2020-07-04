class SettingsScreen {
	constructor() {
		this._settingsScreen = document.querySelector('#settingsScreen');
		this._settingsScreenButton = document.querySelector('#settingsScreenButton');
		this._settingsScreenVisible = false;

		this._settingsItemBackground = document.querySelector('#settingsItemBackground');
		this._settingsItemThemes = document.querySelector('#settingsItemThemes');
		this._settingsItemKeyBinds = document.querySelector('#settingsItemKeyBinds');

		this._settingsScreenContent = document.querySelector('#settingsScreenContent');

		this._settingsList = document.querySelector('#settingsList');
		this._settingsBackgroundImage = document.querySelector('#settingsBackgroundContainer');
		this._settingsThemeContainer = document.querySelector('#settingsThemeContainer');
		this._settingsKeyBindContainer = document.querySelector('#settingsKeyBindContainer');

		this._init();
	}

	_init() {
		// Events
		this._settingsScreenButtonOnClickEvent();
		this._settingsItemClickEvents();
	}

	_settingsGroupHide() {

		if (!this._settingsBackgroundImage.classList.contains('settingsGroupHide')) {
			this._settingsBackgroundImage.classList.add('settingsGroupHide');
			this._settingsList.classList.remove('settingsListHide');
			this._settingsScreenContent.classList.add('settingsScreenContentHide');
			return true;

		} else if (!this._settingsThemeContainer.classList.contains('settingsGroupHide')) {
			this._settingsThemeContainer.classList.add('settingsGroupHide');
			this._settingsList.classList.remove('settingsListHide');
			this._settingsScreenContent.classList.add('settingsScreenContentHide');
			return true;

		} else if (!this._settingsKeyBindContainer.classList.contains('settingsGroupHide')) {
			this._settingsKeyBindContainer.classList.add('settingsGroupHide');
			this._settingsList.classList.remove('settingsListHide');
			this._settingsScreenContent.classList.add('settingsScreenContentHide');
			return true;
		}
		return false;
	}

	_settingsItemClickEvents() {
		
		this._settingsItemBackground.addEventListener(
			'click',
			() => {
				this._settingsList.classList.add('settingsListHide');
				this._settingsScreenContent.classList.remove('settingsScreenContentHide');
				this._settingsBackgroundImage.classList.remove('settingsGroupHide');
			}
		);

		this._settingsItemThemes.addEventListener(
			'click',
			() => {
				this._settingsList.classList.add('settingsListHide');
				this._settingsScreenContent.classList.remove('settingsScreenContentHide');
				this._settingsThemeContainer.classList.remove('settingsGroupHide');
			}
		);

		this._settingsItemKeyBinds.addEventListener(
			'click',
			() => {
				this._settingsList.classList.add('settingsListHide');
				this._settingsScreenContent.classList.remove('settingsScreenContentHide');
				this._settingsKeyBindContainer.classList.remove('settingsGroupHide');
			}
		);
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
			if (this._settingsGroupHide()) {
				return;
			}
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
}
