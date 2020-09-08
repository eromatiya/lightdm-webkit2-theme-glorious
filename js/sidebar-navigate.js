class SidebarNavigate {
	constructor() {
		this._sidebar = document.querySelector('#sidebar');
		this._sidebarNavigation = document.querySelector('#sidebar-navigation');
		this._buttonSettingsAccounts = document.querySelector('#button-settings-accounts');
		this._buttonSettingsSessions = document.querySelector('#button-settings-sessions');
		this._buttonSettingsBackgrounds = document.querySelector('#button-settings-backgrounds');
		this._buttonSettingsThemes = document.querySelector('#button-settings-themes');
		this._buttonSettingsKeybindings = document.querySelector('#button-settings-keybindings');
		this._buttonSettingsPowers = document.querySelector('#button-settings-powers');

		this._settingsSelection = document.querySelector('#sidebar-settings-selection');
		this._settingsAccounts = document.querySelector('#sidebar-settings-accounts');
		this._settingsSessions = document.querySelector('#sidebar-settings-sessions');
		this._settingsBackgrounds = document.querySelector('#sidebar-settings-backgrounds');
		this._settingsThemes = document.querySelector('#sidebar-settings-themes');
		this._settingsKeybinginds = document.querySelector('#sidebar-settings-keybindings');
		this._settingsPowers = document.querySelector('#sidebar-settings-powers');

		this._buttonNavigateAccounts = document.querySelector('#button-navigate-accounts');
		this._buttonNavigateSessions = document.querySelector('#button-navigate-sessions');
		this._buttonNavigateBackgrounds = document.querySelector('#button-navigate-backgrounds');
		this._buttonNavigateThemes = document.querySelector('#button-navigate-themes');
		this._buttonNavigateKeybindings = document.querySelector('#button-navigate-keybindings');
		this._buttonNavigatePowers = document.querySelector('#button-navigate-powers');
		
		this._buttonNavigationBack = document.querySelector('.button-navigation-back');
		this._activeSettings = null;
		this._activeNavigateButton = this._buttonNavigateAccounts;
		this._init();
	}

	_init() {
		this._selectionButtonsClickEvents();
		this._navigateBackOnClickEvents();
	}

	_hideSelectionSettings() {
		if (!this._settingsSelection.classList.contains('sidebar-selection-hide')) {
			this._settingsSelection.classList.add('sidebar-selection-hide');
		}
	}

	_showSelectionSettings() {
		this._settingsSelection.classList.remove('sidebar-selection-hide');
	}

	hideActiveSettings() {
		if (this._activeSettings) {
			this._activeSettings.classList.remove('sidebar-group-settings-show');
			return true;
		}
	}

	_showActiveSettings(el) {
		el.classList.add('sidebar-group-settings-show');
	}

	_settingsShow(settings, navigateButton) {
		this._activeNavigateButton.classList.remove('button-navigate-selected');
		this._hideSelectionSettings();
		this.hideActiveSettings();
		this._activeSettings = settings;
		this._activeNavigateButton = navigateButton;
		this._showActiveSettings(settings);
		this._sidebar.classList.add('sidebar-expand');
		this._sidebarNavigation.classList.remove('sidebar-navigation-hide');
		this._activeNavigateButton.classList.add('button-navigate-selected');
	}

	settingsSelectionShow() {
		this.hideActiveSettings();
		this._activeSettings = null;
		this._showSelectionSettings();
		this._sidebar.classList.remove('sidebar-expand');
		this._sidebarNavigation.classList.add('sidebar-navigation-hide');
		this._activeNavigateButton.classList.remove('button-navigate-selected');
	}

	settingsShowAccounts() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		this._settingsShow(this._settingsAccounts, this._buttonNavigateAccounts);
	}

	settingsShowSessions() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		this._settingsShow(this._settingsSessions, this._buttonNavigateSessions);
	}

	settingsShowBackgrounds() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		backgrounds.populateBackgroundsList();
		this._settingsShow(this._settingsBackgrounds, this._buttonNavigateBackgrounds);
	}

	settingsShowThemes() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		this._settingsShow(this._settingsThemes, this._buttonNavigateThemes);
	}

	settingsShowKeybindings() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		this._settingsShow(this._settingsKeybinginds, this._buttonNavigateKeybindings);
	}

	settingsShowPowers() {
		if (!sidebar.getSidebarVisibility()) sidebar.toggleSidebar();
		this._settingsShow(this._settingsPowers, this._buttonNavigatePowers);
	}

	_selectionButtonsClickEvents() {
		this._buttonSettingsAccounts.addEventListener(
			'click',
			() => {
				this.settingsShowAccounts();
			}
		);
		this._buttonNavigateAccounts.addEventListener(
			'click',
			() => {
				this.settingsShowAccounts();
			}
		);

		this._buttonSettingsSessions.addEventListener(
			'click',
			() => {
				this.settingsShowSessions();
			}
		);
		this._buttonNavigateSessions.addEventListener(
			'click',
			() => {
				this.settingsShowSessions();
			}
		);

		this._buttonSettingsBackgrounds.addEventListener(
			'click',
			() => {
				this.settingsShowBackgrounds();
			}
		);
		this._buttonNavigateBackgrounds.addEventListener(
			'click',
			() => {
				this.settingsShowBackgrounds();
			}
		);

		this._buttonSettingsThemes.addEventListener(
			'click',
			() => {
				this.settingsShowThemes();
			}
		);
		this._buttonNavigateThemes.addEventListener(
			'click',
			() => {
				this.settingsShowThemes();
			}
		);

		this._buttonSettingsKeybindings.addEventListener(
			'click',
			() => {
				this.settingsShowKeybindings();
			}
		);
		this._buttonNavigateKeybindings.addEventListener(
			'click',
			() => {
				this.settingsShowKeybindings();
			}
		);

		this._buttonSettingsPowers.addEventListener(
			'click',
			() => {
				this.settingsShowPowers();
			}
		);
		this._buttonNavigatePowers.addEventListener(
			'click',
			() => {
				this.settingsShowPowers();
			}
		);
	}

	_navigateBackOnClickEvents() {
		this._buttonNavigationBack.addEventListener(
			'click',
			() => {
				this.settingsSelectionShow();
			}
		);
	}
}
