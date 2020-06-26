class PowerScreen {
	constructor() {
		this._powerObject = [];

		this._powerScreen = document.querySelector('#powerScreen');
		this._powerList = document.querySelector('.powerList');
		this._powerButtonPanel = document.querySelector('#powerButtonsPanel');
		this._powerScreenButton = document.querySelector('#powerScreenButton');

		this._powerScreenVisible = false;

		this._init();
	}

	_init() {
		this._createPowerObject();
		this._powerScreenButtonOnClickEvent();
	}

	_powerScreenButtonOnClickEvent() {
		this._powerScreenButton.addEventListener(
			'click',
			() => {
				this.togglePowerScreen();
			}
		);
	}

	// Return power screen visibility bool
	// Global
	getPowerScreenVisibility() {
		return this._powerScreenVisible;
	}

	// Show session screen
	showPowerScreen() {
		this._powerScreen.classList.add('powerScreenShow');
		this._powerScreenVisible = true;
	}

	// Hide session screen
	hidePowerScreen() {
		this._powerScreen.classList.remove('powerScreenShow');
		this._powerScreenVisible = false;
	}

	// Toggle session screen
	togglePowerScreen() {
		if (this._powerScreen.classList.contains('powerScreenShow')) {
			this.hidePowerScreen();
		} else {
			this.showPowerScreen();
		}
	}

	_disableWindowPropagation() {
		window.addEventListener('keydown',  this._stopPropagation, true);
		window.addEventListener('keyup',    this._stopPropagation, true);
		window.addEventListener('keypress', this._stopPropagation, true);
	}

	_enableWindowPropagation() {
		window.removeEventListener('keydown',  this._stopPropagation, true);
		window.removeEventListener('keyup',    this._stopPropagation, true);
		window.removeEventListener('keypress', this._stopPropagation, true);
	}

	_createPowerObject() {
		this._powerObject = [
			{
				'name': 'Shutdown',
				'icon': 'shutdown',
				'enabled': lightdm.can_shutdown,
				'powerCommand': lightdm.shutdown,
				'message': 'Shutting down...'
			},
			{
				'name': 'Reboot',
				'icon': 'restart',
				'enabled': lightdm.can_restart,
				'powerCommand': lightdm.restart,
				'message': 'Rebooting...'
			},
			{
				'name': 'Hibernate',
				'icon': 'hibernate',
				'enabled': lightdm.can_hibernate,
				'powerCommand': lightdm.hibernate,
				'message': 'Hibernating...'
			},
			{
				'name': 'Suspend',
				'icon': 'suspend',
				'enabled': lightdm.can_suspend,
				'powerCommand': lightdm.suspend,
				'message': 'Suspending...'
			}
		];

		// Create power button list
		this._createPowerList();
	}


	_executePowerCallback(callback) {
		setTimeout(
			() => {
				this._enableWindowPropagation();
				callback();
			},
			1500
		);
	}

	_powerItemOnClickEvent(item, powerObj) {
		item.addEventListener(
			'click',
			() => {
				// Hide power screen
				this.hidePowerScreen();

				// Disable keydown events temporarily
				this._disableWindowPropagation();

				// Show goodby screen
				goodbyeScreen.showGoodbyeScreen(powerObj.icon, powerObj.message);

				// Execute power command
				this._executePowerCallback(powerObj.powerCommand);
			}
		);
	}

	_createPowerList() {
		// Generate session list
		for (let i = 0; i < this._powerObject.length; i++) {

			// If disabled, don't create a button for it
			const powerCommandEnabled = this._powerObject[parseInt(i, 10)].enabled;
			if (!powerCommandEnabled) return;

			// Get object element data
			const powerName = this._powerObject[parseInt(i, 10)].name;
			const powerCommand =  this._powerObject[parseInt(i, 10)].powerCommand;
			const powerIcon = this._powerObject[parseInt(i, 10)].icon;
			const powerMessage = this._powerObject[parseInt(i, 10)].message;

			// Create item
			let powerItem = document.createElement('button');
			powerItem.className = 'powerItem';
			powerItem.id = `${powerName.toLowerCase()}PowerButton`;
			powerItem.insertAdjacentHTML(
				'beforeend',
				`
				<div id='powerItemIconContainer'>
					<img id='powerItemIcon' draggable='false' src='assets/power/${powerIcon}.svg' 
					onerror='this.src="assets/power/shutdown.svg"'></img>
				</div>
				<div id='powerItemName'>${powerName}</div>
				`
			);

			// Create on click event
			this._powerItemOnClickEvent(powerItem, this._powerObject[parseInt(i, 10)]);

			// // Append to item
			this._powerList.appendChild(powerItem);
		}
	}
}
