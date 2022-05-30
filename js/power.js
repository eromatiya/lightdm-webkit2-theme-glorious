class Power {
	constructor() {
		this._localStorage = window.localStorage;
		this._powerList = document.querySelector('#power-list.sidebar-settings-item-list');
		this._powerObject = [];
		this._init();
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
		const language = new Language();
		;
		this._powerObject = [
			{
				'name': language._getPowerTranslate('shutdown', 'Shutdown','name'),
				'icon': 'shutdown',
				'enabled': lightdm.can_shutdown,
				'powerCommand': lightdm.shutdown,
				'message': language._getPowerTranslate('shutdown', 'Shutting down...','message')
			},
			{
				'name': language._getPowerTranslate('reboot', 'Reboot','name'),
				'icon': 'restart',
				'enabled': lightdm.can_restart,
				'powerCommand': lightdm.restart,
				'message': language._getPowerTranslate('reboot', 'Rebooting...','message')
			},
			{
				'name': language._getPowerTranslate('hibernate', 'Hibernate','name'),
				'icon': 'hibernate',
				'enabled': lightdm.can_hibernate,
				'powerCommand': lightdm.hibernate,
				'message': language._getPowerTranslate('hibernate', 'Hibernating...','message')
			},
			{
				'name': language._getPowerTranslate('suspend', 'Suspend','name'),
				'icon': 'suspend',
				'enabled': lightdm.can_suspend,
				'powerCommand': lightdm.suspend,
				'message': language._getPowerTranslate('suspend', 'Suspending...','message')
			}
		];
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
				this._disableWindowPropagation();
				goodbye.showGoodbye(powerObj.icon, powerObj.message);
				this._executePowerCallback(powerObj.powerCommand);
			}
		);
	}

	_createPowerList() {
		for (let powerItem of this._powerObject) {
			// If disabled, don't create a button for it
			if (!powerItem.enabled) continue;
			let powerItemButton = document.createElement('button');
			powerItemButton.className = 'button-sidebar-list-item';
			powerItemButton.id = `button-sessions-item-${powerItem.name.toLowerCase()}`;
			powerItemButton.insertAdjacentHTML(
				'beforeend',
				`
				<div class='button-sidebar-item-image-parent' id='button-powers-item-image-parent'>
					<img class='button-sidebar-item-image' id='button-powers-item-image' draggable='false' src='assets/power/${powerItem.icon}.svg'
					onerror='this.src="assets/power/shutdown.svg"'></img>
				</div>
				<div class='button-sidebar-item-name' id='button-sessions-item-name'>${powerItem.name}</div>
				`
			);
			let listItem = document.createElement('li');
			// Create on click event
			this._powerItemOnClickEvent(powerItemButton, powerItem);
			listItem.appendChild(powerItemButton);
			this._powerList.appendChild(listItem);
		}
	}

	_init() {
		if (!lightdm) {
			lightdm.onload = function() {
				this._usersObject = lightdm.users;
				this._createPowerObject();
			};
		} else {
			this._usersObject = lightdm.users;
			this._createPowerObject();
		}
		this._createPowerList();
	}
}
