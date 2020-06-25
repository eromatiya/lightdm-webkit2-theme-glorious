class DebugMode {
	constructor() {
		this._debugModePass = 'toor';
		this._debugModeProc();
	}

	_debugModeProc() {
		window.lightdmDebugMode = typeof window.lightdm === 'undefined';
		if (window.lightdmDebugMode) {
			window.lightdm = {
				is_authenticated: false,
				authentication_user: null,
				default_session: 'awesome',
				can_suspend: true,
				can_hibernate: true,
				sessions: [
					{
						name: 'awesome wm',
						key: 'awesome'
					},
					{
						name: 'KDE Plasma',
						key: 'plasma'
					},
					{
						name: 'Gnome 3',
						key: 'gnome'
					},
					{
						name: 'XFCE 4',
						key: 'xfce'
					},
					{
						name: 'Cinnamon',
						key: 'cinnamon'
					},
					{
						name: 'i3wm',
						key: 'i3'
					},
					{
						name: 'xmonad',
						key: 'xmonad'
					}
				],
				users: [
					{
						display_name: 'Johnny Joestar',
						username: 'tellhimyourself',
						image: 'assets/profiles/johnnyj.jpg'
					},
					{
						display_name: 'Gyro Zepelli',
						username: 'pizzamozarella',
						image: 'assets/profiles/gyroz.jpg'
					},
					{
						display_name: 'Diego Brando',
						username: 'diodiodio',
						image: 'assets/profiles/diegob.jpg'
					},
					{
						display_name: 'Funny Valentine',
						username: 'reasonableprice',
						image: 'assets/profiles/funnyv.jpg'
					}
				],
				languages: [
					{
						name: 'American English',
						code: 'en_US.utf8'
					}
				],
				language: 'American English',
				authenticate: (username) => {
					console.log(`Starting authenticating user: '${username}'`);
				},
				cancel_authentication: () => {
					console.log('Auth cancelled');
				},
				respond: (password) => {
					console.log(`Password provided: '${password}'`);
					if (password === this._debugModePass)
					{
						lightdm.is_authenticated = true;
					}
					else
					{
						let now = new Date().getTime();
						while (new Date().getTime() < now + 2000);
					}
					authentication_complete();
				},
				start_session_sync: (session) => {
					alert(`Logged with session: '${session}'!`);
				},
				shutdown: () => {
					alert('System is shutting down...');
				},
				hibernate: () => {
					alert('System is hibernating...');
				},
				suspend: () => {
					alert('System is suspending...');
				},
				restart: () => {
					alert('System is rebooting...');
				}
			};
		}
	}
}

const debugMode = new DebugMode();

// Instantiation

// Instantiate profile picture animations
const profilePictureRotate = new ProfilePictureRotate();

// Instantiate greeter screen
const greeterScreen = new GreeterScreen();

// Instantiate greeter screen contents
const greeterScreenContent = new GreeterScreenContent();

// Instantiate power buttons
const powerButtons = new PowerButtons();

// Instantiate user screen
const usersScreen = new UsersScreen();

// Instantiate goodbye screen
const goodbyeScreen = new GoodbyeScreen();

// Instantiate sessions screen
const sessionsScreen = new SessionsScreen();

// Instantiate key events
const keyEvents = new KeyEvents();

// Instantiate mouse events and callbacks
const mouseSwipeEventCallback = new MouseSwipeEventCallback();

// Instantiate authentication
const authentication = new Authentication();
