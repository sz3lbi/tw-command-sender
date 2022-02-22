/// <reference types="./types/tampermonkey" />

import { DateTime, Duration } from "luxon";
import { CommandSender } from "./types/command-sender";

const CommandSender: CommandSender = {
  prefix: "command_sender",
  init: function (prefix) {
    if (prefix !== undefined) {
      this.prefix = prefix;
    }

    const commandDataForm = document.querySelector(
      "form[id='command-data-form']"
    );
    if (!commandDataForm) {
      return;
    }

    const dateTimeInput = this.createDateTimeInput();
    const offsetInput = this.createOffsetInput();
    const confirmSettingsButton = this.createConfirmButton();

    const mainDiv = this.createMainDiv(
      dateTimeInput,
      offsetInput,
      confirmSettingsButton
    );
    commandDataForm.prepend(mainDiv);

    const timeTypeGroupName = `${this.prefix}_time_type`;
    const timeTypeGroupDiv = this.createTimeTypeRadioGroup(timeTypeGroupName);
    mainDiv.prepend(timeTypeGroupDiv);

    this.setDateTime(dateTimeInput);
    this.setOffset(offsetInput);

    const confirmButton = commandDataForm.querySelector(
      "input[id='troop_confirm_submit']"
    );
    if (!confirmButton) {
      return;
    }

    confirmSettingsButton.addEventListener("click", () => {
      const offsetValue = Number(offsetInput.value);
      localStorage.setItem(offsetInput.id, offsetValue.toString());

      confirmButton.classList.add("btn-disabled");

      const attackDateTime = DateTime.fromISO(dateTimeInput.value);
      const serverDateTime = DateTime.fromMillis(
        unsafeWindow.Timing.getCurrentServerTime()
      );
      let timeoutDuration = attackDateTime.diff(serverDateTime);

      const offset = Duration.fromMillis(offsetValue);
      timeoutDuration = timeoutDuration.plus(offset);

      const checkedRadio = timeTypeGroupDiv.querySelector(
        "input[type='radio']:checked"
      );
      if (checkedRadio?.id === `${timeTypeGroupName}_arrival`) {
        const closestTbody = commandDataForm.closest("tbody");
        const commandTableTds = closestTbody?.querySelectorAll("td");
        if (!commandTableTds) {
          return;
        }

        const durationRegex = /^\d+\:\d{1,2}\:\d{1,2}$/;
        const durationMatch = Array.from(commandTableTds).find((td) =>
          durationRegex.test(td.textContent ?? "")
        );
        const attackDurationString = durationMatch?.textContent;
        const attackDurationArray = attackDurationString
          ?.split(":")
          .map(Number);
        if (!attackDurationArray) {
          return;
        }
        const attackDuration = Duration.fromObject({
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
    const now = DateTime.now();
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
    const serverInfoParagraph = document.querySelector(
      "p[class='server_info']"
    );

    const footerSpan = document.createElement("span");
    footerSpan.style.cssFloat = "left";

    const footerName = document.createElement("b");
    footerName.textContent = "tw-command-sender";
    const footerUrl = document.createElement("a");
    footerUrl.textContent = "szelbi.ovh";
    footerUrl.href = "https://szelbi.ovh/";
    footerUrl.target = "_blank";

    footerSpan.innerHTML = `${footerName.outerHTML} by szelbi (${footerUrl.outerHTML})`;

    serverInfoParagraph?.prepend(footerSpan);
  },
};

const url = window.location.href;
const urlRegex = /^.*:\/\/.*\/game\.php.*screen=place.*try=confirm.*$/;

if (urlRegex.test(url)) {
  CommandSender.init();
  CommandSender.addFooter();
}
