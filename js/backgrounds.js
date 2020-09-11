class Backgrounds {
	constructor() {
		this._localStorage = window.localStorage;
		this._defaultBackgroundPath = 'assets/bg.jpg';
		this._randomBackgroundPath = 'assets/random.jpg';
		this._backgroundsList = document.querySelector('#backgrounds-list.sidebar-settings-item-list');
		this._backgrounds = document.querySelectorAll('.background');
		this._backgroundImages = null;
		this._backgroundImagesDir = null;
		this._backgroundCurrentElement = 0;
		this._backgroundCurrentPath = null;
		this._backgroundRandomMode = null;
		this._defaultBackgroundItem = null;
		this._backgroundListPopulated = false;
		this._init();
	}

	_randomIntegerForBackground(min, max) {
		const rand = Math.floor(Math.random() * (max - min + 1)) + min;
		return rand;
		// Exclude index 1 (the random image)
		// return (rand === 1) ? this._randomIntegerForBackground(min, max) : rand;
	}

	_pathToID(str) {
		const file = str.replace(/^.*[\\\/]/, '');
		const fileName = file.replace(/\.[^/.]+$/, '');
		const id = fileName.replace(/\s+/g, '-');
		return id;
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

	_updateBackgroundImages() {
		let dummyImg = document.createElement('img');
		dummyImg.src = this._backgroundCurrentPath;
		dummyImg.onload = () => {
			const src = `url('${dummyImg.src}')`;
			for (let background of this._backgrounds) {
				background.style.setProperty('background-image', src);
			}
		}
	}

	_updateBackgroundsDefault() {
		const id = this._pathToID(this._backgroundCurrentPath);
		let defaultAccountItem = document.querySelector(`#button-backgrounds-item-${id}`);
		if (this._defaultBackgroundItem) {
			this._defaultBackgroundItem.classList.remove('button-default-selected');
		}
		this._defaultBackgroundItem = defaultAccountItem;
		defaultAccountItem.classList.add('button-default-selected');
	}

	_updateBackgroundVariables() {
		this._backgroundRandomMode = JSON.parse(this._localStorage.getItem('randomBackgroundImageMode')) || false;
		this._backgroundCurrentPath = this._localStorage.getItem('defaultBackgroundImage') || this._backgroundImages[1];
		if (this._backgroundRandomMode === false) {
			// Checks if the path is in the array
			if (!this._backgroundImages.includes(this._backgroundCurrentPath)) {
				this._backgroundCurrentPath = this._backgroundImages[1];
			}
		} else {
			const randomIndex = this._randomIntegerForBackground(1, this._backgroundImages.length - 1);
			this._backgroundCurrentPath = this._backgroundImages[parseInt(randomIndex, 10)];
		}
		this._updateBackgroundImages();
	}

	_setBackgroundDefaultOnStartUp() {
		this._updateBackgroundVariables();
	}

	_randomItemSave() {
		this._localStorage.setItem('randomBackgroundImageMode', JSON.stringify(this._backgroundRandomMode));
	}

	_backgroundsItemOnClickEvent(button, path) {
		button.addEventListener(
			'click',
			() => {
				for (let background of this._backgrounds) {
					background.style.setProperty('background-image', `url('${path}')`);
				}
				this._localStorage.setItem('defaultBackgroundImage', String(path));
				this._backgroundRandomMode = false;
				this._randomItemSave();
			}
		);
	}

	_randomItemOnClickEvent(button) {
		button.addEventListener(
			'click',
			() => {
				this._backgroundRandomMode = true;
				this._randomItemSave();
				this._updateBackgroundVariables();
			}
		);
	}

	_populateBackgroundsList() {
		for (let i = 0; i < this._backgroundImages.length; i++) {
			const pathToImage = this._backgroundImages[parseInt(i, 10)];
			const imageFileName = pathToImage.replace(/^.*[\\\/]/, '');
			const id = this._pathToID(imageFileName);
			let backgroundsItemButton = document.createElement('button');
			backgroundsItemButton.className = 'button-sidebar-list-item';
			backgroundsItemButton.id = `button-backgrounds-item-${id}`;
			backgroundsItemButton.insertAdjacentHTML(
				'beforeend',
				`
				<div class='button-sidebar-item-image-parent' id='button-backgrounds-item-image-parent'>
					<img class='button-sidebar-item-image' id='button-backgrounds-item-image' draggable='false'
						src='${pathToImage}' onerror='this.src="${this._defaultBackgroundPath}"'></img>
				</div>
				<div class='button-sidebar-item-name' id='button-backgrounds-item-name'>${imageFileName}</div>
				`
			);
			let listItem = document.createElement('li');
			if (i === 0) {
				// Random image
				this._randomItemOnClickEvent(backgroundsItemButton);
			} else {
				this._backgroundsItemOnClickEvent(backgroundsItemButton, pathToImage);
			}
			listItem.appendChild(backgroundsItemButton);
			this._backgroundsList.appendChild(listItem);
		}
		this._updateBackgroundsDefault();
	}

	populateBackgroundsList() {
		if (!this._backgroundListPopulated) {
			this._populateBackgroundsList();
			this._backgroundListPopulated = true;
		}
	}

	_createBackgroundArray() {
		this._backgroundImagesDir = config.get_str('branding', 'background_images') || '/usr/share/backgrounds';
		if (this._backgroundImagesDir) {
			this._backgroundImages = greeterutil.dirlist(this._backgroundImagesDir) || [];
		}
		if (this._backgroundImages && this._backgroundImages.length) {
			this._backgroundImages = this._findImages(this._backgroundImages);
		}
		this._backgroundImages.unshift(this._defaultBackgroundPath);
		this._backgroundImages.unshift(this._randomBackgroundPath);
		this._setBackgroundDefaultOnStartUp();
	}

	_init() {
		this._createBackgroundArray();
	}
}
