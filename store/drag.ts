import { makeAutoObservable } from "mobx";

class Drag {
  isActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  enableDrop(boolean: boolean) {
    this.isActive = boolean;
  }
}

export default new Drag();
