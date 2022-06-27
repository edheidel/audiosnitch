import { makeAutoObservable } from "mobx";

class RefStore {
  chipsRef = null;

  saveChipsRef(ref: any) {
    this.chipsRef = ref;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RefStore();
