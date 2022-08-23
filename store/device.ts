import { makeAutoObservable } from "mobx";

class DeviceStore {
  isMobile = false;

  isDesktop = false;

  constructor() {
    makeAutoObservable(this);
  }

  calculateIsMobile = () => {
    if (window.innerWidth <= 768) {
      this.isMobile = true;
    } else {
      this.isDesktop = true;
    }
  };
}

export default new DeviceStore();
