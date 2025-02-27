import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'here-is-my-space';
  public static serverURL: string = environment.API_URL;
}
