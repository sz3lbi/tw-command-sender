// ==UserScript==
// @name tw-command-sender
// @version 1.0.1
// @description Automatic command sender for the Tribal Wars game
// @author szelbi
// @homepage https://github.com/sz3lbi/tw-command-sender
// @updateURL https://raw.githubusercontent.com/sz3lbi/tw-command-sender/master/userscript/tw-command-sender.user.js
// @downloadURL https://raw.githubusercontent.com/sz3lbi/tw-command-sender/master/userscript/tw-command-sender.user.js
// @match *://*/*
// @grant unsafeWindow
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var CommandSender = {
    prefix: "command_sender",
    init: function (prefix) {
        var _this = this;
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
        this.setDateTime(dateTimeInput);
        this.setOffset(offsetInput);
        var confirmButton = commandDataForm.querySelector("input[id='troop_confirm_submit']");
        if (!confirmButton) {
            return;
        }
        confirmSettingsButton.addEventListener("click", function () {
            var attackTime = _this.getDateObject(dateTimeInput.value).getTime();
            var offsetValue = Number(offsetInput.value);
            localStorage.setItem(offsetInput.id, offsetValue.toString());
            confirmButton.classList.add("btn-disabled");
            setTimeout(function () {
                if (confirmButton instanceof HTMLElement) {
                    confirmButton.click();
                }
            }, attackTime - window.unsafeWindow.Timing.getCurrentServerTime() + offsetValue);
            confirmSettingsButton.disabled = true;
        });
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
        var datetimeInputId = dateTimeInput.id;
        if (datetimeInputId) {
            var datetimeLabel = document.createElement("label");
            datetimeLabel.htmlFor = datetimeInputId;
            datetimeLabel.textContent = "Arrival time: ";
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
        dateTimeInput.value = this.getDateTimeString(new Date());
    },
    setOffset: function (offsetInput) {
        var offsetInputId = offsetInput.id;
        if (!offsetInputId) {
            return;
        }
        var offsetValue = localStorage.getItem(offsetInputId) || "-250";
        offsetInput.value = offsetValue;
    },
    getDateTimeString: function (date) {
        return new Date(date.getTime() - date.getTimezoneOffset() * 6e4)
            .toISOString()
            .slice(0, -1);
    },
    getDateObject: function (dateTimeLocalValue) {
        var fakeUtcTime = new Date("".concat(dateTimeLocalValue, "Z"));
        var date = new Date(fakeUtcTime.getTime() + fakeUtcTime.getTimezoneOffset() * 6e4);
        return date;
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