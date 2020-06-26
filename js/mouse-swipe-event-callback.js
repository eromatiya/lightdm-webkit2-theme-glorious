class MouseSwipeEventCallback {
	constructor() {
		this._bodyOverlay = document.querySelector('.bodyOverlay');
		this._sessionsScreen = document.querySelector('#sessionsScreen');
		this._powerScreen = document.querySelector('#powerScreen');
		this._usersScreen = document.querySelector('#usersScreen');
		this._greeterScreen = document.querySelector('.screen.greeterScreen');
		this._createMouseSwipeEvents();
	}

	_createMouseSwipeEvents() {
		// Swipe event for greeter screen
		const greeterScreenSwipeEvent = new MouseSwipeEvent(
			this._greeterScreen,
			(el, dir) => {
				if (dir === 'up') {
					greeterScreen.toggleGreeterScreen();
				}
			}
		);

		// Swipe event for power screen
		const powerScreenSwipeEvent = new MouseSwipeEvent(
			this._powerScreen,
			(el, dir) => {
				if (dir === 'up') {
					powerScreen.togglePowerScreen();
				}
			}
		);

		// Swipe event for body overlay
		const bodyOverlaySwipeEvent = new MouseSwipeEvent(
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
		const sessionsScreenSwipeEvent = new MouseSwipeEvent(
			this._sessionsScreen,
			(el, dir) => {
				if (dir === 'up') {
					sessionsScreen.toggleSessionsScreen();
				}
			}
		);

		// Swipe event for users screen
		const usersSwipeEvent = new MouseSwipeEvent(
			this._usersScreen,
			(el, dir) => {
				if (dir === 'up') {
					usersScreen.toggleUsersScreen();
				}
			}
		);
	}

}
