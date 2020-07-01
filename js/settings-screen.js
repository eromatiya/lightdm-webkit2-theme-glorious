class SettingsScreen {
	constructor() {
		this._localStorage = window.localStorage;
		this._defaultBackgroundPath = 'assets/bg.jpg';

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

		this._backgroundImageRandomCheckBox = document.querySelector('#randomBackgroundSetInput');
		this._backgroundTextBox = document.querySelector('#backgroundColorSetInput');
		this._backgroundOpacityTextBox = document.querySelector('#backgroundOpacitySetInput');
		this._foregroundTextBox = document.querySelector('#foregroundColorSetInput');
		this._foregroundOpacityTextBox = document.querySelector('#foregroundOpacitySetInput');

		this._blurTextBox = document.querySelector('#blurStrengthSetInput');
		this._animSpeedTextBox = document.querySelector('#animSpeedSetInput');

		this._backgroundImages = null;
		this._backgroundImagesDir = null;

		this._backgroundCurrentElement = 0;
		this._backgroundCurrentPath = null;
		this._backgroundRandomMode = null;

		this._settingsScreen = document.querySelector('#settingsScreen');
		this._settingsScreenButton = document.querySelector('#settingsScreenButton');
		this._settingsScreenVisible = false;

		this._settingsApplyButton = document.querySelector('#settingsApplyButton');
		this._settingsResetButton = document.querySelector('#settingsResetButton');

		this._init();
	}

	_init() {
		// Create bg array
		this._createBackgroundArray();
		this._updateCurrentBackgroundVariables();
		
		// Save original css variables value
		this._saveOriginalDefaultCSS();

		// Process css theme
		this._reApplyTheme();

		// Events
		this._previewButtonsOnClickEvent();
		this._settingsScreenButtonOnClickEvent();
		this._settingsApplyButtonOnClickEvent();
		this._settingsResetButtonOnClickEvent();
		this._backgroundImageRandomOnChangeEvent();
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
		// Darken background
		const darken = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),`;

		// Create dummy image
		let dummyImg = document.createElement('img');

		// Set the src of dummyImg
		dummyImg.src = this._backgroundCurrentPath;

		dummyImg.onload = () => {
			
			// Save src to a variable
			const src = `url('${dummyImg.src}')`;

			// Set src to bgs
			this._bodyOverlay.style.backgroundImage = src;
			this._greeterScreen.style.backgroundImage = darken + src;
			this._settingsScreenBackground.style.backgroundImage = darken + src;
			this._powerScreenBackground.style.backgroundImage = darken + src;
			this._sessionsScreenBackground.style.backgroundImage = darken + src;
			this._usersScreenBackground.style.backgroundImage = darken + src;
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


	// Get CSS variable value
	_getCSSProperty(variable) {
		let cssValue = window.getComputedStyle(document.documentElement).getPropertyValue(String(variable));

		// Remove whitespaces
		// I don't know why getProperty value adds a whitespace(i'm really noob at js)
		cssValue = cssValue.replace(/ /g,'');

		return cssValue;
	}

	// Get localStorage item value
	_getStorageItem(item) {
		return this._localStorage.getItem(String(item));
	}

	// Set localStorage item value
	_setStorageItem(item, value) {
		this._localStorage.setItem(
			String(item),
			this._getCSSProperty(String(value))
		);
	}

	// Set/Save original CSS Value, useful when reseting theme engine
	_saveOriginalDefaultCSS() {

		// Check original default CSS values
		const defaultValues = {
			'origBaseBG': {
				value: this._getStorageItem('origBaseBG'),
				cssVariable: '--base-bg'
			},
			'origBaseColor': {
				value: this._getStorageItem('origBaseColor'),
				cssVariable: '--base-color'
			},
			'origBlurStrength': {
				value: this._getStorageItem('origBlurStrength'),
				cssVariable: '--blur-strength'
			},
			'origAnimSpeed': {
				value: this._getStorageItem('origAnimSpeed'),
				cssVariable: '--transition-speed'
			}
		};

		// If original css variable has has no value, set it
		Object.keys(defaultValues)
		.forEach(item => {
			const itemName = item;
			const itemValue = defaultValues[String(item)].value;

			// If value is null, set
			if (!itemValue) {
				this._setStorageItem(itemName, defaultValues[String(item)].cssVariable);
			}
		});
	}

	// Validate color
	_checkColorValidity(colorStr) {

		// Check if RGBA - (#RRGGBBAA)
		const colorRGBA = /^#[0-9a-fA-F]{8}$/i.test(colorStr);

		// If not RGBA
		if (!colorRGBA) {

			// If RGB - (#RRGGBB)
			if (/^#[0-9a-fA-F]{3}$/i.test(colorStr)) {
				
				// Add completely opaque alpha
				return colorStr + 'FF';
			
			// If three-charactered HEX color - (#RGB)
			// I feel that this is never used lol
			} else if (/^#[0-9a-fA-F]{3}$/i.test(colorStr)) {

				// Convert it to RRGGBB
				return colorStr.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3');

			// If three-charactered HEX Color(#RGB) with AA - (#RGBAA)
			} else if (/^#[0-9a-fA-F]{3}[0-9a-fA-F]{2}$/i.test(colorStr)) {

				const bg = colorStr.slice(0, -2);
				const op = colorStr.slice(-2);

				return bg.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3') + op;

			} else {
				return null;
			}
		}

		// It's RGBA and a valid color so just return it
		return colorStr;
	}

	// Validate color
	_checkBlurValidity(blurStr) {

		let blurStrength = parseInt(blurStr, 10);

		if (String(blurStrength) === 'NaN') {
			return null;
		} else {
			return String(blurStrength) + 'px';
		}
	}

	_checkAnimSpeedValidity(speedStr) {

		let animSpeed = parseInt(speedStr, 10);
		let timeSuffix;

		if (speedStr.endsWith('ms')) {
			timeSuffix = 'ms';
		} else if (speedStr.endsWith('s')) {
			timeSuffix = 's';
		}

		if(String(animSpeed) === 'NaN') {
			return null;
		} else {
			if (timeSuffix) {
				return String(animSpeed) + timeSuffix;
			} else {
				return String(animSpeed) + 'ms';
			}
		}
	}

	// Update textboxes value
	_updateTextBoxValues(bgColor, bgOpacity, fgColor, fgOpacity, blurPower, animSpeed) {

		// Set placeholders
		this._backgroundTextBox.value = '';
		this._backgroundTextBox.placeholder = bgColor;

		this._backgroundOpacityTextBox.value = '';
		this._backgroundOpacityTextBox.placeholder = bgOpacity;

		this._foregroundTextBox.value = '';
		this._foregroundTextBox.placeholder = fgColor;
		this._foregroundOpacityTextBox.value = '';
		this._foregroundOpacityTextBox.placeholder = fgOpacity;

		this._blurTextBox.value = '';
		this._blurTextBox.placeholder = blurPower;

		this._animSpeedTextBox.value = '';
		this._animSpeedTextBox.placeholder = animSpeed;
	}

	// Get/Update current css value
	_getCurrentCSSValues() {

		// Retrieve current css values
		let currentValues = {
			'baseBG': {
				value: this._getStorageItem('baseBG'),
				origVariable: 'origBaseBG'
			},
			'baseColor': {
				value: this._getStorageItem('baseColor'),
				origVariable: 'origBaseColor'
			},
			'blurStrength': {
				value: this._getStorageItem('blurStrength'),
				origVariable: 'origBlurStrength'
			},
			'animSpeed': {
				value: this._getStorageItem('animSpeed'),
				origVariable: 'origAnimSpeed'
			}
		};

		// If current css variable has has no value, set it
		Object.keys(currentValues)
		.forEach(key => {
			const cssVar = key;
			const cssValue = currentValues[String(cssVar)].value;

			// If value is null, set
			if (!cssValue) {
				currentValues[String(cssVar)].value = this._getStorageItem(currentValues[String(cssVar)].origVariable);
			}
		});

		return currentValues;
	}

	// Process css variables to update input fields
	_processCurrentCSSValues() {

		// Get current css values
		const themeObj = this._getCurrentCSSValues();

		const baseBG = themeObj['baseBG'].value;
		const backgroundColor = baseBG.slice(0, -2);
		const backgroundOpacity = baseBG.slice(-2);

		const baseColor = themeObj['baseColor'].value;
		const foregroundColor = baseColor.slice(0, -2);
		const foregroundOpacity = baseColor.slice(-2);

		const blurStrength = themeObj['blurStrength'].value;
		const animSpeed = themeObj['animSpeed'].value;

		// Pass value to update textboxes
		this._updateTextBoxValues(
			backgroundColor,
			backgroundOpacity,
			foregroundColor,
			foregroundOpacity,
			blurStrength,
			animSpeed
		);
	}
	
	// Get input fields values
	_getInputFieldsValue() {

		// Get value from the input fields
		const backgroundColor = (this._backgroundTextBox.value || this._backgroundTextBox.placeholder) +
			(this._backgroundOpacityTextBox.value || this._backgroundOpacityTextBox.placeholder);

		const foregroundColor = (this._foregroundTextBox.value || this._foregroundTextBox.placeholder) +
			(this._foregroundOpacityTextBox.value || this._foregroundOpacityTextBox.placeholder);

		const blurStrength = (this._blurTextBox.value || this._blurTextBox.placeholder);
		const transitionSpeed = (this._animSpeedTextBox.value || this._animSpeedTextBox.placeholder);

		const inputFieldValues = {
			'background': backgroundColor,
			'foreground': foregroundColor,
			'blurPower': blurStrength,
			'animSpeed': transitionSpeed 
		};

		return inputFieldValues;
	}

	_updateCSSColors(bgColor, fgColor, blurPower, animSpeed) {
		// Change CSS colors
		document.documentElement.style.setProperty('--base-bg', bgColor);
		document.documentElement.style.setProperty('--base-color', fgColor);
		document.documentElement.style.setProperty('--blur-strength', blurPower);
		document.documentElement.style.setProperty('--transition-speed', animSpeed);
	}

	// Update css variables and set theme
	_updateCSSVariables() {

		const inputValueObj = this._getInputFieldsValue();

		const bgColorRaw = inputValueObj['background'];
		const fgColorRaw = inputValueObj['foreground'];
		const blurPowerRaw = inputValueObj['blurPower'];
		const animSpeedRaw = inputValueObj['animSpeed'];

		// Colors data obj
		let validatedColorValues = {
			'bgColor': {
				value: this._checkColorValidity(String(bgColorRaw)),
				fallbackVar: 'baseBG',
				fallbackOrigVar: 'origBaseBG'
			},
			'fgColor': {
				value: this._checkColorValidity(String(fgColorRaw)),
				fallbackVar: 'baseColor',
				fallbackOrigVar: 'origBaseColor'
			}
		};

		// Check color validity
		Object.keys(validatedColorValues)
		.forEach(key => {

			let colorVar = key;
			let colorValue = validatedColorValues[String(key)].value;

			if (!colorValue) {
				validatedColorValues[String(key)].value = 
				this._getStorageItem(validatedColorValues[String(key)].fallbackVar) ||
				this._getStorageItem(validatedColorValues[String(key)].fallbackOrigVar);

				// console.log('Invalid Color! Will use previous one...')
			}
		});

		// Set valid color to variables
		const bgColor = validatedColorValues['bgColor'].value;
		const fgColor = validatedColorValues['fgColor'].value;

		// Blur data obj
		let validatedBlurValue = {
			'blurStrength': {
				value: this._checkBlurValidity(blurPowerRaw),
				fallbackVar: 'blurStrength',
				fallbackOrigVar: 'origBlurStrength'
			}
		};

		// Validate and set blur strength
		const blurPower = this._checkBlurValidity(blurPowerRaw) ||
			this._getStorageItem(validatedBlurValue['blurStrength'].fallbackVar) ||
			this._getStorageItem(validatedBlurValue['blurStrength'].fallbackOrigVar);

		// Anim speed data obj
		let validatedSpeedValue = {
			'transitionSpeed' : {
				value: this._checkBlurValidity(animSpeedRaw),
				fallbackVar: 'animSpeed',
				fallbackOrigVar: 'origAnimSpeed'
			}
		};

		// Validate and set anim speed
		const animSpeed = this._checkAnimSpeedValidity(animSpeedRaw) ||
			this._getStorageItem(validatedSpeedValue['transitionSpeed'].fallbackVar) ||
			this._getStorageItem(validatedSpeedValue['transitionSpeed'].fallbackOrigVar);

		// console.log('bg: '+bgColor+'\nfg: '+fgColor+'\nblur: '+blurPower+'\nspeed: '+animSpeed);

		// Save custom color
		this._localStorage.setItem('baseBG', bgColor);
		this._localStorage.setItem('baseColor', fgColor);
		this._localStorage.setItem('blurStrength', blurPower);
		this._localStorage.setItem('animSpeed', animSpeed);

		// Update css colors
		this._updateCSSColors(bgColor, fgColor, blurPower, animSpeed);
		this._processCurrentCSSValues();
	}

	_reApplyTheme() {
		this._updateCSSColors(
			this._getStorageItem('baseBG') || this._getStorageItem('origBaseBG'),
			this._getStorageItem('baseColor') || this._getStorageItem('origBaseColor'),
			this._getStorageItem('blurStrength') || this._getStorageItem('origBlurStrength'),
			this._getStorageItem('animSpeed') || this._getStorageItem('origAnimSpeed')
		);

		this._processCurrentCSSValues();
	}

	_settingsApplyButtonOnClickEvent() {
		this._settingsApplyButton.addEventListener(
			'click',
			() => {
				// Save current background path in localStorage
				this._localStorage.setItem('defaultBackgroundImage', this._backgroundCurrentPath);

				// Apply background changes
				this._updateBackgroundImages();

				// Update css variables
				this._updateCSSVariables();

				// Random mode
				this._backgroundImageRandomApply();
			}
		);
	}

	_settingsResetButtonOnClickEvent() {
		this._settingsResetButton.addEventListener(
			'click',
			() => {
				// Reset CSS Colors
				this._localStorage.removeItem('baseBG');
				this._localStorage.removeItem('baseColor');
				this._localStorage.removeItem('blurStrength');
				this._localStorage.removeItem('animSpeed');

				this._saveOriginalDefaultCSS();
				this._reApplyTheme();

				// Reset random mode
				this._backgroundImageRandomReset();

				// Reset background image
				this._resetBackgroundImages();
			}
		);
	}
}
