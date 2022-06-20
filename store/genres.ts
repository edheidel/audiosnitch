import { makeAutoObservable } from "mobx";

class Genres {
  data: string[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  update(newData: string[] | null) {
    this.data = newData;
  }

  clear() {
    this.data = null;
  }
}

export default new Genres();
