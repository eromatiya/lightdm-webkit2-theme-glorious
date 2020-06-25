class MouseSwipeEventCallback {
	constructor() {
		this._bodyOverlay = document.querySelector('.bodyOverlay');
		this._sessionsScreen = document.querySelector('#sessionsScreen');
		this._usersScreen = document.querySelector('#usersScreen');
		this._greeterScreen = document.querySelector('.screen.greeterScreen');
		this._createMouseSwipeEvents();
	}

	_createMouseSwipeEvents() {
		// Swipe event for greeter screen
		new MouseSwipeEvent(
			this._greeterScreen,
			(el, dir) => {
				if (dir === 'up') {
					greeterScreen.toggleGreeterScreen();
				}
			}
		);

		// Swipe event for body overlay
		new MouseSwipeEvent(
			this._bodyOverlay,
			(el, dir) => {
				if (dir === 'down') {
					greeterScreen.toggleGreeterScreen();
				} else if (dir === 'right') {
					sessionsScreen.toggleSessionsScreen();
				} else if (dir === 'left') {
					usersScreen.toggleUsersScreen();
				}
			}
		);

		// Swipe event for sessions screen
		new MouseSwipeEvent(
			this._sessionsScreen,
			(el, dir) => {
				if (dir === 'up') {
					sessionsScreen.toggleSessionsScreen();
				}
			}
		);

		// Swipe event for users screen
		new MouseSwipeEvent(
			this._usersScreen,
			(el, dir) => {
				if (dir === 'up') {
					usersScreen.toggleUsersScreen();
				}
			}
		);
	}

}
