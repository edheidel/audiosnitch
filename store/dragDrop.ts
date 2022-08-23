import { makeAutoObservable } from "mobx";

class DragDropStore {
  isActive: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  enableDrop(boolean: boolean) {
    this.isActive = boolean;
  }
}

export default new DragDropStore();
