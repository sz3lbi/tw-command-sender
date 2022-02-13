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

## Translations

Currently the script supports only the English language.

## Plans for the future

1. Add possibility to change the attack arrival time after the confirmation.
2. Add multiple language versions.
