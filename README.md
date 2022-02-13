# Tribal Wars Command Sender

Automatic command sender for the Tribal Wars game.  
You specify the arrival time, as well as the offset and an attack is sent automatically.

The script has been written in the TypeScript language and is compiled to the JavaScript language (ES5) with suitable UserScript headers using webpack.

## Installation

### Tampermonkey

Install the Tampermonkey browser extension from the following link:  
[Tampermonkey.net](https://www.tampermonkey.net/)

The webpage should automatically detect which browser you use and display suitable version of the extension.

### The script

After installation of the Tampermonkey, go to [the script file](https://raw.githubusercontent.com/sz3lbi/tw-command-sender/master/userscript/tw-command-sender.user.js). The Tampermonkey will detect that you opened the `*.user.js` file and will open the tab where you can install the script.

If nothing happens, you can click on the Tampermonkey icon in your browser bar, then "Create a new script" and replace the whole content of the new opened window with the one you copy from the `*.user.js` file.  
Remember to save the script. Then you can close the tab.

After installation of the script, you should click on the Tampermonkey icon in your browser bar, then "Dashboard" and the name of the script installed which is `tw-command-sender`. Switch from the "Editor" tab to the "Settings" one and **be sure to check the "Check for updates" checkbox** in the "Updates" section. If you don't do that, your script will not update to the latest version when it's released! Remember to click the "Save" button below before you close the tab.

## Translations

Currently the script supports only the English language.

## Plans for the future

1. Add possibility to change the attack arrival time after the confirmation.
2. Add multiple language versions.
