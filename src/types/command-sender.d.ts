import { DateTime } from "luxon";

interface CommandSender {
  //parameters
  prefix: string;
  //methods
  init(prefix?: string): void;
  createTimeTypeRadioGroup(groupName: string): HTMLDivElement;
  createDateTimeInput(): HTMLInputElement;
  createOffsetInput(): HTMLInputElement;
  createConfirmButton(): HTMLInputElement;
  createMainDiv(
    dateTimeInput: HTMLInputElement,
    offsetInput: HTMLInputElement,
    confirmButton: HTMLInputElement
  ): HTMLDivElement;
  setDateTime(dateTimeInput: HTMLInputElement): void;
  setOffset(offsetInput: HTMLInputElement): void;
  getDateTimeObject(dateTimeLocalValue: string): DateTime;
  addFooter(): void;
}
