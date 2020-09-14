class Accounts {
	constructor() {
		this._localStorage = window.localStorage;
		this._imageProfile = document.querySelector('#image-profile');
		this._imageUserProfile = document.querySelector('#user-profile-image');
		this._labelUserName = document.querySelector('#label-user-name');
		this._accountsList = document.querySelector('#accounts-list.sidebar-settings-item-list');
		this._inputPassword = document.querySelector('#input-password');
		this._usersObject = null;
		this._defaultUserItem = null;
		this._defaultUser = null;
		this._defaultUserDisplayName = null;
		this._defaultUserProfileImage = null;
		this._defaultUserProfileImageFallback = null;
		this._init();
	}

	getDefaultUserName() {
		return this._defaultUser;
	}

	_setUserImageProfile(path, fallback) {
		this._imageProfile.src = path;
		this._imageUserProfile.src = path;
		this._imageProfile.onerror = function() {
			this.src = fallback;
		};
		this._imageUserProfile.onerror = function() {
			this.src = fallback;
		};
	}

	_setUserNameLabel(name) {
		this._labelUserName.innerText = name;
	}

	_updateAccountDefault(button) {
		if (this._defaultUserItem) {
			this._defaultUserItem.classList.remove('button-default-selected');
		}
		this._defaultUserItem = button;
		button.classList.add('button-default-selected');
	}

	_updateUserProfileDefaults(userObject) {
		this._defaultUser = userObject.userName;
		this._defaultUserDisplayName = userObject.displayName;
		this._defaultUserProfileImage = userObject.profileImage;
		this._defaultUserProfileImageFallback = userObject.profileImageFallBack;
		this._localStorage.setItem('defaultUser', this._defaultUser);
		this._localStorage.setItem('defaultUserDisplayName', this._defaultUserDisplayName);
		this._localStorage.setItem('defaultUserProfileImage', this._defaultUserProfileImage);
		this._localStorage.setItem('defaultUserProfileImageFallback', this._defaultUserProfileImageFallback);
	}

	_userItemCreateClickEvent(userObject) {
		userObject.button.addEventListener(
			'click',
			() => {
				this._updateUserProfileDefaults(userObject);
				this._inputPassword.value = '';
				authenticate.startAuthentication();
				this._updateAccountDefault(userObject.button);
				this._setUserImageProfile(userObject.profileImage, userObject.profileImageFallBack);
				this._setUserNameLabel(userObject.displayName);
				userProfile.rotateProfilePicture();
			}
		);
	}

	_setAccountDefaultOnStartUpFallback() {
		this._defaultUser = this._usersObject[parseInt(0, 10)].username;
		this._defaultUserDisplayName = this._usersObject[parseInt(0, 10)].display_name;
		this._defaultUserProfileImage =  this._usersObject[parseInt(0, 10)].image;
		this._defaultUserProfileImageFallback = 'assets/profiles/user.svg';
		const userDefault = {
			'userName': this._defaultUser,
			'displayName': this._defaultUserDisplayName,
			'profileImage': this._defaultUserProfileImage,
			'profileImageFallBack': this._defaultUserProfileImageFallback
		};
		this._updateUserProfileDefaults(userDefault);
	}	

	_setAccountDefaultOnStartUp() {
		let defaultAccountItem = document.querySelector(`#button-accounts-item-${this._defaultUser}`);
		if (!defaultAccountItem) {
			// If the should've been default user does not exist
			defaultAccountItem = document.querySelector(`#button-accounts-item-${this._usersObject[parseInt(0, 10)].username}`);
			this._setAccountDefaultOnStartUpFallback();
		}
		this._setUserImageProfile(this._defaultUserProfileImage, this._defaultUserProfileImageFallback);
		this._setUserNameLabel(this._defaultUserDisplayName);
		this._updateAccountDefault(defaultAccountItem);
	}

	_updateProfileVariablesOnStartUp() {
		this._defaultUser = this._localStorage.getItem('defaultUser') ||
			this._usersObject[0].username;
		this._defaultUserDisplayName = this._localStorage.getItem('defaultUserDisplayName') ||
			this._usersObject[0].display_name;
		this._defaultUserProfileImage = this._localStorage.getItem('defaultUserProfileImage') ||
			this._usersObject[0].image;
		this._defaultUserProfileImageFallback = this._localStorage.getItem('defaultUserProfileImageFallback') ||
			'assets/profiles/user.svg';
		this._setAccountDefaultOnStartUp();
	}

	_populateAccountsList() {
		for (let i = 0; i < this._usersObject.length; i++){
			let userObject = {
				'button': document.createElement('button'),
				'userName': this._usersObject[parseInt(i, 10)].username,
				'displayName': this._usersObject[parseInt(i, 10)].display_name,
				'profileImage': this._usersObject[parseInt(i, 10)].image,
				'profileImageFallBack': 'assets/profiles/user.svg'
			};

			let userItemButton = userObject.button;
			let userName = userObject.userName;
			let userDisplayName = userObject.displayName;
			let userProfileImage = userObject.profileImage;
			let userProfileImageFallBack = userObject.profileImageFallBack;
			userItemButton.className = 'button-sidebar-list-item';
			userItemButton.id = `button-accounts-item-${userName}`;
			userItemButton.insertAdjacentHTML(
				'beforeend',
				`
				<div class='button-sidebar-item-image-parent' id='button-accounts-item-image-parent'>
					<img class='button-sidebar-item-image' id='button-accounts-item-image' draggable='false' src='${userProfileImage}' 
					onerror='this.src="${userProfileImageFallBack}"'></img>
				</div>
				<div class='button-sidebar-item-name' id='button-accounts-item-name'>${userDisplayName}</div>
				`
			);
			let listItem = document.createElement('li');
			this._userItemCreateClickEvent(userObject);
			listItem.appendChild(userItemButton);
			this._accountsList.appendChild(listItem);
		}
		this._updateProfileVariablesOnStartUp();
	}

	_init() {
		if (!lightdm) {
			lightdm.onload = function() {
				this._usersObject = lightdm.users;
				this._populateAccountsList();
			};
		} else {
			this._usersObject = lightdm.users;
			this._populateAccountsList();
		}
	}
}
