class ProfilePictureRotate {
	constructor() {
		this._profilePictureContainer = document.querySelector('#profilePictureContainer');
		this._profilePictureContainer.style.webkitAnimationPlayState = 'paused';
		this._profileAnimRunning = false;
		this._init();
	}

	// Register events
	_init() {
		this._onClickEvent();
		this._animationEndEvent();
	}

	// Rotate profile picture
	rotateProfilePicture() {
		// Remove anim class
		this._profilePictureContainer.classList.remove('rotateProfileAnim');

		// Triggering reflow
		void this._profilePictureContainer.offsetWidth;

		// Re-add animation class
		this._profilePictureContainer.classList.add('rotateProfileAnim');

		// Start rotation animation
		this._profilePictureContainer.style.webkitAnimationPlayState = 'running';
		this._profileAnimRunning = true;
	}

	// Re-enable animation after death
	_animationEndEvent() {
		this._profilePictureContainer.addEventListener(
			'animationend',
			() => {
				this._profileAnimRunning = false;
			}
		);
	}

	// On click event
	_onClickEvent() {
		this._profilePictureContainer.addEventListener(
			'click', 
			() => {
				if (this._profileAnimRunning) return;
				this.rotateProfilePicture();
			}
		);
	}

	getProfileAnimationStatus() {
		return this._profileAnimRunning;
	}
}
