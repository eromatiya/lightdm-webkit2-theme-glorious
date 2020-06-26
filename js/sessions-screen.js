class SessionsScreen {
	constructor() {
		this._localStorage = window.localStorage;

		this._sessionsScreen = document.querySelector('#sessionsScreen');
		this._sessionsList = document.querySelector('.sessionsList');
		this._sessionsScreenButton = document.querySelector('#sessionsScreenButton');
		this._sessionsButtonImage = document.querySelector('.sessionsButtonImage');

		this._sessionScreenVisible = false;

		this._defaultSession = null;
		this._sessionsObject = null;
		this._defaultSessionItem = null;

		this._init();
	}

	// Start creating sessions list, register events
	_init() {
		this._sessionsScreenButtonOnClickEvent();

		// Add a delay before calling the lightdm object
		this._updateSessionObject();
	}

	// Register session button on clock event
	// Will open sessions screen
	_sessionsScreenButtonOnClickEvent() {
		this._sessionsScreenButton.onclick = e => {
			// Toggle sessions screen
			this.toggleSessionsScreen();
		};
	}

	// Return session screen visibility bool
	// Global
	getSessionsScreenVisibility() {
		return this._sessionScreenVisible;
	}

	// Show session screen
	showSessionsScreen() {
		this._sessionsScreen.classList.add('sessionsScreenShow');
		this._sessionScreenVisible = true;
	}

	// Hide session screen
	hideSessionsScreen() {
		this._sessionsScreen.classList.remove('sessionsScreenShow');
		this._sessionScreenVisible = false;
	}

	// Toggle session screen
	toggleSessionsScreen() {
		if (this._sessionScreenVisible) {
			this.hideSessionsScreen();
		} else {
			this.showSessionsScreen();
		}
	}

	// Get lightdm sessions
	// Call function to create list
	_updateSessionObject() {
		this._sessionsObject = lightdm.sessions;
		this._createSessionList();
	}

	// Return default session, global.
	getDefaultSession() {
		return this._defaultSession;
	}

	// Update session list to select default
	_updateSessionItemDefault(item) {
		// Unselect the current item as and remove it as default
		if (this._defaultSessionItem) {
			this._defaultSessionItem.classList.remove('sessionItemDefault');
		}

		// Update the current item and select it as default
		this._defaultSessionItem = item;
		item.classList.add('sessionItemDefault');
	}

	// Update session button image
	_setSessionButtonImage(key) {
		// Update this session button image
		this._sessionsButtonImage.src = `assets/sessions/${key}.png`;
		this._sessionsButtonImage.onerror = () => {
			this._sessionsButtonImage.src = 'assets/sessions/session-default.png';
		};
	}

	// Set the default session in list on startup
	_setSessionListDefaultOnStartUp() {

		this._defaultSession = this._localStorage.getItem('defaultSession');

		if (this._defaultSession === null) {
			this._defaultSession = lightdm.default_session || this._sessionsObject[0].key;
		}

		// Update session button image
		this._setSessionButtonImage(this._defaultSession);

		const defaultItemID = this._defaultSession + 'Session';
		const defaultSessionItem = document.querySelector(`#${defaultItemID}`);
		this._updateSessionItemDefault(defaultSessionItem);
	}

	// Session item click event
	_sessionItemOnClickEvent(item, key) {
		item.onclick = e => {
			// Save active session key to variable
			this._defaultSession = key;

			// Hide session screen
			this.hideSessionsScreen();

			// Save default session on localstorage
			this._localStorage.setItem('defaultSession', this._defaultSession);

			// Update the selected session item
			this._updateSessionItemDefault(item);

			// Update session button image
			this._setSessionButtonImage(key);
		};
	}
		
	// Create session list
	_createSessionList() {
		// Generate session list
		for (let i = 0; i < this._sessionsObject.length; i++) {

			const sessionName = this._sessionsObject[parseInt(i, 10)].name;
			const sessionKey = this._sessionsObject[parseInt(i, 10)].key;
			let sessionItem = document.createElement('button');

			sessionItem.className = 'sessionItem';
			sessionItem.id = `${sessionKey}Session`;
			sessionItem.insertAdjacentHTML(
				'beforeend',
				`
				<div id='sessionItemIconContainer'>
					<img id='sessionItemIcon' draggable='false' src='assets/sessions/${sessionKey}.png' 
					onerror='this.src="assets/sessions/session-default.png"'></img>
				</div>
				<div id='sessionItemName'>${sessionName}</div>
				`
			);
			// Create on click event
			this._sessionItemOnClickEvent(sessionItem, sessionKey);

			// Append to item
			this._sessionsList.appendChild(sessionItem);
		}

		// Update default session
		this._setSessionListDefaultOnStartUp();
	}
}
