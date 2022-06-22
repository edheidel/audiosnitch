import { makeAutoObservable } from "mobx";

class Genres {
  data: string[] | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  update(genres: string[] | null) {
    this.data = genres;
  }

  clear() {
    this.data = null;
  }
}

export default new Genres();
