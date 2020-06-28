class SettingsScreen {
	constructor() {
		this._localStorage = window.localStorage;
		this._defaultBackgroundPath = '/usr/share/lightdm-webkit/themes/lightdm-webkit2-theme-glorious/assets/bg.jpg';

		this._previewImageBackButton = document.querySelector('#previewImageBackButton');
		this._previewImageNextButton = document.querySelector('#previewImageNextButton');
		this._previewBackgroundImage = document.querySelector('#previewBackgroundImage');
		this._previewFileName = document.querySelector('#previewFileName');

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

		this._settingsScreen = document.querySelector('#settingsScreen');
		this._settingsScreenButton = document.querySelector('#settingsScreenButton');
		this._settingsScreenVisible = false;


		this._settingsApplyButton = document.querySelector('#settingsApplyButton');

		this._init();
	}

	_init() {
		// Create bg array
		this._createBackgroundArray();
		this._updateCurrentBackgroundVariables();


		// Events
		this._previewButtonsOnClickEvent();
		this._settingsScreenButtonOnClickEvent();
		this._settingsApplyButtonOnClickEvent();
	}

	_updateBackgroundImages() {
		// Darken background
		const darken = `linear-gradient(rgba(0, 0, 0, 0.5),	rgba(0, 0, 0, 0.5)),`

		// Create dummy image
		let dummyImg = document.createElement('img');

		// Set the src of dummyImg
		dummyImg.src = 'file://' + this._backgroundCurrentPath;

		dummyImg.onload = () => {
			
			// Save src to a variable
			const src = `url('${dummyImg.src}')`

			// Set src to bgs
			this._bodyOverlay.style.backgroundImage = src;
			this._greeterScreen.style.backgroundImage = darken + src;
			this._settingsScreenBackground.style.backgroundImage = darken + src;
			this._powerScreenBackground.style.backgroundImage = darken + src;
			this._sessionsScreenBackground.style.backgroundImage = darken + src;
			this._usersScreenBackground.style.backgroundImage = darken + src;
			this._goodbyeScreenBackground.style.backgroundImage = src;
		}
	}

	_updateCurrentBackgroundVariables() {
		this._backgroundCurrentPath = this._localStorage.getItem('defaultBackgroundImage');

		if (!this._backgroundCurrentPath) {
			this._backgroundCurrentPath = this._backgroundImages[0];
		}

		this._updateBackgroundImages();
	}

	_settingsApplyButtonOnClickEvent() {
		this._settingsApplyButton.addEventListener(
			'click',
			() => {
				// Save current background path in localStorage
				this._localStorage.setItem('defaultBackgroundImage', this._backgroundCurrentPath);

				// Update full path variable
				this._backgroundCurrentPath = this._backgroundCurrentPath;

				// Apply background changes
				this._updateBackgroundImages();
			}
		);
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
				subdirs.push(file)
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
	}

	// Update preview <img> and variables
	_updatePreviewBackgroundImage() {
		const bgPath = this._backgroundImages[parseInt(this._backgroundCurrentElement, 10)];
		
		// Update label - file name
		this._previewFileName.textContent = bgPath.replace(/^.*[\\\/]/, '');
		
		// Update full path variable
		this._backgroundCurrentPath = bgPath;

		// Update image src
		this._previewBackgroundImage.src = 'file://' + this._backgroundCurrentPath;
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
}
