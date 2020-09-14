class Sessions {
	constructor() {
		this._localStorage = window.localStorage;
		this._sessionsList = document.querySelector('#sessions-list.sidebar-settings-item-list');
		this._buttonScreenMainSessionImage = document.querySelector('#button-main-screen-sessions-image');
		this._buttonScreenMainSessionLabel = document.querySelector('#button-main-screen-sessions-label');
		this._defaultSession = null;
		this._sessionsObject = null;
		this._defaultSessionItem = null;
		this._init();
	}

	getDefaultSession() {
		return this._defaultSession;
	}

	_updateMainScreenButtonUIs(key) {
		this._buttonScreenMainSessionImage.src = `assets/sessions/${key}.png`;
		this._buttonScreenMainSessionImage.onerror = function() {
			this.src = 'assets/sessions/session-default.png';
		};
		this._buttonScreenMainSessionLabel.innerText = key.toUpperCase();
	}

	_updateSessionItemDefault(button) {
		if (this._defaultSessionItem) {
			this._defaultSessionItem.classList.remove('button-default-selected');
		}
		this._defaultSessionItem = button;
		button.classList.add('button-default-selected');
	}

	_setSessionListDefaultOnStartUpFallback() {
		this._defaultSession = this._sessionsObject[parseInt(0, 10)].key;
		this._localStorage.setItem('defaultSession', this._defaultSession);
	}

	_setSessionListDefaultOnStartUp() {
		this._defaultSession = this._localStorage.getItem('defaultSession') ||
			this._sessionsObject[parseInt(0, 10)].key || lightdm.default_session;
		let defaultSessionItem = document.querySelector(`#button-sessions-item-${this._defaultSession}`);
		if (!defaultSessionItem) {
			// If the should've been default session does not exist
			defaultSessionItem = document.querySelector(`#button-sessions-item-${this._sessionsObject[parseInt(0, 10)].key}`);
			this._setSessionListDefaultOnStartUpFallback();
		}
		this._updateSessionItemDefault(defaultSessionItem);
		this._updateMainScreenButtonUIs(this._defaultSession);
	}

	_sessionItemOnClickEvent(button, key) {
		button.addEventListener(
			'click', 
			() => {
				this._defaultSession = key;
				this._localStorage.setItem('defaultSession', this._defaultSession);
				this._updateSessionItemDefault(button);
				this._updateMainScreenButtonUIs(key);
			}
		);
	}

	_populateSessionsList() {
		if (this._sessionsObject.length < 1) return;
		for (let i = 0; i < this._sessionsObject.length; i++) {
			const sessionName = this._sessionsObject[parseInt(i, 10)].name;
			const sessionKey = this._sessionsObject[parseInt(i, 10)].key;
			let sessionItemButton = document.createElement('button');
			sessionItemButton.className = 'button-sidebar-list-item';
			sessionItemButton.id = `button-sessions-item-${sessionKey}`;
			sessionItemButton.insertAdjacentHTML(
				'beforeend',
				`
				<div class='button-sidebar-item-image-parent' id='button-sessions-item-image-parent'>
					<img class='button-sidebar-item-image' id='button-sessions-item-image' draggable='false'
						src='assets/sessions/${sessionKey}.png' onerror='this.src="assets/sessions/session-default.png"'></img>
				</div>
				<div class='button-sidebar-item-name' id='button-sessions-item-name'>${sessionName}</div>
				`
			);
			let listItem = document.createElement('li');
			this._sessionItemOnClickEvent(sessionItemButton, sessionKey);
			listItem.appendChild(sessionItemButton);
			this._sessionsList.appendChild(listItem);
		}
		this._setSessionListDefaultOnStartUp();
	}

	_init() {
		if (!lightdm) {
			lightdm.onload = function() {
				this._sessionsObject = lightdm.sessions;
				this._populateSessionsList();
			};
		} else {
			this._sessionsObject = lightdm.sessions;
			this._populateSessionsList();
		}
	}
}
