class SwipeEventCallback {
	constructor() {
		this._bodyBackground = document.querySelector('.body-background');
		this._greeterScreen = document.querySelector('.screen#screen-greeter');
		this._sidebar = document.querySelector('.sidebar#sidebar');
		this._createMouseSwipeEvents();
	}

	_createMouseSwipeEvents() {
		// Swipe event for greeter screen
		new SwipeEvent(
			this._greeterScreen,
			(el, dir) => {
				if (dir === 'up') {
					greeterScreen.toggleGreeter();
				}
			}
		);

		// Swipe event for body overlay
		new SwipeEvent(
			this._bodyBackground,
			(el, dir) => {
				if (dir === 'down') {
					greeterScreen.toggleGreeter();
				} else if (dir === 'left') {
					sidebar.showSidebar();
				}
			}
		);

		new SwipeEvent(
			this._sidebar,
			(el, dir) => {
				if (dir === 'right') {
					sidebar.hideSidebar();
				}
			}
		);
	}
}
