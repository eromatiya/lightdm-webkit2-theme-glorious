class PowerButtons {
	constructor() {
		this._powerButtonsPanel = document.querySelector('#powerButtonsPanel');
		this._powerButtonShow = document.querySelector('#powerButtonsToggle');
		this._powerButtonShowImage = document.querySelector('#powerButtonShow');
		this._powerButtonsMain = document.querySelector('#powerButtonsMain');
		this._powerButtonsOverlay = document.querySelector('#powerButtonsOverlay');

		this._hibernateButton = document.querySelector('#hibernateButton');
		this._suspendButton = document.querySelector('#suspendButton');
		this._restartButton = document.querySelector('#restartButton');
		this._powerButton = document.querySelector('#powerButton');

		this._goodbyeScreen = document.querySelector('#goodbyeScreen');
		this._goodbyeImage = document.querySelector('#goodbyeImage');
		this._goodbyeMessage = document.querySelector('#goodbyeMessage');

		this._powerButtonsVisible = false;
		this._init();
	}

	_init() {
		this._powerButtonsShowOnClickEvent();
		this._powerButtonsOverlayClickEvent();

		// Add a delay
		setTimeout(
			() => {
				this._powerButtonsOnClickEvents();
			},
			500
		);
	}

	getPowerButtonsVisiblity() {
		return this._powerButtonsVisible;
	}

	_powerButtonsOverlayClickEvent() {
		this._powerButtonsOverlay.onclick = e => {
			this._hidePowerButtons();
		};
	}

	_stopPropagation(e) {
		e.stopPropagation();
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

	_executePowerCallback(callback) {
		setTimeout(
			() => {
				this._enableWindowPropagation();
				callback();
			},
			1500
		);
	}

	_showPowerButtons() {

		this._powerButtonShowImage.classList.add('backButtonMode');
		this._powerButtonsPanel.classList.add('powerButtonsPanelShow');
		this._powerButtonsMain.classList.remove('hidePowerButtonsMain');
		this._powerButtonsVisible = true;
		this._powerButtonsOverlay.classList.add('powerButtonsOverlayActivate');
	}

	_hidePowerButtons() {
		
		this._powerButtonShowImage.classList.remove('backButtonMode');
		this._powerButtonsPanel.classList.remove('powerButtonsPanelShow');
		this._powerButtonsMain.classList.add('hidePowerButtonsMain');
		this._powerButtonsVisible = false;
		this._powerButtonsOverlay.classList.remove('powerButtonsOverlayActivate');
	}

	togglepowerButtons() {
		if (this._powerButtonsVisible) {
			this._hidePowerButtons();
			
		} else {
			this._showPowerButtons();
		}
	}

	_powerButtonOnClickRun(icon, message, powerCallback) {
		this._hidePowerButtons();
		this._disableWindowPropagation();
		goodbyeScreen.showGoodbyeScreen(icon, message);
		this._executePowerCallback(powerCallback);
	}

	_powerButtonsOnClickEvents() {
		this._hibernateButton.onclick = () => {
			this._powerButtonOnClickRun('hibernate', 'Hibernating...', lightdm.hibernate);
		}
		this._suspendButton.onclick = () => {
			this._powerButtonOnClickRun('suspend', 'Suspending...', lightdm.suspend);
		}
		this._restartButton.onclick = () => {
			this._powerButtonOnClickRun('restart', 'Rebooting...', lightdm.restart);
		}
		this._powerButton.onclick = () => {
			this._powerButtonOnClickRun('shutdown', 'Shutting down...', lightdm.shutdown);
		}
	}

	_powerButtonsShowOnClickEvent() {
		this._powerButtonShow.onclick = (e) => {
			this.togglepowerButtons();
		}
	}

}
