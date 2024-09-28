import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './template/header/header.component';
import { HomeComponent } from "./pages/home/home.component";
import { RouterModule } from '@angular/router';
import { EducationComponent } from './pages/education/education.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule,
    HeaderComponent, HomeComponent, EducationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'portafolioHR';
}
