let ran = false;

async function initGreeter() {
  if (ran) return;
  ran = true;

  if (greeter_config.greeter.debug_mode) {
    // Instantiate debug mode
    // Comment this line to let lightdm do its own things
    debug = new Debug();
  }

	lightdm.authentication_complete?.connect( () => authentication_complete() );

  lightdm.show_prompt?.connect( (prompt, type) => {
    console.log("PROMPT!");
    console.log(prompt, type);
  } );

  lightdm.show_message?.connect( (msg, type) => {
    console.log("MESSAGE!");
    console.log(msg, type);
  } );

  // Instantiate image profile
  userProfile = new UserProfile();

  // Instantiate greeter screen
  greeterScreen = new GreeterScreen();

  // Instantiate dark screen
  loginFade = new LoginFade();

  // Instantiate goodbye screen
  goodbye = new Goodbye();

  // Instantiate accounts settings
  accounts = new Accounts();

  // Instantiate sessions settings
  sessions = new Sessions();

  // Instantiate power settings
  power = new Power();

  // Instantiate sidebar
  sidebar = new Sidebar();

  // Instantiate main screen buttons
  mainScreenButtons = new MainScreenButtons();

  // Instantiate date time
  dateTime = new DateTime();

  // Instantiate backgrounds settings
  backgrounds = new Backgrounds();
  await backgrounds._init();

  // Instantiate sidebar navigation
  sidebarNavigate = new SidebarNavigate();

  // Instantiate key binds
  keyBinds = new KeyBinds();

  // Instantiate themes
  themes = new Themes();

  // Instantiate key events
  keyEvents = new KeyEvents();

  // Instantiate swipe event callbacks
  swipeEventCallback = new SwipeEventCallback();

  // Instantiate authentication
  authenticate = new Authenticate();

 }

window.addEventListener("GreeterReady", initGreeter)

const greeterReady = new Event("GreeterReady");

setTimeout(() => {
  if (!("lightdm" in window)) debug = new Debug();
  window.dispatchEvent(greeterReady);
}, 1000)
