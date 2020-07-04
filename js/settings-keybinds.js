class SettingsKeybinds {
	constructor() {
		this._localStorage = window.localStorage;

		this._keyBindModifierInput = document.querySelector('#keyBindModifierInput');
		this._keyBindModifiersShow = document.querySelectorAll('#keyBindModifierShow');

		this._keyBindSessionInput = document.querySelector('#keyBindSessionInput');
		this._keyBindPowerInput = document.querySelector('#keyBindPowerInput');
		this._keyBindSettingsInput = document.querySelector('#keyBindSettingsInput');
		this._keyBindUsersInput = document.querySelector('#keyBindUsersInput');
		this._keyBindCloseInput = document.querySelector('#keyBindCloseInput');

		this._settingsApplyKeybinds = document.querySelector('#settingsApplyKeybinds');
		this._settingsResetKeybinds = document.querySelector('#settingsResetKeybinds');

		this._keyBindingsObj = {};

		this._init();
	}

	_init() {
		// Update keybind obj
		this._updateKeyBindingsObj();

		// Register events
		this._keyBindModifierInputKeyDownEvent();
		this._keyBindModifierInputKeyUpEvent();
		this._keyBindModifierInputContextMenuEvent();
		this._keyBindModifierInputOnPasteEvent();
		this._keyBindCloseInputKeyDownEvent();
		this._settingsApplyKeybindsClickEvent();
		this._settingsResetKeybindsClickEvent();
		this._keyBindSessionInputKeyDownEvent();
		this._keyBindPowerInputKeyDownEvent();
		this._keyBindSettingsInputKeyDownEvent();
		this._keyBindUsersInputKeyDownEvent();
	}

	_settingsApplyKeybindsClickEvent() {
		this._settingsApplyKeybinds.addEventListener(
			'click',
			() => {
				this._settingsKeybindsApply();
			}
		);
	}

	_settingsResetKeybindsClickEvent() {
		this._settingsResetKeybinds.addEventListener(
			'click',
			() => {
				this._settingsKeybindsReset();
			}
		);
	}

	_keyBindModifierInputContextMenuEvent() {
		this._keyBindModifierInput.oncontextmenu = e => {
			e.preventDefault();
		}
	}

	_keyBindModifierInputOnDropEvent() {
		this._keyBindModifierInput.ondrop = e => {
			return false;
		}
	}

	_keyBindModifierInputOnPasteEvent() {
		this._keyBindModifierInput.onpaste = e => {
			return false;
		}
	}
	
	_keyBindModifierInputKeyDownEvent() {
		this._keyBindModifierInput.onkeydown = e => {
			if (e.key !== 'Alt' && e.key !== 'Control' && e.key !== 'Super') {
				return false;
			} else {
				this._keyBindModifierInput.value = e.key;
				for (let modifier of this._keyBindModifiersShow) {
					modifier.value = e.key;
				}
				return false;
			}
			return false;
		}
	}

	_keyBindModifierInputKeyUpEvent() {	
		this._keyBindModifierInput.addEventListener(
			'keyup',
			e => {
				return false;
			}
		);
	}

	_keyBindSessionInputKeyDownEvent() {
		this._keyBindSessionInput.onkeydown = e => {
			this._keyBindSessionInput.value = e.key;
			return false;
		}
	}

	_keyBindPowerInputKeyDownEvent() {
		this._keyBindPowerInput.onkeydown = e => {
			this._keyBindPowerInput.value = e.key;
			return false;
		}
	}
	_keyBindSettingsInputKeyDownEvent() {
		this._keyBindSettingsInput.onkeydown = e => {
			this._keyBindSettingsInput.value = e.key;
			return false;
		}
	}
	_keyBindUsersInputKeyDownEvent() {
		this._keyBindUsersInput.onkeydown = e => {
			this._keyBindUsersInput.value = e.key;
			return false;
		}
	}
	
	_keyBindCloseInputKeyDownEvent() {
		this._keyBindCloseInput.onkeydown = e => {
			this._keyBindCloseInput.value = e.key;
			return false;
		}
	}

	// Get item
	_storageGetItem(item) {
		return this._localStorage.getItem(item);
	}

	// Set item
	_storageSetItem(item, value) {
		return this._localStorage.setItem(item, value);
	}

	_clearKeyBindInputsValues() {
		// Clear modifiers
		this._keyBindModifierInput.value = '';
		for (let modifier of this._keyBindModifiersShow) {
			modifier.value = '';
		}

		// Clear inputs
		this._keyBindSessionInput.value = '';
		this._keyBindPowerInput.value = '';
		this._keyBindSettingsInput.value = '';
		this._keyBindUsersInput.value = '';
		this._keyBindCloseInput.value = '';
	}

	_updateKeyBindInputsPlaceholders() {
		// Alias? To shorten the obj name. Yes, I'm lazy eventhough I wrote this long comment lol
		let keyBindObjAlias = this._keyBindingsObj;

		// Update modifiers
		this._keyBindModifierInput.placeholder = keyBindObjAlias.defaultModifierKey;
		for (let modifier of this._keyBindModifiersShow) {
			modifier.placeholder = keyBindObjAlias.defaultModifierKey;
		}

		// Update inputs
		this._keyBindSessionInput.placeholder = keyBindObjAlias.defaultSessionKey;
		this._keyBindPowerInput.placeholder = keyBindObjAlias.defaultPowerKey;
		this._keyBindSettingsInput.placeholder = keyBindObjAlias.defaultSettingsKey;
		this._keyBindUsersInput.placeholder = keyBindObjAlias.defaultUsersKey;
		this._keyBindCloseInput.placeholder = keyBindObjAlias.defaultCloseKey;

		// Call to clear inputs value
		this._clearKeyBindInputsValues();
	}

	getKeyBindingsObj() {
		return this._keyBindingsObj;
	}

	_updateKeyBindingsObj() {
		this._keyBindingsObj = {
			'defaultModifierKey': this._keyBindModifierInput.value || this._storageGetItem('defaultModifierKey') || 'Alt',
			'defaultSessionKey': this._keyBindSessionInput.value || this._storageGetItem('defaultSessionKey') || 's',
			'defaultPowerKey': this._keyBindPowerInput.value || this._storageGetItem('defaultPowerKey') || 'e',
			'defaultSettingsKey': this._keyBindSettingsInput.value || this._storageGetItem('defaultSettingsKey') || 'x',
			'defaultUsersKey': this._keyBindUsersInput.value || this._storageGetItem('defaultUsersKey') || 'y',
			'defaultCloseKey': this._keyBindCloseInput.value || this._storageGetItem('defaultCloseKey') || 'Escape'
		}

		this._updateKeyBindInputsPlaceholders();
	}


	_resetKeyBindingsObj() {
		this._keyBindingsObj = {
			'defaultModifierKey': 'Alt',
			'defaultSessionKey': 's',
			'defaultPowerKey': 'e',
			'defaultSettingsKey': 'x',
			'defaultUsersKey': 'y',
			'defaultCloseKey': 'Escape'
		}

		this._updateKeyBindInputsPlaceholders();
	}

	_updateKeyBindingsDefault() {
		Object.keys(this._keyBindingsObj).forEach(
			(key, index) => {
				this._storageSetItem(key, this._keyBindingsObj[key]);
			}
		);
	}

	_settingsKeybindsApply() {
		this._updateKeyBindingsObj();
		this._updateKeyBindingsDefault();
		keyEvents.updateKeyBindsObj();
	}

	_settingsKeybindsReset() {
		this._resetKeyBindingsObj();
		this._updateKeyBindingsDefault();
		keyEvents.updateKeyBindsObj();
	}
}

