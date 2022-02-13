// ==UserScript==
// @name tw-command-sender
// @version 1.0.0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHctY29tbWFuZC1zZW5kZXIudXNlci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHctY29tbWFuZC1zZW5kZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ29tbWFuZFNlbmRlciA9IHtcbiAgICBwcmVmaXg6IFwiY29tbWFuZF9zZW5kZXJcIixcbiAgICBpbml0OiBmdW5jdGlvbiAocHJlZml4KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChwcmVmaXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wcmVmaXggPSBwcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbW1hbmREYXRhRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJmb3JtW2lkPSdjb21tYW5kLWRhdGEtZm9ybSddXCIpO1xuICAgICAgICBpZiAoIWNvbW1hbmREYXRhRm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRlVGltZUlucHV0ID0gdGhpcy5jcmVhdGVEYXRlVGltZUlucHV0KCk7XG4gICAgICAgIHZhciBvZmZzZXRJbnB1dCA9IHRoaXMuY3JlYXRlT2Zmc2V0SW5wdXQoKTtcbiAgICAgICAgdmFyIGNvbmZpcm1TZXR0aW5nc0J1dHRvbiA9IHRoaXMuY3JlYXRlQ29uZmlybUJ1dHRvbigpO1xuICAgICAgICB2YXIgbWFpbkRpdiA9IHRoaXMuY3JlYXRlTWFpbkRpdihkYXRlVGltZUlucHV0LCBvZmZzZXRJbnB1dCwgY29uZmlybVNldHRpbmdzQnV0dG9uKTtcbiAgICAgICAgY29tbWFuZERhdGFGb3JtLnByZXBlbmQobWFpbkRpdik7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoZGF0ZVRpbWVJbnB1dCk7XG4gICAgICAgIHRoaXMuc2V0T2Zmc2V0KG9mZnNldElucHV0KTtcbiAgICAgICAgdmFyIGNvbmZpcm1CdXR0b24gPSBjb21tYW5kRGF0YUZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0W2lkPSd0cm9vcF9jb25maXJtX3N1Ym1pdCddXCIpO1xuICAgICAgICBpZiAoIWNvbmZpcm1CdXR0b24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25maXJtU2V0dGluZ3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhdHRhY2tUaW1lID0gX3RoaXMuZ2V0RGF0ZU9iamVjdChkYXRlVGltZUlucHV0LnZhbHVlKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0VmFsdWUgPSBOdW1iZXIob2Zmc2V0SW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0ob2Zmc2V0SW5wdXQuaWQsIG9mZnNldFZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgY29uZmlybUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiYnRuLWRpc2FibGVkXCIpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpcm1CdXR0b24gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYXR0YWNrVGltZSAtIHdpbmRvdy51bnNhZmVXaW5kb3cuVGltaW5nLmdldEN1cnJlbnRTZXJ2ZXJUaW1lKCkgKyBvZmZzZXRWYWx1ZSk7XG4gICAgICAgICAgICBjb25maXJtU2V0dGluZ3NCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGNyZWF0ZURhdGVUaW1lSW5wdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGV0aW1lSW5wdXRJZCA9IFwiXCIuY29uY2F0KHRoaXMucHJlZml4LCBcIl9kYXRldGltZVwiKTtcbiAgICAgICAgdmFyIGRhdGV0aW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGRhdGV0aW1lSW5wdXQuaWQgPSBkYXRldGltZUlucHV0SWQ7XG4gICAgICAgIGRhdGV0aW1lSW5wdXQudHlwZSA9IFwiZGF0ZXRpbWUtbG9jYWxcIjtcbiAgICAgICAgZGF0ZXRpbWVJbnB1dC5zdGVwID0gXCIuMDAxXCI7XG4gICAgICAgIHJldHVybiBkYXRldGltZUlucHV0O1xuICAgIH0sXG4gICAgY3JlYXRlT2Zmc2V0SW5wdXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG9mZnNldElucHV0SWQgPSBcIlwiLmNvbmNhdCh0aGlzLnByZWZpeCwgXCJfb2Zmc2V0XCIpO1xuICAgICAgICB2YXIgb2Zmc2V0SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIG9mZnNldElucHV0LmlkID0gb2Zmc2V0SW5wdXRJZDtcbiAgICAgICAgb2Zmc2V0SW5wdXQudHlwZSA9IFwibnVtYmVyXCI7XG4gICAgICAgIHJldHVybiBvZmZzZXRJbnB1dDtcbiAgICB9LFxuICAgIGNyZWF0ZUNvbmZpcm1CdXR0b246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGNvbmZpcm1TZXR0aW5nc0J1dHRvbklkID0gXCJcIi5jb25jYXQodGhpcy5wcmVmaXgsIFwiX2NvbmZpcm1cIik7XG4gICAgICAgIHZhciBjb25maXJtU2V0dGluZ3NCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgIGNvbmZpcm1TZXR0aW5nc0J1dHRvbi5pZCA9IGNvbmZpcm1TZXR0aW5nc0J1dHRvbklkO1xuICAgICAgICBjb25maXJtU2V0dGluZ3NCdXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgICAgIGNvbmZpcm1TZXR0aW5nc0J1dHRvbi52YWx1ZSA9IFwiQ29uZmlybSBzZXR0aW5nc1wiO1xuICAgICAgICByZXR1cm4gY29uZmlybVNldHRpbmdzQnV0dG9uO1xuICAgIH0sXG4gICAgY3JlYXRlTWFpbkRpdjogZnVuY3Rpb24gKGRhdGVUaW1lSW5wdXQsIG9mZnNldElucHV0LCBjb25maXJtQnV0dG9uKSB7XG4gICAgICAgIHZhciBtYWluRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdmFyIGRhdGV0aW1lSW5wdXRJZCA9IGRhdGVUaW1lSW5wdXQuaWQ7XG4gICAgICAgIGlmIChkYXRldGltZUlucHV0SWQpIHtcbiAgICAgICAgICAgIHZhciBkYXRldGltZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgICAgZGF0ZXRpbWVMYWJlbC5odG1sRm9yID0gZGF0ZXRpbWVJbnB1dElkO1xuICAgICAgICAgICAgZGF0ZXRpbWVMYWJlbC50ZXh0Q29udGVudCA9IFwiQXJyaXZhbCB0aW1lOiBcIjtcbiAgICAgICAgICAgIG1haW5EaXYuYXBwZW5kKGRhdGV0aW1lTGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIG1haW5EaXYuYXBwZW5kKGRhdGVUaW1lSW5wdXQpO1xuICAgICAgICBtYWluRGl2LmFwcGVuZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuICAgICAgICB2YXIgb2Zmc2V0SW5wdXRJZCA9IG9mZnNldElucHV0LmlkO1xuICAgICAgICBpZiAob2Zmc2V0SW5wdXRJZCkge1xuICAgICAgICAgICAgdmFyIG9mZnNldExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICAgICAgb2Zmc2V0TGFiZWwuaHRtbEZvciA9IG9mZnNldElucHV0SWQ7XG4gICAgICAgICAgICBvZmZzZXRMYWJlbC50ZXh0Q29udGVudCA9IFwiT2Zmc2V0IChtcyk6IFwiO1xuICAgICAgICAgICAgbWFpbkRpdi5hcHBlbmQob2Zmc2V0TGFiZWwpO1xuICAgICAgICB9XG4gICAgICAgIG1haW5EaXYuYXBwZW5kKG9mZnNldElucHV0KTtcbiAgICAgICAgbWFpbkRpdi5hcHBlbmQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgbWFpbkRpdi5hcHBlbmQoY29uZmlybUJ1dHRvbik7XG4gICAgICAgIHJldHVybiBtYWluRGl2O1xuICAgIH0sXG4gICAgc2V0RGF0ZVRpbWU6IGZ1bmN0aW9uIChkYXRlVGltZUlucHV0KSB7XG4gICAgICAgIGRhdGVUaW1lSW5wdXQudmFsdWUgPSB0aGlzLmdldERhdGVUaW1lU3RyaW5nKG5ldyBEYXRlKCkpO1xuICAgIH0sXG4gICAgc2V0T2Zmc2V0OiBmdW5jdGlvbiAob2Zmc2V0SW5wdXQpIHtcbiAgICAgICAgdmFyIG9mZnNldElucHV0SWQgPSBvZmZzZXRJbnB1dC5pZDtcbiAgICAgICAgaWYgKCFvZmZzZXRJbnB1dElkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9mZnNldFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ob2Zmc2V0SW5wdXRJZCkgfHwgXCItMjUwXCI7XG4gICAgICAgIG9mZnNldElucHV0LnZhbHVlID0gb2Zmc2V0VmFsdWU7XG4gICAgfSxcbiAgICBnZXREYXRlVGltZVN0cmluZzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpIC0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpICogNmU0KVxuICAgICAgICAgICAgLnRvSVNPU3RyaW5nKClcbiAgICAgICAgICAgIC5zbGljZSgwLCAtMSk7XG4gICAgfSxcbiAgICBnZXREYXRlT2JqZWN0OiBmdW5jdGlvbiAoZGF0ZVRpbWVMb2NhbFZhbHVlKSB7XG4gICAgICAgIHZhciBmYWtlVXRjVGltZSA9IG5ldyBEYXRlKFwiXCIuY29uY2F0KGRhdGVUaW1lTG9jYWxWYWx1ZSwgXCJaXCIpKTtcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShmYWtlVXRjVGltZS5nZXRUaW1lKCkgKyBmYWtlVXRjVGltZS5nZXRUaW1lem9uZU9mZnNldCgpICogNmU0KTtcbiAgICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfSxcbiAgICBhZGRGb290ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlcnZlckluZm9QYXJhZ3JhcGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwicFtjbGFzcz0nc2VydmVyX2luZm8nXVwiKTtcbiAgICAgICAgdmFyIGZvb3RlclNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgZm9vdGVyU3Bhbi5zdHlsZS5jc3NGbG9hdCA9IFwibGVmdFwiO1xuICAgICAgICB2YXIgZm9vdGVyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiXCIpO1xuICAgICAgICBmb290ZXJOYW1lLnRleHRDb250ZW50ID0gXCJ0dy1jb21tYW5kLXNlbmRlclwiO1xuICAgICAgICB2YXIgZm9vdGVyVXJsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGZvb3RlclVybC50ZXh0Q29udGVudCA9IFwic3plbGJpLm92aFwiO1xuICAgICAgICBmb290ZXJVcmwuaHJlZiA9IFwiaHR0cHM6Ly9zemVsYmkub3ZoL1wiO1xuICAgICAgICBmb290ZXJVcmwudGFyZ2V0ID0gXCJfYmxhbmtcIjtcbiAgICAgICAgZm9vdGVyU3Bhbi5pbm5lckhUTUwgPSBcIlwiLmNvbmNhdChmb290ZXJOYW1lLm91dGVySFRNTCwgXCIgYnkgc3plbGJpIChcIikuY29uY2F0KGZvb3RlclVybC5vdXRlckhUTUwsIFwiKVwiKTtcbiAgICAgICAgc2VydmVySW5mb1BhcmFncmFwaCA9PT0gbnVsbCB8fCBzZXJ2ZXJJbmZvUGFyYWdyYXBoID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzZXJ2ZXJJbmZvUGFyYWdyYXBoLnByZXBlbmQoZm9vdGVyU3Bhbik7XG4gICAgfSxcbn07XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICB2YXIgdXJsUmVnZXggPSAvXi4qOlxcL1xcLy4qXFwvZ2FtZVxcLnBocC4qc2NyZWVuPXBsYWNlLip0cnk9Y29uZmlybS4qJC87XG4gICAgaWYgKHVybFJlZ2V4LnRlc3QodXJsKSkge1xuICAgICAgICBDb21tYW5kU2VuZGVyLmluaXQoKTtcbiAgICAgICAgQ29tbWFuZFNlbmRlci5hZGRGb290ZXIoKTtcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==