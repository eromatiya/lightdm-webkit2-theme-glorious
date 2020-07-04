class SettingsKeybinds {
	constructor() {
		this._keyBindModifierInput = document.querySelector('#keyBindModifierInput');
		this._keyBindModifiersShow = document.querySelectorAll('#keyBindModifierShow');

		this._init();
	}

	_init() {
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
}

