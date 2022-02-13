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

    this.setDateTime(dateTimeInput);
    this.setOffset(offsetInput);

    const confirmButton = commandDataForm.querySelector(
      "input[id='troop_confirm_submit']"
    );
    if (!confirmButton) {
      return;
    }

    confirmSettingsButton.addEventListener("click", () => {
      const attackTime = this.getDateObject(dateTimeInput.value).getTime();

      const offsetValue = Number(offsetInput.value);
      localStorage.setItem(offsetInput.id, offsetValue.toString());

      confirmButton.classList.add("btn-disabled");
      setTimeout(() => {
        if (confirmButton instanceof HTMLElement) {
          confirmButton.click();
        }
      }, attackTime - window.unsafeWindow.Timing.getCurrentServerTime() + offsetValue);

      confirmSettingsButton.disabled = true;
    });
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

    const datetimeInputId = dateTimeInput.id;
    if (datetimeInputId) {
      const datetimeLabel = document.createElement("label");
      datetimeLabel.htmlFor = datetimeInputId;
      datetimeLabel.textContent = "Arrival time: ";
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
    dateTimeInput.value = this.getDateTimeString(new Date());
  },
  setOffset: function (offsetInput) {
    const offsetInputId = offsetInput.id;
    if (!offsetInputId) {
      return;
    }
    const offsetValue = localStorage.getItem(offsetInputId) || "-250";
    offsetInput.value = offsetValue;
  },
  getDateTimeString: function (date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 6e4)
      .toISOString()
      .slice(0, -1);
  },
  getDateObject: function (dateTimeLocalValue) {
    const fakeUtcTime = new Date(`${dateTimeLocalValue}Z`);
    const date = new Date(
      fakeUtcTime.getTime() + fakeUtcTime.getTimezoneOffset() * 6e4
    );
    return date;
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
