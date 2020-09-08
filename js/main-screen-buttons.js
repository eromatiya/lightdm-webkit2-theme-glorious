class MainScreenButtons {
	constructor() {
		this._buttonMainSessions = document.querySelector('#button-main-screen-sessions');
		this._buttonMainSettings = document.querySelector('#button-main-screen-settings');
		this._buttonMainPowers = document.querySelector('#button-main-screen-powers');
		this._init();
	}

	_init() {
		this._buttonOnClickEvents();
	}

	_buttonOnClickEvents() {
		this._buttonMainSessions.addEventListener(
			'click',
			() => {
				sidebar.showSidebar();
				sidebarNavigate.settingsShowSessions();
			}
		);

		this._buttonMainSettings.addEventListener(
			'click',
			() => {
				sidebar.showSidebar();
				sidebarNavigate.settingsSelectionShow();
			}
		);
		
		this._buttonMainPowers.addEventListener(
			'click',
			() => {
				sidebar.showSidebar();
				sidebarNavigate.settingsShowPowers();
			}
		);
	}
}
