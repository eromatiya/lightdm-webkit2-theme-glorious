class PowerScreen {
	constructor() {
		this._powerObject = [];
	}

	_createPowerObject() {
		this._powerObject = [
			{
				'name': 'Shutdown',
				'enabled': lightdm.can_shutdown,
				'powerCommand': lightdm.shutdown()
			},
			{
				'name': 'Reboot',
				'enabled': lightdm.can_restart,
				'powerCommand': lightdm.restart()
			},
			{
				'name': 'Hibernate',
				'enabled': lightdm.can_hibernate,
				'powerCommand': lightdm.hibernate()
			},
			{
				'name': 'Reboot',
				'enabled': lightdm.can_suspend,
				'powerCommand': lightdm.suspend()
			}
		]
	}
}

const powerScreen = new PowerScreen();