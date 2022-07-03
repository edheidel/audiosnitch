import drag from "store/drag";

export function dragStartHandler(event: any): void {
  event.preventDefault();
  drag.enableDrop(true);
}

export function dragLeaveHandler(event: any): void {
  event.preventDefault();
  drag.enableDrop(false);
}
