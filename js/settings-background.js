class SettingsBackground{
	constructor() {
		this._localStorage = window.localStorage;
		this._defaultBackgroundPath = 'assets/bg.jpg';

		this._previewImageBackButton = document.querySelector('#previewImageBackButton');
		this._previewImageNextButton = document.querySelector('#previewImageNextButton');
		this._previewBackgroundImage = document.querySelector('#previewBackgroundImage');
		this._previewFileName = document.querySelector('#previewFileName');
		this._backgroundImageRandomCheckBox = document.querySelector('#randomBackgroundSetInput');

		this._bodyOverlay = document.querySelector('.bodyOverlay');
		this._greeterScreen = document.querySelector('.screen#greeterScreen');
		this._settingsScreenBackground = document.querySelector('.screenBackground#settingsScreenBackground');
		this._powerScreenBackground = document.querySelector('.screenBackground#powerScreenBackground');
		this._sessionsScreenBackground = document.querySelector('.screenBackground#sessionsScreenBackground');
		this._usersScreenBackground = document.querySelector('.screenBackground#usersScreenBackground');
		this._goodbyeScreenBackground = document.querySelector('.screenBackground#goodbyeScreenBackground');

		this._backgroundImages = null;
		this._backgroundImagesDir = null;

		this._backgroundCurrentElement = 0;
		this._backgroundCurrentPath = null;
		this._backgroundRandomMode = null;

		this._settingsApplyBackground = document.querySelector('#settingsApplyBackground');
		this._settingsResetBackground = document.querySelector('#settingsResetBackground');

		this._init();
	}

	_init() {
		// Create bg array
		this._createBackgroundArray();

		// Events
		this._previewButtonsOnClickEvent();
		this._backgroundImageRandomOnChangeEvent();
		this._settingsApplyBackgroundClickEvent();
		this._settingsResetBackgroundClickEvent();
	}

	_settingsApplyBackgroundClickEvent() {
		this._settingsApplyBackground.addEventListener(
			'click',
			() => {
				this._settingsBackgroundApply();
			}
		);
	}

	_settingsResetBackgroundClickEvent() {
		this._settingsResetBackground.addEventListener(
			'click',
			() => {
				this._settingsBackgroundReset();
			}
		);
	}

	_backgroundImageRandomApply() {
		this._localStorage.setItem('randomBackgroundImageMode', JSON.stringify(this._backgroundRandomMode));
	}

	_backgroundImageRandomReset() {
		this._localStorage.removeItem('randomBackgroundImageMode');
		this._backgroundImageRandomCheckBox.checked = false;
		this._backgroundRandomMode = false;
	}

	_backgroundImageRandomOnChangeEvent() {
		this._backgroundImageRandomCheckBox.addEventListener(
			'change',
			() => {
				if (this._backgroundImageRandomCheckBox.checked === true) {
					this._backgroundRandomMode = true;
					
				} else {
					this._backgroundRandomMode = false;
				}
			}
		);
	}

	_updateRandomBackgroundImageCheckBoxOnStartup() {
		if (this._backgroundRandomMode === true) {
			this._backgroundImageRandomCheckBox.checked = true;
		} else {
			this._backgroundImageRandomCheckBox.checked = false;
		}
	}

	_updateBackgroundImages() {
		// Create dummy image
		let dummyImg = document.createElement('img');

		// Set the src of dummyImg
		dummyImg.src = this._backgroundCurrentPath;

		dummyImg.onload = () => {
			
			// Save src to a variable
			const src = `url('${dummyImg.src}')`;

			// Set src to bgs
			this._bodyOverlay.style.backgroundImage = src;
			
			this._greeterScreen.style.backgroundImage = src;
			this._greeterScreen.classList.add('darkenScreen');

			this._settingsScreenBackground.style.backgroundImage = src;
			this._settingsScreenBackground.classList.add('darkenScreen');

			this._powerScreenBackground.style.backgroundImage = src;
			this._powerScreenBackground.classList.add('darkenScreen');

			this._sessionsScreenBackground.style.backgroundImage = src;
			this._sessionsScreenBackground.classList.add('darkenScreen');

			this._usersScreenBackground.style.backgroundImage = src;
			this._usersScreenBackground.classList.add('darkenScreen');

			this._goodbyeScreenBackground.style.backgroundImage = src;
		};
	}

	_resetBackgroundImages() { 
		// Reset default background
		this._localStorage.removeItem('defaultBackgroundImage');
		this._backgroundCurrentElement = 0;
		this._backgroundCurrentPath = this._backgroundImages[0];
		this._updatePreviewBackgroundImage();
		this._updateBackgroundImages();
	}

	_updatePreviewBackgroundImageOnStartUp() {

		if (this._backgroundRandomMode === false) {
			if (!this._backgroundImages.indexOf(this._backgroundCurrentPath)) {
				this._backgroundCurrentElement = 0;
			} else {
				this._backgroundCurrentElement = this._backgroundImages.indexOf(this._backgroundCurrentPath);
			}
		} else {
			this._backgroundCurrentElement = Math.floor(Math.random() * (this._backgroundImages.length - 1));
		}
		this._updatePreviewBackgroundImage();
	}

	_updateCurrentBackgroundVariables() {
		this._backgroundCurrentPath = this._localStorage.getItem('defaultBackgroundImage');
		this._backgroundRandomMode = JSON.parse(this._localStorage.getItem('randomBackgroundImageMode')) || false;

		if (!this._backgroundCurrentPath) {
			this._backgroundCurrentPath = this._backgroundImages[0];
		}

		this._updateRandomBackgroundImageCheckBoxOnStartup();
		this._updatePreviewBackgroundImageOnStartUp();
		this._updateBackgroundImages();
	}

	_showSettingsScreen() {
		this._settingsScreen.classList.add('settingsScreenShow');
		this._settingsScreenVisible = true;
	}

	_hideSettingsScreen() {
		this._settingsScreen.classList.remove('settingsScreenShow');
		this._settingsScreenVisible = false;
	}

	toggleSettingsScreen() {
		if (this._settingsScreenVisible) {
			this._hideSettingsScreen();
		} else {
			this._showSettingsScreen();
		}
	}

	getSettingsScreenVisibility() {
		return this._settingsScreenVisible;
	}

	_settingsScreenButtonOnClickEvent() {
		this._settingsScreenButton.addEventListener(
			'click',
			() => {
				this.toggleSettingsScreen();
			}
		);
	}

	// Find image files recursively and save it to an array
	_findImages(dirlist) {
		let images = [],
		subdirs = [],
		recursion = 0;

		// Check image files/dir, and push it to its respective array 
		for (let file of dirlist) {
			if (file.match(/(png|PNG)|(jpg|JPEG)|(bmp|BMP)/) ) {
				images.push(file);
			} else if (!file.match(/\w+\.\w+/)) {
				subdirs.push(file);
			}
		}

		// Search recursively
		if (subdirs.length && recursion < 3) {
			recursion++;
			for (let dir of subdirs) {
				let list = greeterutil.dirlist(dir);

				if (list && list.length) {
					images.push.apply(images, this._findImages(list));
				}
			}
		}
		// Return array of images
		return images;
	}

	// Generate an array of background images form the directory set in the config
	_createBackgroundArray() {
		this._backgroundImagesDir = config.get_str('branding', 'background_images') || '/usr/share/backgrounds';

		if (this._backgroundImagesDir) {
			this._backgroundImages = greeterutil.dirlist(this._backgroundImagesDir) || [];
			// console.log(this._backgroundImages);
		}

		if (this._backgroundImages && this._backgroundImages.length) {
			this._backgroundImages = this._findImages(this._backgroundImages);
		}

		// Push default bg
		this._backgroundImages.unshift(this._defaultBackgroundPath);

		// Update background image variables
		this._updateCurrentBackgroundVariables();
	}

	// Update preview <img> and variables
	_updatePreviewBackgroundImage() {

		let backgroundPath = null;

		// Avoid errors if the user removed the background
		if (!this._backgroundImages[parseInt(this._backgroundCurrentElement, 10)]) {
			
			// Image has been removed, use the element 0;
			backgroundPath = this._backgroundImages[parseInt(0, 10)];
		} else {

			// Get the path of bg image
			backgroundPath = this._backgroundImages[parseInt(this._backgroundCurrentElement, 10)];
		}
		
		// Update label - file name
		this._previewFileName.textContent = backgroundPath.replace(/^.*[\\\/]/, '');
		
		// Update full path variable
		this._backgroundCurrentPath = backgroundPath;

		// Update image src
		this._previewBackgroundImage.src = this._backgroundCurrentPath;
	}

	_previewButtonsOnClickEvent() {
		this._previewImageBackButton.addEventListener(
			'click',
			() => {
				if (this._backgroundCurrentElement <= 0) {
					this._backgroundCurrentElement = (this._backgroundImages.length - 1);
				} else {
					this._backgroundCurrentElement--;
				}
				this._updatePreviewBackgroundImage();
			}
		);

		this._previewImageNextButton.addEventListener(
			'click',
			() => {
				if (this._backgroundCurrentElement >= (this._backgroundImages.length - 1)) {
					this._backgroundCurrentElement = 0;
				} else {
					this._backgroundCurrentElement++;
				}
				this._updatePreviewBackgroundImage();
			}
		);
	}

	_settingsBackgroundApply() {

		// Save current background path in localStorage
		this._localStorage.setItem('defaultBackgroundImage', this._backgroundCurrentPath);

		// Apply background changes
		this._updateBackgroundImages();

		// Random mode
		this._backgroundImageRandomApply();
	}

	_settingsBackgroundReset() {
		// Reset random mode
		this._backgroundImageRandomReset();

		// Reset background image
		this._resetBackgroundImages();
	}
}
