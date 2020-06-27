class SettingsScreen {
	constructor() {
		this._defaultBackgroundPath = '/usr/share/lightdm-webkit/themes/lightdm-webkit2-theme-glorious/assets/bg.jpg';

		this._previewImageBackButton = document.querySelector('#previewImageBackButton');
		this._previewImageNextButton = document.querySelector('#previewImageNextButton');
		this._previewBackgroundImage = document.querySelector('#previewBackgroundImage');

		this._backgroundsDirRecursion = 0;
		this._backgroundImages = null;
		this._backgroundImagesDir = null;

		this._backgroundCurrentElement = 0;
		this._backgroundCurrentElementValue = null;
		this._init();
	}

	_init() {
		// Create bg array
		this._createBackgroundArray();

		this._previewButtonsOnClickEvent();
	}

	// Find image files recursively and save it to an array
	_findImages(dirlist) {
		var images = [],
		subdirs = [];

		for (var file of dirlist) {
			if (file.match(/(png|PNG)|(jpg|JPEG)|(bmp|BMP)/) ) {
				images.push(file);
			} else if (!file.match(/\w+\.\w+/)) {
				subdirs.push(file)
			}
		}

		if (subdirs.length && ! images.length && this._backgroundsDirRecursion < 3) {
			this._backgroundsDirRecursion++;
			for (var dir of subdirs) {
				var list = greeterutil.dirlist(dir);

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

	_updatePreviewBackgroundImage() {
		this._backgroundCurrentElementValue = 'file://' + this._backgroundImages[parseInt(this._backgroundCurrentElement, 10)];
		this._previewBackgroundImage.src = this._backgroundCurrentElementValue;
		console.log(this._backgroundCurrentElement + ': ' + this._backgroundCurrentElementValue);
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