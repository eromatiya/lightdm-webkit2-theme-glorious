class KeyEvents {
	constructor () {
		this._keysLog = {};
		this._passwordInput = document.querySelector('#input-password');
		this._modifierKey = null;
		this._sessionsKey = null;
		this._powerKey = null;
		this._sidebarKey = null;
		this._usersKey = null;
		this._closeKey = null;

		this._init();
	}

	_init () {
		this.updateKeyBindsObj();
		this._onKeyDownEvent();
		this._onKeyUpEvent();
	}

	updateKeyBindsObj() {
		const keyBindsObj = keyBinds.getKeyBindObj();
		this._modifierKey = keyBindsObj.defaultModifierKey;
		this._sidebarKey = keyBindsObj.defaultSidebarKey;
		this._sessionsKey = keyBindsObj.defaultSessionKey;
		this._powerKey = keyBindsObj.defaultPowerKey;
		this._accountsKey = keyBindsObj.defaultAccountsKey;
		this._closeKey = keyBindsObj.defaultCloseKey;
	}

	_onKeyDownEvent() {
		document.addEventListener(
			'keydown',
			e => {
				this._keysLog[e.key] = true;
			}
		);
	}

	_onKeyUpEvent() {
		document.addEventListener(
			'keyup',
			e => {
				// Toggle sidebar
				if ((this._keysLog[this._modifierKey]) && (e.key === this._sidebarKey)) {
					e.preventDefault();
					sidebar.toggleSidebar();
					return;
				}

				if ((this._keysLog[this._modifierKey]) && (e.key === this._sessionsKey)) {
					e.preventDefault();
					sidebarNavigate.settingsShowSessions();
					return;
				}

				if ((this._keysLog[this._modifierKey]) && (e.key === this._powerKey)) {
					e.preventDefault();
					sidebarNavigate.settingsShowPowers();
					return;
				}

				if ((this._keysLog[this._modifierKey]) && (e.key === this._accountsKey)) {
					e.preventDefault();
					sidebarNavigate.settingsShowAccounts();
					return;
				}

				if ((e.key === ' ') || (e.code === 'Space')) {
					if (greeterScreen.getGreeterVisibility()) {
						greeterScreen.toggleGreeter();
						return;
					}
				}

				if (e.key === this._closeKey) {
					e.preventDefault();

					if (sidebarNavigate.hideActiveSettings()) {
						sidebarNavigate.settingsSelectionShow();
						return;
					}

					if (sidebar.getSidebarVisibility()) {
						sidebar.hideSidebar();
						return;
					}

					if (goodbye.getGoodbyeVisibility()) {
						goodbye.hideGoodbye();
						return;
					}

					greeterScreen.toggleGreeter();
					this._passwordInput.value = '';
					return;
				}
				delete this._keysLog[e.key];
			}
		);
	}
}
