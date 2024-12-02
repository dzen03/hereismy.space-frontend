import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-programming-site',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './programming-site.component.html',
  styleUrl: './programming-site.component.scss'
})
export class ProgrammingSiteComponent {

}
