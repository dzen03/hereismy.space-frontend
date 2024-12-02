import { AppComponent } from "../app.component";

export class Photo {
  public id: number;
  public url: string;
  public srcset: string[];
  public description: string;
  public categories: string[];

  constructor(id: number, description: string, categories: string[]) {
    this.id = id;
    this.url = AppComponent.serverURL + "/photos/" + id + ".jpg";
    this.description = description;
    this.srcset = [
      AppComponent.serverURL + "/photos/" + id + ".sm.webp 500w",
      AppComponent.serverURL + "/photos/" + id + ".md.webp 1000w",
      AppComponent.serverURL + "/photos/" + id + ".lg.webp 2000w",
    ];  // TODO get urls from server
    this.categories = categories;
  }
}
