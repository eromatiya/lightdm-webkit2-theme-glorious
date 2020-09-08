class KeyBinds {
	constructor() {
		this._localStorage = window.localStorage;
		this._inputModifier = document.querySelector('#sidebar-settings-modifier-input');
		this._inputModifierReadOnly = document.querySelectorAll('.sidebar-input-modifier-read');
		this._buttonInputReset = document.querySelector('#button-input-keybind-reset');
		this._buttonInputApply = document.querySelector('#button-input-keybind-apply');
		this._inputSidebarKey = document.querySelector('#sidebar-settings-sidebar-key-input');
		this._inputSessionsKey = document.querySelector('#sidebar-settings-sessions-key-input');
		this._inputPowerKey = document.querySelector('#sidebar-settings-power-key-input');
		this._inputAccountsKey = document.querySelector('#sidebar-settings-accounts-key-input');
		this._inputCloseKey = document.querySelector('#sidebar-settings-close-key-input');
		this._modifierKeys = [ 'Alt', 'Control', 'OS', 'Meta', 'Super' ];
		this._keyBindObj = {};
		this._init();
	}

	_init() {
		this._updateKeyBindObj();
		this._inputModifierInputEvents();
		this._inputButtonClickEvent();
		this._inputKeyInputEvents();
	}

	getKeyBindObj() {
		return this._keyBindObj;
	}

	_storageGetItem(item) {
		return this._localStorage.getItem(item);
	}

	_storageSetItem(item, value) {
		return this._localStorage.setItem(item, value);
	}

	_clearKeyBindInputsValues() {
		this._inputModifier.value = '';
		for (let modifier of this._inputModifierReadOnly) {
			modifier.value = '';
		}
		this._inputSidebarKey.value = '';
		this._inputSessionsKey.value = '';
		this._inputPowerKey.value = '';
		this._inputAccountsKey.value = '';
		this._inputCloseKey.value = '';
	}

	_updateKeyBindInputsPlaceholders() {
		// Alias? To shorten the obj name. Yes, I'm lazy eventhough I wrote this long comment lol
		let kbdObj = this._keyBindObj;
		// Update modifiers
		this._inputModifier.placeholder = kbdObj.defaultModifierKey;
		for (let modifier of this._inputModifierReadOnly) {
			modifier.placeholder = kbdObj.defaultModifierKey;
		}
		// Update inputs
		this._inputSidebarKey.placeholder = kbdObj.defaultSidebarKey;
		this._inputSessionsKey.placeholder = kbdObj.defaultSessionKey;
		this._inputPowerKey.placeholder = kbdObj.defaultPowerKey;
		this._inputAccountsKey.placeholder = kbdObj.defaultAccountsKey;
		this._inputCloseKey.placeholder = kbdObj.defaultCloseKey;
		// Call to clear inputs value
		this._clearKeyBindInputsValues();
	}

	_updateKeyBindObj() {
		this._keyBindObj = {
			'defaultModifierKey': this._inputModifier.value || this._storageGetItem('defaultModifierKey') || 'Alt',
			'defaultSidebarKey': this._inputSidebarKey.value || this._storageGetItem('defaultSidebarKey') || 's',
			'defaultSessionKey': this._inputSessionsKey.value || this._storageGetItem('defaultSessionKey') || 'e',
			'defaultPowerKey': this._inputPowerKey.value || this._storageGetItem('defaultPowerKey') || 'x',
			'defaultAccountsKey': this._inputAccountsKey.value || this._storageGetItem('defaultAccountsKey') || 'y',
			'defaultCloseKey': this._inputCloseKey.value || this._storageGetItem('defaultCloseKey') || 'Escape'
		};
		this._updateKeyBindInputsPlaceholders();
	}

	_inputButtonClickEvent() {
		this._buttonInputReset.addEventListener(
			'click',
			() => {
				this._settingsKeybindsReset();
			}
		);

		this._buttonInputApply.addEventListener(
			'click',
			() => {
				this._settingsKeybindsApply();
			}
		);
	}

	_inputKeyInputEvents() {
		const keyEvents = function(el, event) {
			el.addEventListener(
				'keyup',
				function(e) {
					this.value = e.key;
					return false;
				}
			);
		};

		const keyEventsObj = [
			this._inputSidebarKey,
			this._inputSessionsKey,
			this._inputPowerKey,
			this._inputAccountsKey,
			this._inputCloseKey
		];

		for (let i = 0; i < keyEventsObj.length; i++) {
			keyEvents(keyEventsObj[parseInt(i, 10)], 'keyup');
			keyEvents(keyEventsObj[parseInt(i, 10)], 'keydown');
		}
	}

	_inputModifierInputEvents() {
		this._inputModifier.addEventListener(
			'contextmenu',
			e => {
				e.preventDefault();
			}
		);

		this._inputModifier.addEventListener(
			'drop',
			() => {
				return false;
			}
		);

		this._inputModifier.addEventListener(
			'paste',
			() => {
				return false;
			}
		);

		this._inputModifier.addEventListener(
			'keydown',
			e => {
				e.preventDefault();
				if (!this._modifierKeys.includes(String(e.key))) {
					return false;
				} else {
					this._inputModifier.value = e.key;
					for (let modifier of this._inputModifierReadOnly) {
						modifier.value = e.key;
					}
					return false;
				}
			}
		);

		this._inputModifier.addEventListener(
			'keyup',
			e => {
				e.preventDefault();
				return false;
			}
		);
	}

	_resetKeyBindObj() {
		this._keyBindObj = {
			'defaultModifierKey': 'Alt',
			'defaultSidebarKey': 's',
			'defaultSessionKey': 'e',
			'defaultPowerKey': 'x',
			'defaultAccountsKey': 'y',
			'defaultCloseKey': 'Escape'
		};
		this._updateKeyBindInputsPlaceholders();
	}

	_updateKeyBindDefault() {
		Object.keys(this._keyBindObj).forEach(
			(key, index) => {
				this._storageSetItem(key, this._keyBindObj[String(key)]);
			}
		);
	}

	_settingsKeybindsApply() {
		this._updateKeyBindObj();
		this._updateKeyBindDefault();
		keyEvents.updateKeyBindsObj();
	}

	_settingsKeybindsReset() {
		this._resetKeyBindObj();
		this._updateKeyBindDefault();
		keyEvents.updateKeyBindsObj();
	}
}
