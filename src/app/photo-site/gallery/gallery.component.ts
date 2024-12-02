import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Photo } from '../photo';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';

import { NgxMasonryModule, NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink, NgxMasonryModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})

export class GalleryComponent {
  categories: string[] = [];  // TODO get from server
  public photoList: Photo[] = [];  // TODO same

  public static photos_map: Map<number, Photo> = new Map();

  name: string | null = null;

  need_update: boolean = false;

  public myOptions: NgxMasonryOptions = {
    percentPosition: true,
    // resize: true
  };

  imgLoaded() {
    this.need_update = !this.need_update;
  }

  private update_photos(category: string | null) {
    class TempPhoto{
      id: string = "";
      description: string= "";
      categories: string[] = [];
    }
    class Photos {
      photos: Array<TempPhoto>;

      constructor(photos: Array<TempPhoto>) {
        this.photos = photos;
      }
    }

    this.http.get<Photos>(AppComponent.serverURL + '/api/photos', {params: {"category": (category == null ? '' : category)}}).subscribe(data => {
      this.photoList = [];
      for (let photo of data.photos) {
        const int_id = parseInt(photo.id);
        const tmp = new Photo(int_id, photo.description, photo.categories);
        this.photoList.push(tmp);
        GalleryComponent.photos_map.set(int_id, tmp);
      }
    });
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    route.paramMap.subscribe((params) => {
      this.update_photos(params.get('name'));
    });

    class Categories {
      categories: Array<string>;

      constructor(categories: Array<string>) {
        this.categories = categories;
      }
    }
    
    http.get<Categories>(AppComponent.serverURL + '/api/categories').subscribe(data => {
      this.categories = data.categories.sort();
    });
  }
}
