class UsersScreen {
	constructor() {
		this._localStorage = window.localStorage;

		this._usersScreen = document.querySelector('#usersScreen');
		this._usersList = document.querySelector('.usersList');
		this._userNameLabel = document.querySelector('#userName');
		this._profilePictureContainer = document.querySelector('#profilePictureContainer');
		this._profilePicture = document.querySelector('#profilePicture');
		this._passwordInputEl = document.querySelector('#passwordInput');

		this._userScreenVisible = false;

		this._defaultUser = null;
		this._defaultUserDisplayName = null;
		this._defaultUserProfileImage = null;
		this._defaultUserProfileImageFallback = null;
		this._usersObject = null;
		this._defaultUserItem = null;

		this._init();
	}

	// Start creating Users list, register events
	_init() {
		this.profilePictureContainerOnClickEvent();

		this._updateUsersObject();
	}

	profilePictureContainerOnClickEvent() {
		this._profilePictureContainer.onclick = e => {
			// Rotate profile pic if it's not currently running
			if (profilePictureRotate.getProfileAnimationStatus()) return;
			profilePictureRotate.rotateProfilePicture();

			// Toggle user screen
			this.toggleUsersScreen();
		};
	}

	// Return session screen visibility bool
	// Global
	getUsersScreenVisibility() {
		return this._userScreenVisible;
	}

	// Return user name
	// Global
	getDefaultUserName() {
		return this._defaultUser;
	}

	// Show session screen
	showUsersScreen() {
		this._usersScreen.classList.add('usersScreenShow');
		this._userScreenVisible = true;
	}

	// Hide users screen
	hideUsersScreen() {
		this._usersScreen.classList.remove('usersScreenShow');
		this._userScreenVisible = false;
	}

	// Toggle users screen
	toggleUsersScreen() {
		if (this._userScreenVisible) {
			this.hideUsersScreen();
		} else {
			this.showUsersScreen();
		}
	}

	// Update users list to select default
	_updateUserItemDefault(item) {
		// Unselect the current item as and remove it as default
		if (this._defaultUserItem) {
			this._defaultUserItem.classList.remove('userItemDefault');
		}

		// Update the current item and select it as default
		this._defaultUserItem = item;
		item.classList.add('userItemDefault');
	}

	// Update user profile image
	_setUserProfileImage(path, fallback) {
		// Update this session button image
		this._profilePicture.src = path;
		this._profilePicture.onerror = () => {
			this._profilePicture.src = fallback;
		};
	}

	// Update user name label
	_setUserNameLabel(name) {
		this._userNameLabel.innerText = name;
	}

	// Save user data defaults
	_updateUserProfileDefaults(userProfile) {
		this._defaultUser = userProfile.userName;
		this._defaultUserDisplayName = userProfile.displayName;
		this._defaultUserProfileImage = userProfile.profileImage;
		this._defaultUserProfileImageFallback = userProfile.profileImageFallBack;

		// Save default user on localstorage
		this._localStorage.setItem('defaultUser', this._defaultUser);
		this._localStorage.setItem('defaultUserDisplayName', this._defaultUserDisplayName);
		this._localStorage.setItem('defaultUserProfileImage', this._defaultUserProfileImage);
		this._localStorage.setItem('defaultUserProfileImageFallback', this._defaultUserProfileImageFallback);
	}

	// User item click event
	_userItemOnClickEvent(userProfile) {
		userProfile.item.onclick = e => {
			// Rotate profile pic if it's not currently running
			if (profilePictureRotate.getProfileAnimationStatus()) return;
			profilePictureRotate.rotateProfilePicture();

			// Update user session defaults
			this._updateUserProfileDefaults(userProfile);

			// Clear passwordInput field
			this._passwordInputEl.value = '';

			// Refresh authentication session
			authentication.startAuthentication();

			// Update selected session item
			this._updateUserItemDefault(userProfile.item);

			// Update profile pic and label
			this._setUserProfileImage(userProfile.profileImage, userProfile.profileImageFallBack);
			this._setUserNameLabel(userProfile.displayName);

			// Hide user screen
			this.hideUsersScreen();
		};
	}

	_updateProfileVariablesOnStartUp() {
		this._defaultUser = this._localStorage.getItem('defaultUser');
		this._defaultUserDisplayName = this._localStorage.getItem('defaultUserDisplayName');
		this._defaultUserProfileImage = this._localStorage.getItem('defaultUserProfileImage');
		this._defaultUserProfileImageFallback = this._localStorage.getItem('defaultUserProfileImageFallback');

		if (this._defaultUser === null) {
			this._defaultUser = this._usersObject[0].username;
		}
		if (this._defaultUserDisplayName === null) {
			this._defaultUserDisplayName = this._usersObject[0].display_name;
		}
		if (this._defaultUserProfileImage === null) {
			this._defaultUserProfileImage = this._usersObject[0].image;
		}
		if (this._defaultUserProfileImageFallback === null) {
			this._defaultUserProfileImageFallback = 'assets/profiles/user.svg';
		}
	}

	// Set the default session in list on startup
	_setUsersListDefaultOnStartUp() {
		// Update variable values
		this._updateProfileVariablesOnStartUp();

		// Update profile pic and label
		this._setUserProfileImage(this._defaultUserProfileImage, this._defaultUserProfileImageFallback);
		this._setUserNameLabel(this._defaultUserDisplayName);

		const defaultItemID = this._defaultUser + 'User';
		const defaultUserItem = document.querySelector(`#${defaultItemID}`);
		this._updateUserItemDefault(defaultUserItem);
	}

	_updateUsersObject() {
		this._usersObject = lightdm.users;
		this._createUsersList();
	}

	_createUsersList() {
		// Generate user list
		for (let i = 0; i < this._usersObject.length; i++){

			// Create obj
			let userProfile = {
				'item': document.createElement('button'),
				'userName': this._usersObject[parseInt(i, 10)].username,
				'displayName': this._usersObject[parseInt(i, 10)].display_name,
				'profileImage': this._usersObject[parseInt(i, 10)].image,
				'profileImageFallBack': 'assets/profiles/user.svg'
			};

			// Alias
			let userItem = userProfile.item;
			let userName = userProfile.userName;
			let userDisplayName = userProfile.displayName;
			let userProfileImage = userProfile.profileImage;
			let userProfileImageFallBack = userProfile.profileImageFallBack;

			userItem.className = 'userItem';
			userItem.id = `${userName}User`;

			userItem.insertAdjacentHTML(
				'beforeend',
				`
				<div id='userItemIconContainer'>
					<img id='userItemIcon' draggable='false' src='${userProfileImage}' 
					onerror='this.src="${userProfileImageFallBack}"'></img>
				</div>
				<div id='userItemName'>${userDisplayName}</div>
				`
			);
			
			// Create on click event
			this._userItemOnClickEvent(userProfile);

			// Append to item
			this._usersList.appendChild(userItem);
		}

		// Update default user
		this._setUsersListDefaultOnStartUp();
	}
}
