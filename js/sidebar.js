class Sidebar {
	constructor () {
		this._sidebar = document.querySelector('#sidebar');
		this._sidebarOverlay = document.querySelector('#sidebar-overlay');
		this._buttonMainScreenSettingsImage = document.querySelector('#button-main-screen-settings-image');
		this._buttonMainScreenPowersImage = document.querySelector('#button-main-screen-powers-image');
		this._passwordInput = document.querySelector('#input-password');
		this._sidebarVisible = false;
		this._init();
	}

	_init() {
		this._sidebarOverlayOnClickEvent();
	}

	getSidebarVisibility() {
		return this._sidebarVisible;
	}

	showSidebar() {
		this._passwordInput.blur();
		this._sidebar.classList.add('sidebar-show');
		this._sidebarOverlay .classList.add('sidebar-overlay-show');
		this._buttonMainScreenSettingsImage.classList.add('button-main-screen-blur');
		this._buttonMainScreenPowersImage.classList.add('button-main-screen-blur');
		this._sidebarVisible = true;
	}

	hideSidebar() {
		this._passwordInput.focus();
		this._sidebar.classList.remove('sidebar-show');
		this._sidebarOverlay .classList.remove('sidebar-overlay-show');
		this._buttonMainScreenSettingsImage.classList.remove('button-main-screen-blur');
		this._buttonMainScreenPowersImage.classList.remove('button-main-screen-blur');
		this._sidebarVisible = false;
	}

	toggleSidebar() {
		if (this._sidebarVisible) {
			this.hideSidebar();
		} else {
			sidebarNavigate.settingsSelectionShow();
			this.showSidebar();
		}
	}

	_sidebarOverlayOnClickEvent() {
		this._sidebarOverlay.addEventListener(
			'click',
			() => {
				this.hideSidebar();
			}
		);
	}
}
