import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Photo } from '../photo';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})

export class AdminComponent {
  serverURL = AppComponent.serverURL;
  categories: string[] = [];  // TODO get from server
  public photoList: Photo[] = [];  // TODO same

  public static photos_map: Map<number, Photo> = new Map();

  name: string | null = null;

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
        AdminComponent.photos_map.set(int_id, tmp);
      }
    });
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.update_photos(null);
  }

  test(id: number) {
    const formData = new FormData(document.getElementById('form' + id) as HTMLFormElement);
    console.log(formData.get('description'));

    this.http.post(AppComponent.serverURL + '/api/photo', formData).subscribe(data => {
      console.log(data);  
    });
    return false;
  }
}
