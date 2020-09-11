class Debug {
	constructor() {
		this._debugModePass = 'toor';
		this._loadDebugObjects();
	}

	_loadDebugObjects() {
		if (!window.config) {
			window.config = {};
			window.config.get_str = function() {
				return '/usr/share/lightdm-webkit/themes/lightdm-webkit2-theme-glorious/assets/';
			};
		}

		if (!window.greeterutil) {
			window.greeterutil = {};
			window.greeterutil.dirlist = function(path) {
				return false;
			};
		}

		if (!window.lightdm) {
			window.lightdm = {
				is_authenticated: false,
				authentication_user: null,
				default_session: 'awesome',
				can_suspend: true,
				can_hibernate: true,
				can_shutdown: true,
				can_restart: true,
				sessions: [
					{
						name: 'awesome wm',
						key: 'awesome'
					},
					{
						name: 'bspwm',
						key: 'bspwm'
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
					},
					{
						name: 'Deepin',
						key: 'deepin'
					},
					{
						name: 'Budgie',
						key: 'budgie'
					}
				],
				users: [
					{
						display_name: 'Yasuho Hirose',
						username: 'bestgirl',
						image: 'assets/profiles/yasuhoh.jpg'
					},
					{
						display_name: 'Josuke Higashikata',
						username: '4balls',
						image: 'assets/profiles/josukeh.jpg'
					},
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
						username: 'diosaur',
						image: 'assets/profiles/diegob.jpg'
					},
					{
						display_name: 'Funny Valentine',
						username: 'napkinwiper',
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
				authenticate: username => {
					console.log(`Starting authenticating user: '${username}'`);
				},
				cancel_authentication: () => {
					console.log('Auth cancelled');
				},
				respond: password => {
					console.log(`Password provided: '${password}'`);
					if (password === this._debugModePass) {
						lightdm.is_authenticated = true;
					}
					else {
						let now = new Date().getTime();
						while (new Date().getTime() < now + 2000);
					}
					authentication_complete();
				},
				start_session_sync: session => {
					alert(`Logged with session: '${session}'!`);
					location.reload(); 
				},
				shutdown: () => {
					alert('System is shutting down...');
					location.reload(); 
				},
				restart: () => {
					alert('System is rebooting...');
					location.reload(); 
				},
				hibernate: () => {
					alert('System is hibernating...');
				},
				suspend: () => {
					alert('System is suspending...');
				}
			};
		}
	}
}
