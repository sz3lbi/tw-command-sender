// ==UserScript==
// @name tw-command-sender
// @version 1.1.0
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/// <reference types="./types/tampermonkey" />
Object.defineProperty(exports, "__esModule", ({ value: true }));
var luxon_1 = __webpack_require__(1);
var CommandSender = {
    prefix: "command_sender",
    init: function (prefix) {
        if (prefix !== undefined) {
            this.prefix = prefix;
        }
        var commandDataForm = document.querySelector("form[id='command-data-form']");
        if (!commandDataForm) {
            return;
        }
        var dateTimeInput = this.createDateTimeInput();
        var offsetInput = this.createOffsetInput();
        var confirmSettingsButton = this.createConfirmButton();
        var mainDiv = this.createMainDiv(dateTimeInput, offsetInput, confirmSettingsButton);
        commandDataForm.prepend(mainDiv);
        var timeTypeGroupName = "".concat(this.prefix, "_time_type");
        var timeTypeGroupDiv = this.createTimeTypeRadioGroup(timeTypeGroupName);
        mainDiv.prepend(timeTypeGroupDiv);
        this.setDateTime(dateTimeInput);
        this.setOffset(offsetInput);
        var confirmButton = commandDataForm.querySelector("input[id='troop_confirm_submit']");
        if (!confirmButton) {
            return;
        }
        confirmSettingsButton.addEventListener("click", function () {
            var _a, _b;
            var offsetValue = Number(offsetInput.value);
            localStorage.setItem(offsetInput.id, offsetValue.toString());
            confirmButton.classList.add("btn-disabled");
            var attackDateTime = luxon_1.DateTime.fromISO(dateTimeInput.value);
            var serverDateTime = luxon_1.DateTime.fromMillis(unsafeWindow.Timing.getCurrentServerTime());
            var timeoutDuration = attackDateTime.diff(serverDateTime);
            var offset = luxon_1.Duration.fromMillis(offsetValue);
            timeoutDuration = timeoutDuration.plus(offset);
            var checkedRadio = timeTypeGroupDiv.querySelector("input[type='radio']:checked");
            if ((checkedRadio === null || checkedRadio === void 0 ? void 0 : checkedRadio.id) === "".concat(timeTypeGroupName, "_arrival")) {
                var dateArrivalTd = commandDataForm.querySelector("td[id='date_arrival']");
                var attackDurationTr = (_b = (_a = dateArrivalTd === null || dateArrivalTd === void 0 ? void 0 : dateArrivalTd.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.querySelectorAll("tr")[3];
                var attackDurationTd = attackDurationTr === null || attackDurationTr === void 0 ? void 0 : attackDurationTr.querySelectorAll("td")[1];
                var attackDurationString = attackDurationTd === null || attackDurationTd === void 0 ? void 0 : attackDurationTd.textContent;
                if (!attackDurationString) {
                    return;
                }
                var attackDurationArray = attackDurationString.split(":").map(Number);
                var attackDuration = luxon_1.Duration.fromObject({
                    hours: attackDurationArray[0],
                    minutes: attackDurationArray[1],
                    seconds: attackDurationArray[2],
                });
                timeoutDuration = timeoutDuration.minus(attackDuration.toMillis());
            }
            setTimeout(function () {
                if (confirmButton instanceof HTMLElement) {
                    confirmButton.click();
                }
            }, timeoutDuration.toMillis());
            confirmSettingsButton.disabled = true;
        });
    },
    createTimeTypeRadioGroup: function (groupName) {
        var radioGroupDiv = document.createElement("div");
        radioGroupDiv.textContent = "Which time do you want to specify?";
        radioGroupDiv.append(document.createElement("br"));
        var arrivalTimeRadio = document.createElement("input");
        arrivalTimeRadio.type = "radio";
        arrivalTimeRadio.name = groupName;
        arrivalTimeRadio.id = "".concat(groupName, "_arrival");
        arrivalTimeRadio.checked = true;
        var arrivalTimeLabel = document.createElement("label");
        arrivalTimeLabel.htmlFor = arrivalTimeRadio.id;
        arrivalTimeLabel.textContent = "Arrival time";
        radioGroupDiv.append(arrivalTimeRadio);
        radioGroupDiv.append(arrivalTimeLabel);
        var sendTimeRadio = document.createElement("input");
        sendTimeRadio.type = "radio";
        sendTimeRadio.name = groupName;
        sendTimeRadio.id = "".concat(groupName, "_send");
        var sendTimeLabel = document.createElement("label");
        sendTimeLabel.htmlFor = sendTimeRadio.id;
        sendTimeLabel.textContent = "Send time";
        radioGroupDiv.append(sendTimeRadio);
        radioGroupDiv.append(sendTimeLabel);
        return radioGroupDiv;
    },
    createDateTimeInput: function () {
        var datetimeInputId = "".concat(this.prefix, "_datetime");
        var datetimeInput = document.createElement("input");
        datetimeInput.id = datetimeInputId;
        datetimeInput.type = "datetime-local";
        datetimeInput.step = ".001";
        return datetimeInput;
    },
    createOffsetInput: function () {
        var offsetInputId = "".concat(this.prefix, "_offset");
        var offsetInput = document.createElement("input");
        offsetInput.id = offsetInputId;
        offsetInput.type = "number";
        return offsetInput;
    },
    createConfirmButton: function () {
        var confirmSettingsButtonId = "".concat(this.prefix, "_confirm");
        var confirmSettingsButton = document.createElement("input");
        confirmSettingsButton.id = confirmSettingsButtonId;
        confirmSettingsButton.type = "button";
        confirmSettingsButton.value = "Confirm settings";
        return confirmSettingsButton;
    },
    createMainDiv: function (dateTimeInput, offsetInput, confirmButton) {
        var mainDiv = document.createElement("div");
        mainDiv.id = "".concat(this.prefix, "_main");
        var datetimeInputId = dateTimeInput.id;
        if (datetimeInputId) {
            var datetimeLabel = document.createElement("label");
            datetimeLabel.htmlFor = datetimeInputId;
            datetimeLabel.textContent = "Time: ";
            mainDiv.append(datetimeLabel);
        }
        mainDiv.append(dateTimeInput);
        mainDiv.append(document.createElement("br"));
        var offsetInputId = offsetInput.id;
        if (offsetInputId) {
            var offsetLabel = document.createElement("label");
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
        var now = luxon_1.DateTime.now();
        var isoOptions = { includeOffset: false };
        var iso = now.toISO(isoOptions);
        dateTimeInput.value = iso;
    },
    setOffset: function (offsetInput) {
        var offsetInputId = offsetInput.id;
        if (!offsetInputId) {
            return;
        }
        var offsetValue = localStorage.getItem(offsetInputId) || "-250";
        offsetInput.value = offsetValue;
    },
    addFooter: function () {
        var serverInfoParagraph = document.querySelector("p[class='server_info']");
        var footerSpan = document.createElement("span");
        footerSpan.style.cssFloat = "left";
        var footerName = document.createElement("b");
        footerName.textContent = "tw-command-sender";
        var footerUrl = document.createElement("a");
        footerUrl.textContent = "szelbi.ovh";
        footerUrl.href = "https://szelbi.ovh/";
        footerUrl.target = "_blank";
        footerSpan.innerHTML = "".concat(footerName.outerHTML, " by szelbi (").concat(footerUrl.outerHTML, ")");
        serverInfoParagraph === null || serverInfoParagraph === void 0 ? void 0 : serverInfoParagraph.prepend(footerSpan);
    },
};
var url = window.location.href;
var urlRegex = /^.*:\/\/.*\/game\.php.*screen=place.*try=confirm.*$/;
if (urlRegex.test(url)) {
    CommandSender.init();
    CommandSender.addFooter();
}

})();

/******/ })()
;