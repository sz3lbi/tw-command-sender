// ==UserScript==
// @name tw-command-sender
// @version 1.1.2
// @description Automatic command sender for the Tribal Wars game
// @author szelbi
// @homepage https://github.com/sz3lbi/tw-command-sender
// @updateURL https://raw.githubusercontent.com/sz3lbi/tw-command-sender/master/userscript/tw-command-sender.user.js
// @downloadURL https://raw.githubusercontent.com/sz3lbi/tw-command-sender/master/userscript/tw-command-sender.user.js
// @match *://*/*
// @require https://cdn.jsdelivr.net/npm/luxon@2.3.0
// @grant unsafeWindow
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = luxon;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var luxon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(luxon__WEBPACK_IMPORTED_MODULE_0__);
/// <reference types="./types/tampermonkey" />

const CommandSender = {
    prefix: "command_sender",
    init: function (prefix) {
        if (prefix !== undefined) {
            this.prefix = prefix;
        }
        const commandDataForm = document.querySelector("form[id='command-data-form']");
        if (!commandDataForm) {
            return;
        }
        const dateTimeInput = this.createDateTimeInput();
        const offsetInput = this.createOffsetInput();
        const confirmSettingsButton = this.createConfirmButton();
        const mainDiv = this.createMainDiv(dateTimeInput, offsetInput, confirmSettingsButton);
        commandDataForm.prepend(mainDiv);
        const timeTypeGroupName = `${this.prefix}_time_type`;
        const timeTypeGroupDiv = this.createTimeTypeRadioGroup(timeTypeGroupName);
        mainDiv.prepend(timeTypeGroupDiv);
        this.setDateTime(dateTimeInput);
        this.setOffset(offsetInput);
        const confirmButton = commandDataForm.querySelector("input[id='troop_confirm_submit']");
        if (!confirmButton) {
            return;
        }
        confirmSettingsButton.addEventListener("click", () => {
            const offsetValue = Number(offsetInput.value);
            localStorage.setItem(offsetInput.id, offsetValue.toString());
            confirmButton.classList.add("btn-disabled");
            const attackDateTime = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromISO(dateTimeInput.value);
            const serverDateTime = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.fromMillis(unsafeWindow.Timing.getCurrentServerTime());
            let timeoutDuration = attackDateTime.diff(serverDateTime);
            const offset = luxon__WEBPACK_IMPORTED_MODULE_0__.Duration.fromMillis(offsetValue);
            timeoutDuration = timeoutDuration.plus(offset);
            const checkedRadio = timeTypeGroupDiv.querySelector("input[type='radio']:checked");
            if ((checkedRadio === null || checkedRadio === void 0 ? void 0 : checkedRadio.id) === `${timeTypeGroupName}_arrival`) {
                const closestTbody = commandDataForm.closest("tbody");
                const commandTableTds = closestTbody === null || closestTbody === void 0 ? void 0 : closestTbody.querySelectorAll("td");
                if (!commandTableTds) {
                    return;
                }
                const durationRegex = /^\d+\:\d{1,2}\:\d{1,2}$/;
                const durationMatch = Array.from(commandTableTds).find((td) => { var _a; return durationRegex.test((_a = td.textContent) !== null && _a !== void 0 ? _a : ""); });
                const attackDurationString = durationMatch === null || durationMatch === void 0 ? void 0 : durationMatch.textContent;
                const attackDurationArray = attackDurationString === null || attackDurationString === void 0 ? void 0 : attackDurationString.split(":").map(Number);
                if (!attackDurationArray) {
                    return;
                }
                const attackDuration = luxon__WEBPACK_IMPORTED_MODULE_0__.Duration.fromObject({
                    hours: attackDurationArray[0],
                    minutes: attackDurationArray[1],
                    seconds: attackDurationArray[2],
                });
                timeoutDuration = timeoutDuration.minus(attackDuration.toMillis());
            }
            setTimeout(() => {
                if (confirmButton instanceof HTMLElement) {
                    confirmButton.click();
                }
            }, timeoutDuration.toMillis());
            confirmSettingsButton.disabled = true;
        });
    },
    createTimeTypeRadioGroup: function (groupName) {
        const radioGroupDiv = document.createElement("div");
        radioGroupDiv.textContent = "Which time do you want to specify?";
        radioGroupDiv.append(document.createElement("br"));
        const arrivalTimeRadio = document.createElement("input");
        arrivalTimeRadio.type = "radio";
        arrivalTimeRadio.name = groupName;
        arrivalTimeRadio.id = `${groupName}_arrival`;
        arrivalTimeRadio.checked = true;
        const arrivalTimeLabel = document.createElement("label");
        arrivalTimeLabel.htmlFor = arrivalTimeRadio.id;
        arrivalTimeLabel.textContent = "Arrival time";
        radioGroupDiv.append(arrivalTimeRadio);
        radioGroupDiv.append(arrivalTimeLabel);
        const sendTimeRadio = document.createElement("input");
        sendTimeRadio.type = "radio";
        sendTimeRadio.name = groupName;
        sendTimeRadio.id = `${groupName}_send`;
        const sendTimeLabel = document.createElement("label");
        sendTimeLabel.htmlFor = sendTimeRadio.id;
        sendTimeLabel.textContent = "Send time";
        radioGroupDiv.append(sendTimeRadio);
        radioGroupDiv.append(sendTimeLabel);
        return radioGroupDiv;
    },
    createDateTimeInput: function () {
        const datetimeInputId = `${this.prefix}_datetime`;
        const datetimeInput = document.createElement("input");
        datetimeInput.id = datetimeInputId;
        datetimeInput.type = "datetime-local";
        datetimeInput.step = ".001";
        return datetimeInput;
    },
    createOffsetInput: function () {
        const offsetInputId = `${this.prefix}_offset`;
        const offsetInput = document.createElement("input");
        offsetInput.id = offsetInputId;
        offsetInput.type = "number";
        return offsetInput;
    },
    createConfirmButton: function () {
        const confirmSettingsButtonId = `${this.prefix}_confirm`;
        const confirmSettingsButton = document.createElement("input");
        confirmSettingsButton.id = confirmSettingsButtonId;
        confirmSettingsButton.type = "button";
        confirmSettingsButton.value = "Confirm settings";
        return confirmSettingsButton;
    },
    createMainDiv: function (dateTimeInput, offsetInput, confirmButton) {
        const mainDiv = document.createElement("div");
        mainDiv.id = `${this.prefix}_main`;
        const datetimeInputId = dateTimeInput.id;
        if (datetimeInputId) {
            const datetimeLabel = document.createElement("label");
            datetimeLabel.htmlFor = datetimeInputId;
            datetimeLabel.textContent = "Time: ";
            mainDiv.append(datetimeLabel);
        }
        mainDiv.append(dateTimeInput);
        mainDiv.append(document.createElement("br"));
        const offsetInputId = offsetInput.id;
        if (offsetInputId) {
            const offsetLabel = document.createElement("label");
            offsetLabel.htmlFor = offsetInputId;
            offsetLabel.textContent = "Offset (ms): ";
            mainDiv.append(offsetLabel);
        }
        mainDiv.append(offsetInput);
        mainDiv.append(document.createElement("br"));
        mainDiv.append(confirmButton);
        return mainDiv;
    },
    setDateTime: function (dateTimeInput) {
        const now = luxon__WEBPACK_IMPORTED_MODULE_0__.DateTime.now();
        const isoOptions = { includeOffset: false };
        const iso = now.toISO(isoOptions);
        dateTimeInput.value = iso;
    },
    setOffset: function (offsetInput) {
        const offsetInputId = offsetInput.id;
        if (!offsetInputId) {
            return;
        }
        const offsetValue = localStorage.getItem(offsetInputId) || "-250";
        offsetInput.value = offsetValue;
    },
    addFooter: function () {
        const serverInfoParagraph = document.querySelector("p[class='server_info']");
        const footerSpan = document.createElement("span");
        footerSpan.style.cssFloat = "left";
        const footerName = document.createElement("b");
        footerName.textContent = "tw-command-sender";
        const footerUrl = document.createElement("a");
        footerUrl.textContent = "szelbi.ovh";
        footerUrl.href = "https://szelbi.ovh/";
        footerUrl.target = "_blank";
        footerSpan.innerHTML = `${footerName.outerHTML} by szelbi (${footerUrl.outerHTML})`;
        serverInfoParagraph === null || serverInfoParagraph === void 0 ? void 0 : serverInfoParagraph.prepend(footerSpan);
    },
};
const url = window.location.href;
const urlRegex = /^.*:\/\/.*\/game\.php.*screen=place.*try=confirm.*$/;
if (urlRegex.test(url)) {
    CommandSender.init();
    CommandSender.addFooter();
}

})();

/******/ })()
;