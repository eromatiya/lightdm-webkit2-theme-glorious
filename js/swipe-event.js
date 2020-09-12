class SwipeEvent {
	constructor(element, callback) {
		this._passedElement = element;
		this._passedCallback = callback;
		this._startX = 0;
		this._startY = 0;
		this._endX = 0;
		this._endY = 0;
		this._startTime = 0;
		this._endTime = 0;
		this._direction = null;
		this._timeThreshold = 500;
		this._thresholdPixel = 200;
		this._touchMoveEvent = null;
		this._createMouseEvent();
	}

	_resetMouseSwipeEventVariables() {
		this._startX = 0;
		this._startY = 0;
		this._endX = 0;
		this._endY = 0;
		this._startTime = 0;
		this._endTime = 0;
		this._direction = null;
	}

	_swipeEnd() {
		// Coordinates computation
		let swipedPixelsX = Math.abs(this._endX - this._startX);
		let swipedPixelsY = Math.abs(this._endY - this._startY);
		let timeOfSwipe = this._endTime - this._startTime;

		// If time threshold doesn't meet, return
		if (timeOfSwipe > this._timeThreshold) {
			return;
		}

		if ((swipedPixelsY < swipedPixelsX) && (swipedPixelsX >= this._thresholdPixel)) {
			// Swipes in x axis
			if (this._endX > this._startX) {
				// Swipe right
				this._direction = 'right';
			} else if (this._endX < this._startX) {
				// Swipe left
				this._direction = 'left';
			}
					
		} else if ((swipedPixelsY > swipedPixelsX) && (swipedPixelsY >= this._thresholdPixel)) {
			// Swipes in y axis
				if (this._startY > this._endY) {
				// Swipe up
				this._direction = 'up';
			} else if (this._startY < this._endY) {
				// Swipe down
				this._direction = 'down';
			}
		}

		// Call callback if it's a function
		// Passed element and direction
		if ((this._direction !== null) || (this._direction !== '')) {
			if (typeof this._passedCallback === 'function') {
				this._passedCallback(this._passedElement, this._direction);
				this._resetMouseSwipeEventVariables();
			}
		}	
	}

	_createMouseEvent() {

		this._passedElement.addEventListener(
			'touchstart',
			e => {
				this._startX = e.touches[0].clientX;
				this._startY = e.touches[0].clientY;
				this._startTime = new Date().getTime();
			},
			{ passive: true }
		);

		this._passedElement.addEventListener(
			'touchmove',
			e => {
				this._touchMoveEvent = e;
			},
			{ passive: true }
		);

		this._passedElement.addEventListener(
			'touchend',
			e => {

				if (!this._touchMoveEvent) return;

				this._endX = this._touchMoveEvent.touches[0].clientX;
				this._endY = this._touchMoveEvent.touches[0].clientY;
				this._endTime = new Date().getTime();

				this._swipeEnd();
			}
		);
		
		this._passedElement.addEventListener(
			'mousedown',
			e => {
				this._startX = e.offsetX;
				this._startY = e.offsetY;
				this._startTime = new Date().getTime();
			}
		);

		this._passedElement.addEventListener(
			'mouseup',
			e => {
				this._endX = e.offsetX;
				this._endY = e.offsetY;
				this._endTime = new Date().getTime();

				this._swipeEnd();
			}
		);
	}
}

// This is how you create a swipe event callback instance
// new SwipeEvent(
// 	document.querySelector('#greeterScreen'),
// 	(el, dir) => {
// 		el.style.setProperty('background', '#ff00ff');
// 		console.log(`swiped ${dir}`);
// 	}
// );