import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../../app.component';
import { Photo } from '../photo';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GalleryComponent } from '../gallery/gallery.component';

class tmpPhoto {
  photo: Photo;
  constructor(photo: Photo) {
    this.photo = photo;
  }
}

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})

export class PhotoComponent{
  photo: Photo | null = null;

  constructor(private route: ActivatedRoute, private location: Location, private http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      if (!params.has('id')) {
        console.error("no photo with this id");
        return;
      }
      let id_str: string = params.get('id')!;
      let id: number = parseInt(id_str);

      console.log(id);

      if (GalleryComponent.photos_map.has(id)) {
        this.photo = GalleryComponent.photos_map.get(id)!;
      } else {
        this.http.get<tmpPhoto>(AppComponent.serverURL + '/api/photo', {params: {"id": id_str}}).subscribe(data => {
          console.log(data);
          this.photo = new Photo(id, data.photo.description, data.photo.categories);
        });
      }
    });
  }

  public canvas_draw()
  {
      try {

          const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
          const ctx = canvas.getContext("2d")!;
          const image = document.getElementById("image")! as HTMLImageElement;

          image.crossOrigin = "anonymous";

          ctx.canvas.width = image.naturalWidth;
          ctx.canvas.height = image.naturalHeight;

          if (ctx.canvas.width == 0 || ctx.canvas.height == 0)
              return;
          console.log(image.naturalWidth, image.naturalHeight);

          ctx.drawImage(image, 0, 0);

          // canvas.addEventListener("loaded", this.color_backgound);

          this.color_backgound(); // may not be loaded yet
      }
      catch (ex) {

          console.log(ex);

      }

  }

  async color_backgound()
  {

      const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
      const ctx = canvas.getContext("2d")!;
      const image = document.getElementById("image")! as HTMLImageElement;

      image.crossOrigin = "anonymous";

      var rgb = {r:0,g:0,b:0};
      var data;
      var length;
      var i = 0, count = 0;

      var loaded = false;

      while (!loaded)
      {
          try {
              data = ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
              loaded = true;
          } catch(e) {
              loaded = false
              console.log("--------------------");
              console.log(e);
              console.log("--------------------");

              /* security error, img on diff domain */
              await new Promise(r => setTimeout(r, 1000));
          }
          // await new Promise(r => setTimeout(r, 100));
      }

          // alert("loaded");


      length = data!.data.length;

      console.log(data);

      while ( (i += 4) < length ) {
          ++count;
          rgb.r += data!.data[i];
          rgb.g += data!.data[i+1];
          rgb.b += data!.data[i+2];
          // console.log(rgb);
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      // body.backgroundColor = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

      const body = document.getElementById("body");
      
      body!.style.background = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

      console.log(rgb);
  }

  goBack() {
    this.location.back();
  }

}
