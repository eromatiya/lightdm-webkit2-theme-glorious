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

		this._keyBindingsObj = {};

		this._init();
	}

	_init() {
		// Update keybind obj
		this._updatekeyBindingsObj();

		// Register events
		this._keyBindModifierInputKeyDownEvent();
		this._keyBindModifierInputKeyUpEvent();
		this._keyBindModifierInputContextMenuEvent();
		this._keyBindModifierInputOnPasteEvent();
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

	// Get item
	_storageGetItem(item) {
		return this._localStorage.getItem(item);
	}

	_updateKeyBindInputs() {
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
	}

	_updatekeyBindingsObj() {
		this._keyBindingsObj = {
			'defaultModifierKey': this._storageGetItem('defaultModifierKey') || 'Alt',
			'defaultSessionKey': this._storageGetItem('defaultSessionKey') || 's',
			'defaultPowerKey': this._storageGetItem('defaultPowerKey') || 'e',
			'defaultSettingsKey': this._storageGetItem('defaultSettingsKey') || 'x',
			'defaultUsersKey': this._storageGetItem('defaultUsersKey') || 'y',
			'defaultCloseKey': this._storageGetItem('defaultCloseKey') || 'Escape'
		}

		this._updateKeyBindInputs();
	}

	settingsKeybindsApply() {

	}

	settingsKeybindsReset() {

	}
}

