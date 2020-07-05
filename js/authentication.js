class Authentication {
	constructor() {
		this._userNameEl = document.querySelector('#userName');
		this._passwordInputEl = document.querySelector('#passwordInput');
		this._passwordInputBox = document.querySelector('#passwordInputBox');
		this._tooltipMessage = document.querySelector('#passwordTooltip');
		this._authenticateButton = document.querySelector('#authenticateButton');

		this._userName = '';
		this._password = '';
		this._keysLog = {};

		this._init();
	}

	// Start authenticating and register events
	_init() {
		this._autologinTimerExpired();
		this._authenticationComplete();
		this._passwordInputKeyUpEvent();
		this._passwordInputKeyDownEvent();
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

	_returnRandomErrorMessages() {
		const errorMessages = [
			'Authentication failed!',
			'I am watching you.',
			'I know where you live.',
			'This incident will be reported.',
			'RUN!',
			'Why are you the way that you are?',
			'Yamete, Oniichan~ uwu',
			'This will self-destruct in 5 seconds!',
			'Intruder image successfully sent!',
			'You\'re doomed!',
			'Someone\'s gonna bites za dusto!',
			'“You miss 100% of the shots you don\'t take – Wayne Gretzky – Michael Scott”',
			'Get out of there, it\'s gonna blow!'
		];
		const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
		return randomMessage;
	}

	_returnRandomSuccessfulMessages() {
		const errorMessages = [
			'Authentication success! Logging in!',
			'Logging in! Biatch',
			'Don\'t watch too much porn, bro.',
			'Splish! Splash! Your password is trash!',
			'Looking good today~',
			'What are you doing, stepbro?~',
			'Hey, you matter!',
			'You are someone\'s reason to smile.'
		];
		const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
		return randomMessage;
	}

	// You failed to authenticate
	_authenticationFailed() {
		// New authentication session
		this.startAuthentication();

		// Clear passwordInput field
		this._passwordInputEl.value = '';

		// Error messages/UI
		this._passwordInputBox.classList.add('authenticationFailed');
		this._tooltipMessage.innerText = this._returnRandomErrorMessages();
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

	// You passed to authentication
	_authenticationSuccess() {
		// Rotate profile picture
		profilePictureRotate.rotateProfilePicture();

		// Success messages
		this._passwordInputBox.classList.add('authenticationSuccess');
		this._tooltipMessage.innerText = this._returnRandomSuccessfulMessages();
		this._tooltipMessage.classList.add('tooltipSuccess');

		// Add a delay before unlocking
		setTimeout(
			() => {
				// Remove success messages
				this._passwordInputBox.classList.remove('authenticationSuccess');
				this._tooltipMessage.classList.remove('tooltipSuccess');

				// Login
				lightdm.start_session_sync(sessionsScreen.getDefaultSession());
			},
			1500
		);
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
				this._authenticationSuccess();
			} else {
				this._authenticationFailed();
			}
		};
	}

	// Authenticate on button click
	_authenticateButtonOnClickEvent() {
		this._authenticateButton.addEventListener(
			'click',
			() => {
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
		);
	}

	// Register keyup event
	_passwordInputKeyUpEvent() {
		this._passwordInputEl.addEventListener(
			'keyup',
			e => {
				// Clear input
				if (this._keysLog['Control'] && e.key === 'u') {
					this._passwordInputEl.value = '';
				}
				delete this._keysLog[e.key];
			}
		);
	}

	// Register keydown event
	_passwordInputKeyDownEvent() {
		this._passwordInputEl.addEventListener(
			'keydown',
			e => {
				this._keysLog[e.key] = true;

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
			}
		);
	}
}

