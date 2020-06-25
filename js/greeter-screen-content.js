class GreeterScreenContent {
	constructor() {
		this._monthsArr = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];

		this._daysArr = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];

		this._greeter = document.querySelector('#greeter');
		this._clockEl = document.querySelector('#clock');
		this._dateEl = document.querySelector('#date');

		this._init();
	}

	// Start clock
	_init() {
		this._startClock();
	}

	// Get ordinal  suffix
	_getDayOrdinal(day) {
		return day + (day > 0 ? ['th', 'st', 'nd', 'rd'][(day > 3 && day < 21) ||
			day % 10 > 3 ? 0 : day % 10] : '');
	}

	// Append zero
	_appendZero(k) {
		// Append 0 before time elements if less hour's than 10
		if (k < 10) {
			return '0' + k;
		} else {
			return k;
		}
	}

	// Set time
	_setTime() {
		const date = new Date();
		let hour = date.getHours();
		let min = date.getMinutes();
		let midDay = 'AM';
		let greeterSuffix = '';

		if (hour >= 6 && hour < 12) {
			greeterSuffix = 'Morning';
		} else if (hour >= 12 && hour < 18) {
			greeterSuffix = 'Afternoon';
		} else {
			greeterSuffix = 'Evening';
		}

		midDay = (hour >= 12) ? 'PM' : 'AM';
		hour = (hour === 0) ? 12 : ((hour > 12) ? (hour - 12) : hour);

		hour = this._appendZero(hour);
		min = this._appendZero(min);

		// Update clock id element
		this._greeter.innerText = `Good ${greeterSuffix}!`;
		this._clockEl.innerText = `${hour}:${min} ${midDay}` ;
		this._dateEl.innerText = `${this._getDayOrdinal(date.getDate())} of ` +
			`${this._monthsArr[date.getMonth()]}, ${this._daysArr[date.getDay()]}`;
	}

	_startClock() {
		this._setTime = this._setTime.bind(this);
		
		this._setTime();
		setInterval(this._setTime, 1000);
	}
}
