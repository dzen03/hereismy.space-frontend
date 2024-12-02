import { Routes } from '@angular/router';

import { GalleryComponent } from './photo-site/gallery/gallery.component';
import { PhotoComponent } from './photo-site/photo/photo.component';
import { HomeComponent } from './photo-site/about/home.component';
import { PhotoSiteComponent } from './photo-site/photo-site.component';
import { AdminComponent } from './photo-site/admin/admin.component';

import { IndexComponent } from './index/index.component';

import { ProgrammingSiteComponent } from './programming-site/programming-site.component';

export const routes: Routes = [
  {
    path: 'photos',
    component: PhotoSiteComponent,
    children: [
      {
        path: 'gallery',
        title: 'Gallery',
        component: GalleryComponent,
      },
      {
        path: 'gallery/:name',
        title: 'Gallery',
        component: GalleryComponent,
      },
      {
        path: 'photo/:id',
        title: 'Photo',
        component: PhotoComponent,
      },
      {
        path: 'about',
        title: 'About me',
        component: HomeComponent,
      },
      {
        path: 'admin',
        title: 'Admin',
        component: AdminComponent,
      },
    ]
  },
  // {
  //   path: 'programming',
  //   component: ProgrammingSiteComponent,
  // },
  // { 
  //   path: '',
  //   component: IndexComponent
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/photos/gallery'
  }
];
