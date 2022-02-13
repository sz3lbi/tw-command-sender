// ==UserScript==
// @name tw-command-sender
// @version 1.0.0
// @description Automatic command sender for the Tribal Wars game
// @author szelbi
// @homepage https://github.com/sz3lbi/tw-command-sender
// @match */game.php*
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
window.addEventListener("load", function () {
    var url = window.location.href;
    var urlRegex = /^.*:\/\/.*\/game\.php.*screen=place.*try=confirm.*$/;
    if (urlRegex.test(url)) {
        CommandSender.init();
        CommandSender.addFooter();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHctY29tbWFuZC1zZW5kZXIudXNlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3LWNvbW1hbmQtc2VuZGVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbW1hbmRTZW5kZXIgPSB7XG4gICAgcHJlZml4OiBcImNvbW1hbmRfc2VuZGVyXCIsXG4gICAgaW5pdDogZnVuY3Rpb24gKHByZWZpeCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAocHJlZml4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMucHJlZml4ID0gcHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb21tYW5kRGF0YUZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVtpZD0nY29tbWFuZC1kYXRhLWZvcm0nXVwiKTtcbiAgICAgICAgaWYgKCFjb21tYW5kRGF0YUZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0ZVRpbWVJbnB1dCA9IHRoaXMuY3JlYXRlRGF0ZVRpbWVJbnB1dCgpO1xuICAgICAgICB2YXIgb2Zmc2V0SW5wdXQgPSB0aGlzLmNyZWF0ZU9mZnNldElucHV0KCk7XG4gICAgICAgIHZhciBjb25maXJtU2V0dGluZ3NCdXR0b24gPSB0aGlzLmNyZWF0ZUNvbmZpcm1CdXR0b24oKTtcbiAgICAgICAgdmFyIG1haW5EaXYgPSB0aGlzLmNyZWF0ZU1haW5EaXYoZGF0ZVRpbWVJbnB1dCwgb2Zmc2V0SW5wdXQsIGNvbmZpcm1TZXR0aW5nc0J1dHRvbik7XG4gICAgICAgIGNvbW1hbmREYXRhRm9ybS5wcmVwZW5kKG1haW5EaXYpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKGRhdGVUaW1lSW5wdXQpO1xuICAgICAgICB0aGlzLnNldE9mZnNldChvZmZzZXRJbnB1dCk7XG4gICAgICAgIHZhciBjb25maXJtQnV0dG9uID0gY29tbWFuZERhdGFGb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtpZD0ndHJvb3BfY29uZmlybV9zdWJtaXQnXVwiKTtcbiAgICAgICAgaWYgKCFjb25maXJtQnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uZmlybVNldHRpbmdzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXR0YWNrVGltZSA9IF90aGlzLmdldERhdGVPYmplY3QoZGF0ZVRpbWVJbnB1dC52YWx1ZSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIG9mZnNldFZhbHVlID0gTnVtYmVyKG9mZnNldElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG9mZnNldElucHV0LmlkLCBvZmZzZXRWYWx1ZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcImJ0bi1kaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb25maXJtQnV0dG9uIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbi5jbGljaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGF0dGFja1RpbWUgLSB3aW5kb3cudW5zYWZlV2luZG93LlRpbWluZy5nZXRDdXJyZW50U2VydmVyVGltZSgpICsgb2Zmc2V0VmFsdWUpO1xuICAgICAgICAgICAgY29uZmlybVNldHRpbmdzQnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVEYXRlVGltZUlucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkYXRldGltZUlucHV0SWQgPSBcIlwiLmNvbmNhdCh0aGlzLnByZWZpeCwgXCJfZGF0ZXRpbWVcIik7XG4gICAgICAgIHZhciBkYXRldGltZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBkYXRldGltZUlucHV0LmlkID0gZGF0ZXRpbWVJbnB1dElkO1xuICAgICAgICBkYXRldGltZUlucHV0LnR5cGUgPSBcImRhdGV0aW1lLWxvY2FsXCI7XG4gICAgICAgIGRhdGV0aW1lSW5wdXQuc3RlcCA9IFwiLjAwMVwiO1xuICAgICAgICByZXR1cm4gZGF0ZXRpbWVJbnB1dDtcbiAgICB9LFxuICAgIGNyZWF0ZU9mZnNldElucHV0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBvZmZzZXRJbnB1dElkID0gXCJcIi5jb25jYXQodGhpcy5wcmVmaXgsIFwiX29mZnNldFwiKTtcbiAgICAgICAgdmFyIG9mZnNldElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBvZmZzZXRJbnB1dC5pZCA9IG9mZnNldElucHV0SWQ7XG4gICAgICAgIG9mZnNldElucHV0LnR5cGUgPSBcIm51bWJlclwiO1xuICAgICAgICByZXR1cm4gb2Zmc2V0SW5wdXQ7XG4gICAgfSxcbiAgICBjcmVhdGVDb25maXJtQnV0dG9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjb25maXJtU2V0dGluZ3NCdXR0b25JZCA9IFwiXCIuY29uY2F0KHRoaXMucHJlZml4LCBcIl9jb25maXJtXCIpO1xuICAgICAgICB2YXIgY29uZmlybVNldHRpbmdzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICBjb25maXJtU2V0dGluZ3NCdXR0b24uaWQgPSBjb25maXJtU2V0dGluZ3NCdXR0b25JZDtcbiAgICAgICAgY29uZmlybVNldHRpbmdzQnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICBjb25maXJtU2V0dGluZ3NCdXR0b24udmFsdWUgPSBcIkNvbmZpcm0gc2V0dGluZ3NcIjtcbiAgICAgICAgcmV0dXJuIGNvbmZpcm1TZXR0aW5nc0J1dHRvbjtcbiAgICB9LFxuICAgIGNyZWF0ZU1haW5EaXY6IGZ1bmN0aW9uIChkYXRlVGltZUlucHV0LCBvZmZzZXRJbnB1dCwgY29uZmlybUJ1dHRvbikge1xuICAgICAgICB2YXIgbWFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHZhciBkYXRldGltZUlucHV0SWQgPSBkYXRlVGltZUlucHV0LmlkO1xuICAgICAgICBpZiAoZGF0ZXRpbWVJbnB1dElkKSB7XG4gICAgICAgICAgICB2YXIgZGF0ZXRpbWVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgIGRhdGV0aW1lTGFiZWwuaHRtbEZvciA9IGRhdGV0aW1lSW5wdXRJZDtcbiAgICAgICAgICAgIGRhdGV0aW1lTGFiZWwudGV4dENvbnRlbnQgPSBcIkFycml2YWwgdGltZTogXCI7XG4gICAgICAgICAgICBtYWluRGl2LmFwcGVuZChkYXRldGltZUxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBtYWluRGl2LmFwcGVuZChkYXRlVGltZUlucHV0KTtcbiAgICAgICAgbWFpbkRpdi5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgdmFyIG9mZnNldElucHV0SWQgPSBvZmZzZXRJbnB1dC5pZDtcbiAgICAgICAgaWYgKG9mZnNldElucHV0SWQpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgIG9mZnNldExhYmVsLmh0bWxGb3IgPSBvZmZzZXRJbnB1dElkO1xuICAgICAgICAgICAgb2Zmc2V0TGFiZWwudGV4dENvbnRlbnQgPSBcIk9mZnNldCAobXMpOiBcIjtcbiAgICAgICAgICAgIG1haW5EaXYuYXBwZW5kKG9mZnNldExhYmVsKTtcbiAgICAgICAgfVxuICAgICAgICBtYWluRGl2LmFwcGVuZChvZmZzZXRJbnB1dCk7XG4gICAgICAgIG1haW5EaXYuYXBwZW5kKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIG1haW5EaXYuYXBwZW5kKGNvbmZpcm1CdXR0b24pO1xuICAgICAgICByZXR1cm4gbWFpbkRpdjtcbiAgICB9LFxuICAgIHNldERhdGVUaW1lOiBmdW5jdGlvbiAoZGF0ZVRpbWVJbnB1dCkge1xuICAgICAgICBkYXRlVGltZUlucHV0LnZhbHVlID0gdGhpcy5nZXREYXRlVGltZVN0cmluZyhuZXcgRGF0ZSgpKTtcbiAgICB9LFxuICAgIHNldE9mZnNldDogZnVuY3Rpb24gKG9mZnNldElucHV0KSB7XG4gICAgICAgIHZhciBvZmZzZXRJbnB1dElkID0gb2Zmc2V0SW5wdXQuaWQ7XG4gICAgICAgIGlmICghb2Zmc2V0SW5wdXRJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvZmZzZXRWYWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKG9mZnNldElucHV0SWQpIHx8IFwiLTI1MFwiO1xuICAgICAgICBvZmZzZXRJbnB1dC52YWx1ZSA9IG9mZnNldFZhbHVlO1xuICAgIH0sXG4gICAgZ2V0RGF0ZVRpbWVTdHJpbmc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSAtIGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDZlNClcbiAgICAgICAgICAgIC50b0lTT1N0cmluZygpXG4gICAgICAgICAgICAuc2xpY2UoMCwgLTEpO1xuICAgIH0sXG4gICAgZ2V0RGF0ZU9iamVjdDogZnVuY3Rpb24gKGRhdGVUaW1lTG9jYWxWYWx1ZSkge1xuICAgICAgICB2YXIgZmFrZVV0Y1RpbWUgPSBuZXcgRGF0ZShcIlwiLmNvbmNhdChkYXRlVGltZUxvY2FsVmFsdWUsIFwiWlwiKSk7XG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZmFrZVV0Y1RpbWUuZ2V0VGltZSgpICsgZmFrZVV0Y1RpbWUuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDZlNCk7XG4gICAgICAgIHJldHVybiBkYXRlO1xuICAgIH0sXG4gICAgYWRkRm9vdGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZXJ2ZXJJbmZvUGFyYWdyYXBoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInBbY2xhc3M9J3NlcnZlcl9pbmZvJ11cIik7XG4gICAgICAgIHZhciBmb290ZXJTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGZvb3RlclNwYW4uc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgdmFyIGZvb3Rlck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYlwiKTtcbiAgICAgICAgZm9vdGVyTmFtZS50ZXh0Q29udGVudCA9IFwidHctY29tbWFuZC1zZW5kZXJcIjtcbiAgICAgICAgdmFyIGZvb3RlclVybCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICBmb290ZXJVcmwudGV4dENvbnRlbnQgPSBcInN6ZWxiaS5vdmhcIjtcbiAgICAgICAgZm9vdGVyVXJsLmhyZWYgPSBcImh0dHBzOi8vc3plbGJpLm92aC9cIjtcbiAgICAgICAgZm9vdGVyVXJsLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgICAgIGZvb3RlclNwYW4uaW5uZXJIVE1MID0gXCJcIi5jb25jYXQoZm9vdGVyTmFtZS5vdXRlckhUTUwsIFwiIGJ5IHN6ZWxiaSAoXCIpLmNvbmNhdChmb290ZXJVcmwub3V0ZXJIVE1MLCBcIilcIik7XG4gICAgICAgIHNlcnZlckluZm9QYXJhZ3JhcGggPT09IG51bGwgfHwgc2VydmVySW5mb1BhcmFncmFwaCA9PT0gdm9pZCAwID8gdm9pZCAwIDogc2VydmVySW5mb1BhcmFncmFwaC5wcmVwZW5kKGZvb3RlclNwYW4pO1xuICAgIH0sXG59O1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgdmFyIHVybFJlZ2V4ID0gL14uKjpcXC9cXC8uKlxcL2dhbWVcXC5waHAuKnNjcmVlbj1wbGFjZS4qdHJ5PWNvbmZpcm0uKiQvO1xuICAgIGlmICh1cmxSZWdleC50ZXN0KHVybCkpIHtcbiAgICAgICAgQ29tbWFuZFNlbmRlci5pbml0KCk7XG4gICAgICAgIENvbW1hbmRTZW5kZXIuYWRkRm9vdGVyKCk7XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=