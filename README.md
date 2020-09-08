## The glorious lightdm webkit2 theme

[![maintained](https://img.shields.io/maintenance/yes/2020?label=maintained&style=flat-square)](https://github.com/manilarome/the-glorious-lightdm-webkit2-theme/commits/master) [![contributions](https://img.shields.io/badge/contribution-welcome-brightgreen&?style=flat-square)](https://github.com/manilarome/the-glorious-lightdm-webkit2-theme/pulls) [![HitCount](http://hits.dwyl.com/manilarome/the-glorious-lightdm-webkit2-theme.svg)](http://hits.dwyl.com/manilarome/the-glorious-lightdm-webkit2-theme) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/0812167ef9954b74ac23f7c1bfeb3764)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=manilarome/the-glorious-lightdm-webkit2-theme&amp;utm_campaign=Badge_Grade)

A sleek, modern, and glorified lightdm webkit2 theme

## [Live Demo](https://manilarome.github.io/lightdm-webkit2-theme-glorious)
#### Demo password: `toor`

### Gallery

<p align='center'><img alt='glorious' src='glorious.gif'/><br/><i>glorious - a lightdm webkit 2 theme</i></p>


### Dependencies

Please make sure you don't have an ancient version of these.

+ lightdm
+ lightdm-webkit2-greeter
+ an environment, a desktop environment or a window manager

### Installation

0. If you're using `systemd`, make sure that `lightdm.service` or `lightdm-plymouth.service` is enabled and running. There's a bunch of guides on the internet. [Archwiki](https://wiki.archlinux.org/index.php/LightDM) is recommended.

1. Get the theme by cloning it or by installing it from `AUR`.

+ **If you're using Archlinux**, you can install it using `makepkg` or by using an `AUR helper` like `yay`.

	```
	$ yay -S lightdm-webkit2-theme-glorious
	```
+ Clone the repository, then copy it to the `lightdm-webkit`'s `theme` folder.

	```
	$ git clone --depth 1 https://github.com/manilarome/lightdm-webkit2-theme-glorious
	# cp lightdm-webkit2-theme-glorious /usr/share/lightdm-webkit/themes/glorious -r
	```

3. Set lightdm greeter session to webkit2.

	```
	$ sudoedit /etc/lightdm/lightdm.conf
	# Find `greeter-session` under the `[Seat:*]` section, uncomment it, then set its value to `lightdm-webkit2-greeter`.
	```

4. Set it as the lightdm webkit2 theme then enable `debug_mode` by setting it to `true`. Why do we need to enable it, you say? Sometimes you will be greeted by an error. And this error is due to a race condition where the theme is trying to access the `lightdm` object even though it doesn't exist *yet*. Debug mode will allow you to `right-click` and `reload` the greeter just like a webpage.

	```
	$ sudoedit /etc/lightdm/lightdm-webkit2-greeter.conf
	# Find `webkit_theme` then set its value to `glorious`.
	# Find `debug-mode` then set it to true.
	# If you encountered an error, right-click then reload.
	```

### Features

+ Multi-user support
+ Customization and Settings
+ Keyboard navigation
+ Remappable keybindings
+ Swipe gestures
+ Vanilla Javascript!

### Swipe gestures

Why do we have this? Linux can be installed on almost anything. Yes, even on a potato. So it exists to save myself some time if someone including myself decided to use this theme on a touch screen device.

+ Swiping up on the greeter screen will close it.
+ Swiping down on the login screen will open the greeter screen.
+ Swiping left will open the dashboard.
+ Swiping right will close the dashboard.

### Keybinds

The default modifier is <kbd>Alt</kbd> and you can change it in the settings.

+ <kbd>Modifier + s</kbd> opens the dashboard.
+ <kbd>Modifier + e</kbd> opens the session selection.
+ <kbd>Modifier + x</kbd> opens the power selection.
+ <kbd>Modifier + y</kbd> opens the account selection.
+ <kbd>Escape</kbd> to close or go back.

### Customization and Settings

+ Color settings supports `#RGB`, `#RRGGBB`, and `#RRGGBBAA`.
+ Blur strength settings only allows integer with `px` suffix.
+ Animation speed supports `s` and `ms`.
+ Background image selection. Selection supports randomness.

### Changing clock mode

There are two clock modes available - `24-hour` and `12-hour`. Switch between clock modes by just clicking on the clock. Simple.

### Notes

+ You can add more background images by putting your wallpapers/images in `/usr/share/backgrounds/`.
+ Make sure that you only have image files and directories inside `/usr/share/backgrounds/` or it will cause an error!
+ If you're on a desktop environment like KDE Plasma and GNOME3, you can set your profile picture and real name in the settings. While if you're on a more minimal environment like window managers, you can install and use the program called `mugshot`.
+ If your desktop environment or window manager's logo is not in the sessions screen, feel free to submit a [pull request](https://github.com/manilarome/lightdm-webkit2-theme-glorious/pulls)!
+ Translations are not yet supported, PR's are welcome!

### Credits

<span>Background image by <a href="https://unsplash.com/@korpa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Jr Korpa</a> on <a href="https://unsplash.com/s/photos/cherry-blossoms-purple?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
