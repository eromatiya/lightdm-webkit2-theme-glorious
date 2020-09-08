class Themes {
	constructor() {
		this._localStorage = window.localStorage;
		this._buttonInputReset = document.querySelector('#button-input-themes-reset');
		this._buttonInputApply = document.querySelector('#button-input-themes-apply');

		this._inputBackgroundColor = document.querySelector('#sidebar-settings-bg-input');
		this._inputBackgroundOpacity = document.querySelector('#sidebar-settings-bg-opacity-input');

		this._inputForegroundColor = document.querySelector('#sidebar-settings-fg-input');
		this._inputForegroundOpacity = document.querySelector('#sidebar-settings-fg-opacity-input');

		this._inputBlurStrength = document.querySelector('#sidebar-settings-blur-input');
		this._inputAnimSpeed = document.querySelector('#sidebar-settings-animation-input');
		this._init();
	}

	_init() {
		this._saveOriginalDefaultCSS();
		this._inputButtonClickEvent();
	}

	_inputButtonClickEvent() {
		this._buttonInputReset.addEventListener(
			'click',
			() => {
				this._settingsThemeReset();
			}
		);

		this._buttonInputApply.addEventListener(
			'click',
			() => {
				this._settingsThemeApply();
			}
		);
	}

	_getInputFieldsValue() {
		const backgroundColor = (this._inputBackgroundColor.value || this._inputBackgroundColor.placeholder) +
			(this._inputBackgroundOpacity.value || this._inputBackgroundOpacity.placeholder);
		const foregroundColor = (this._inputForegroundColor.value || this._inputForegroundColor.placeholder) +
			(this._inputForegroundOpacity.value || this._inputForegroundOpacity.placeholder);
		const blurStrength = (this._inputBlurStrength.value || this._inputBlurStrength.placeholder);
		const transitionSpeed = (this._inputAnimSpeed.value || this._inputAnimSpeed.placeholder);
		const inputFieldValues = {
			'background': backgroundColor,
			'foreground': foregroundColor,
			'blurPower': blurStrength,
			'animSpeed': transitionSpeed 
		};
		return inputFieldValues;
	}

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
				value: this._checkAnimSpeedValidity(animSpeedRaw),
				fallbackVar: 'animSpeed',
				fallbackOrigVar: 'origAnimSpeed'
			}
		};

		// Validate and set anim speed
		const animSpeed = this._checkAnimSpeedValidity(animSpeedRaw) ||
			this._getStorageItem(validatedSpeedValue['transitionSpeed'].fallbackVar) ||
			this._getStorageItem(validatedSpeedValue['transitionSpeed'].fallbackOrigVar);
		// Save custom css values
		this._localStorage.setItem('baseBG', bgColor);
		this._localStorage.setItem('baseColor', fgColor);
		this._localStorage.setItem('blurStrength', blurPower);
		this._localStorage.setItem('animSpeed', animSpeed);
		// Update css values
		this._updateCSSColors(bgColor, fgColor, blurPower, animSpeed);
		this._processCurrentCSSValues();
	}

	_settingsThemeApply() {
		this._updateCSSVariables();
	}

	_settingsThemeReset() {
		this._localStorage.removeItem('baseBG');
		this._localStorage.removeItem('baseColor');
		this._localStorage.removeItem('blurStrength');
		this._localStorage.removeItem('animSpeed');
		this._saveOriginalDefaultCSS();
	}

	_getCSSProperty(variable) {
		let cssValue = window.getComputedStyle(document.documentElement).getPropertyValue(String(variable));
		// Remove whitespaces
		// I don't know why getProperty value adds a whitespace(i'm really noob at js)
		cssValue = cssValue.replace(/ /g,'');
		return cssValue;
	}

	_getStorageItem(item) {
		return this._localStorage.getItem(String(item));
	}

	_setStorageItem(item, value) {
		this._localStorage.setItem(
			String(item),
			this._getCSSProperty(String(value))
		);
	}

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
			} else if (/^#[0-9a-fA-F]{3}[0-9a-fA-F]{2}$/i.test(colorStr)) {
				const bg = colorStr.slice(0, -2);
				const op = colorStr.slice(-2);
				return bg.replace(/^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/, '#$1$1$2$2$3$3') + op;
			} else {
				return null;
			}
		}
		return colorStr;
	}

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

	_updateTextBoxValues(bgColor, bgOpacity, fgColor, fgOpacity, blurPower, animSpeed) {
		this._inputBackgroundColor.value = '';
		this._inputBackgroundColor.placeholder = bgColor;
		this._inputBackgroundOpacity.value = '';
		this._inputBackgroundOpacity.placeholder = bgOpacity;
		this._inputForegroundColor.value = '';
		this._inputForegroundColor.placeholder = fgColor;
		this._inputForegroundOpacity.value = '';
		this._inputForegroundOpacity.placeholder = fgOpacity;
		this._inputBlurStrength.value = '';
		this._inputBlurStrength.placeholder = blurPower;
		this._inputAnimSpeed.value = '';
		this._inputAnimSpeed.placeholder = animSpeed;
	}

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

	_updateCSSColors(bgColor, fgColor, blurStrength, animSpeed) {
		document.documentElement.style.setProperty('--global-bg', bgColor);
		document.documentElement.style.setProperty('--global-fg', fgColor);
		document.documentElement.style.setProperty('--global-blur-strength', blurStrength);
		document.documentElement.style.setProperty('--global-animation-speed', animSpeed);
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

	_saveOriginalDefaultCSS() {
		// Check original default CSS values
		const defaultValues = {
			'origBaseBG': {
				value: this._getStorageItem('origBaseBG'),
				cssVariable: '--global-bg'
			},
			'origBaseColor': {
				value: this._getStorageItem('origBaseColor'),
				cssVariable: '--global-fg'
			},
			'origBlurStrength': {
				value: this._getStorageItem('origBlurStrength'),
				cssVariable: '--global-blur-strength'
			},
			'origAnimSpeed': {
				value: this._getStorageItem('origAnimSpeed'),
				cssVariable: '--global-animation-speed'
			}
		};
		// If original css variable has has no value, set it
		Object.keys(defaultValues)
		.forEach(item => {
			const itemName = item;
			const itemValue = defaultValues[String(item)].value;
			// If value is null, set
			if (!itemValue || itemValue === '') {
				this._setStorageItem(itemName, defaultValues[String(item)].cssVariable);
			}
		});
		this._reApplyTheme();
	}
}
