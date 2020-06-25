class Authentication {
	constructor() {
		this._userNameEl = document.querySelector('#userName');
		this._passwordInputEl = document.querySelector('#passwordInput');
		this._passwordInputBox = document.querySelector('#passwordInputBox');
		this._tooltipMessage = document.querySelector('#passwordTooltip');
		this._authenticateButton = document.querySelector('#authenticateButton');

		this._userName = '';
		this._password = '';

		this._init();
	}

	// Start authenticating and register events
	_init() {
		this._autologinTimerExpired();
		this._authenticationComplete();
		this._passwordInputOnKeyDownEvent();
		this._authenticateButtonOnClickEvent();
		this.startAuthentication();
	}

	// Start authenticating
	startAuthentication() {
		// Cancel authentication process of there's any
		lightdm.cancel_authentication();

		// Get selected user to authenticate
		this._userName = usersScreen.getDefaultUserName();
		lightdm.authenticate(this._userName);
	}

	// You failed to authenticate
	_authenticationFailed() {
		// New authentication session
		this.startAuthentication();

		// Clear passwordInput field
		this._passwordInputEl.value = '';

		// Error messages/UI
		this._passwordInputBox.classList.add('authenticationFailed');
		this._tooltipMessage.innerText = 'Authentication failed!';
		this._tooltipMessage.classList.add('tooltipError');
	}

	// Remove authentication failure messages
	_authenticationFailedRemove() {
		// Remove warnings and tooltip
		if (this._passwordInputBox.classList.contains('authenticationFailed') &&
				this._tooltipMessage.classList.contains('tooltipError')) {
			setTimeout(
				() => {
					this._tooltipMessage.classList.remove('tooltipError');
					this._passwordInputBox.classList.remove('authenticationFailed');
				},
				1500
			);
		}
	}

	// Timer expired, create new authentication session
	_autologinTimerExpired() {
		window.autologin_timer_expired = () => {
			this.startAuthentication();
		};
	}

	// Authentication completed callback
	_authenticationComplete() {
		window.authentication_complete = () => {
			if (lightdm.is_authenticated) {
				// Rotate profile picture
				profilePictureRotate.rotateProfilePicture();

				// Add a delay before unlocking
				setTimeout(
					() => {
						lightdm.start_session_sync(sessionsScreen.getDefaultSession());
					},
					750
				);
			} else {
				this._authenticationFailed();
			}
		};
	}

	// Authenticate on button click
	_authenticateButtonOnClickEvent() {
		this._authenticateButton.onclick = e => {
			// Save input value to variable
			this._password = this._passwordInputEl.value;
			if (this._password.length < 1) {
				return;
			}
			// Prevent login spamming
			if (profilePictureRotate.getProfileAnimationStatus()) return;
			// Rotate profile picture
			profilePictureRotate.rotateProfilePicture();
			
			// Validation
			lightdm.respond(String(this._password));
		}
	}

	// Register keydown event
	_passwordInputOnKeyDownEvent() {
		this._passwordInputEl.onkeydown = (e) => {

			// Remove wrong password's warnings and tooltip
			this._authenticationFailedRemove();

			// Save input value to variable
			this._password = this._passwordInputEl.value;

			if (e.key === 'Enter') {
				if (this._password.length < 1) {
					return;
				}
				// Prevent login spamming
				if (profilePictureRotate.getProfileAnimationStatus()) return;
				// Rotate profile picture
				profilePictureRotate.rotateProfilePicture();
				
				// Validate
				lightdm.respond(String(this._password));
			}
		};
	}
}

