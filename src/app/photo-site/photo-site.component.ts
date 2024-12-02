import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-photo-site',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './photo-site.component.html',
  styleUrl: './photo-site.component.scss'
})
export class PhotoSiteComponent {

}
