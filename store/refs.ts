import { makeAutoObservable } from "mobx";

class RefStore {
  chipContainerRef: HTMLDivElement | null = null;

  saveRef(ref: HTMLDivElement | null) {
    this.chipContainerRef = ref;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RefStore();
