import { makeAutoObservable } from "mobx";

class DragStore {
  isActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  enableDrop(boolean: boolean) {
    this.isActive = boolean;
  }
}

export default new DragStore();
