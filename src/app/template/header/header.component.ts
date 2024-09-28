import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  dropdownOpen = false;
  activeLink: string = 'home';

  constructor(private router: Router) { }

  ngOnInit(): void {

    let savedColor = localStorage.getItem('mainColor');
    if (savedColor) {
      document.documentElement.style.setProperty('--main-color', savedColor);
    }
    //Captura los cambios de navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)   // NavigationEnd se dispara cada vez que se completa una navegación. 
    ).subscribe((event: NavigationEnd) => {             // Se suscribir a este evento, para actualizar activeLink con la URL actual.
      this.activeLink = event.url;                     // Actualiza el enlace activo con la URL
    });

    // Inicializa la clase activa al cargar la página
    this.activeLink = this.router.url;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 10) {                           // Cambia el valor según lo que desees
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  cambiarColor(color: string) {
    document.documentElement.style.setProperty('--main-color', color);
    localStorage.setItem('mainColor', color);
    this.dropdownOpen = false;
  }

  // compara la URL activa con el enlace proporcionado. Si coinciden, devuelve true
  // aplicando así la clase active-navbar al enlace correspondiente.
  isActive(link: string): boolean {
    return this.activeLink === link; // Devuelve true si el enlace es el activo
  }

}
