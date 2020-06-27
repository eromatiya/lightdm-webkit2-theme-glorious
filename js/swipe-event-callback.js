class SwipeEventCallback {
	constructor() {
		this._bodyOverlay = document.querySelector('.bodyOverlay');
		this._sessionsScreen = document.querySelector('#sessionsScreen');
		this._powerScreen = document.querySelector('#powerScreen');
		this._settingsScreen = document.querySelector('#settingsScreen');
		this._usersScreen = document.querySelector('#usersScreen');
		this._greeterScreen = document.querySelector('.screen.greeterScreen');
		this._createMouseSwipeEvents();
	}

	_createMouseSwipeEvents() {
		// Swipe event for greeter screen
		const greeterScreenSwipeEvent = new SwipeEvent(
			this._greeterScreen,
			(el, dir) => {
				if (dir === 'up') {
					greeterScreen.toggleGreeterScreen();
				}
			}
		);

		// Swipe event for power screen
		const powerScreenSwipeEvent = new SwipeEvent(
			this._powerScreen,
			(el, dir) => {
				if (dir === 'up') {
					powerScreen.togglePowerScreen();
				}
			}
		);

		// Swipe event for setting screen
		const settingsScreenSwipeEvent = new SwipeEvent(
			this._settingsScreen,
			(el, dir) => {
				if (dir === 'up') {
					settingsScreen.toggleSettingsScreen();
				}
			}
		);

		// Swipe event for body overlay
		const bodyOverlaySwipeEvent = new SwipeEvent(
			this._bodyOverlay,
			(el, dir) => {
				if (dir === 'down') {
					greeterScreen.toggleGreeterScreen();
				} else if (dir === 'right') {
					sessionsScreen.toggleSessionsScreen();
				} else if (dir === 'left') {
					usersScreen.toggleUsersScreen();
				} else if (dir === 'up') {
					powerScreen.togglePowerScreen();
				}
			}
		);

		// Swipe event for sessions screen
		const sessionsScreenSwipeEvent = new SwipeEvent(
			this._sessionsScreen,
			(el, dir) => {
				if (dir === 'up') {
					sessionsScreen.toggleSessionsScreen();
				}
			}
		);

		// Swipe event for users screen
		const usersSwipeEvent = new SwipeEvent(
			this._usersScreen,
			(el, dir) => {
				if (dir === 'up') {
					usersScreen.toggleUsersScreen();
				}
			}
		);
	}
}
