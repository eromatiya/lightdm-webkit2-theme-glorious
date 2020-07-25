class SessionsScreen {
	constructor() {
		this._localStorage = window.localStorage;

		this._sessionsScreen = document.querySelector('#sessionsScreen');
		this._sessionsList = document.querySelector('.sessionsList');
		this._sessionsScreenButton = document.querySelector('#sessionsScreenButton');
		this._sessionsScreenButtonImage = document.querySelector('#sessionsScreenButtonImage');
		this._sessionsScreenLabel = document.querySelector('#sessionsScreenLabel');
		this._closeScreenSessionsButton = document.querySelector('#closeScreenSessionsButton');

		this._sessionScreenVisible = false;

		this._defaultSession = null;
		this._sessionsObject = null;
		this._defaultSessionItem = null;

		this._init();
	}

	// Start creating sessions list, register events
	_init() {
		this._sessionsScreenButtonOnClickEvent();
		this._closeScreenSessionsButtonClickEvent();

		// Add a delay before calling the lightdm object
		this._updateSessionObject();
	}

	// Register session button on clock event
	// Will open sessions screen
	_sessionsScreenButtonOnClickEvent() {
		this._sessionsScreenButton.addEventListener(
			'click',
				() => {
				// Toggle sessions screen
				this.toggleSessionsScreen();
			}
		);
	}

	_closeScreenSessionsButtonClickEvent() {
		this._closeScreenSessionsButton.addEventListener(
			'click',
			() => {
				this.toggleSessionsScreen();
			}
		);
	}

	// Return session screen visibility bool
	// Global
	getSessionsScreenVisibility() {
		return this._sessionScreenVisible;
	}

	// Show session screen
	showSessionsScreen() {
		// Power Screen
		if (powerScreen.getPowerScreenVisibility()) {
			powerScreen.togglePowerScreen();
		}

		// Users Screen
		if (usersScreen.getUsersScreenVisibility()) {
			usersScreen.toggleUsersScreen();
		}

		// Settings Screen
		if (settingsScreen.getSettingsScreenVisibility()) {
			settingsScreen.toggleSettingsScreen();
		}

		// Goodbye Screen
		if (goodbyeScreen.getGoodbyeScreenVisibility()) {
			goodbyeScreen.hideGoodbyeScreen();
		}

		// Greeter Screen
		if (greeterScreen.getGreeterScreenVisibility()) {
			greeterScreen.toggleGreeterScreen();
		}
		
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
	_updateSessionsScreenButtonElements(key) {
		// Update this session button image
		this._sessionsScreenButtonImage.src = `assets/sessions/${key}.png`;
		this._sessionsScreenButtonImage.onerror = () => {
			this._sessionsScreenButtonImage.src = 'assets/sessions/session-default.png';
		};

		// Update label
		this._sessionsScreenLabel.textContent = key;
	}


	// Set the default session in list on startup
	_setSessionListDefaultOnStartUp() {

		this._defaultSession = this._localStorage.getItem('defaultSession');

		if (this._defaultSession === null) {
			this._defaultSession = this._sessionsObject[0].key || lightdm.default_session;
		}

		// Update session button image
		this._updateSessionsScreenButtonElements(this._defaultSession);

		const defaultItemID = this._defaultSession + 'Session';
		const defaultSessionItem = document.querySelector(`#${defaultItemID}`);
		this._updateSessionItemDefault(defaultSessionItem);
	}

	// Session item click event
	_sessionItemOnClickEvent(item, key) {
		item.addEventListener(
			'click', 
			() => {
				// Save active session key to variable
				this._defaultSession = key;

				// Hide session screen
				this.hideSessionsScreen();

				// Save default session on localstorage
				this._localStorage.setItem('defaultSession', this._defaultSession);

				// Update the selected session item
				this._updateSessionItemDefault(item);

				// Update session button image
				this._updateSessionsScreenButtonElements(key);
			}
		);
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
