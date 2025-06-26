import { RouterLink, RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-inicio',
  imports: [RouterLink, MatGridListModule, CommonModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})


export class InicioComponent {

  categorias = [
    {
      id: 1,
      img: 'img/carru1.png',
      nombre: 'Mickey Mouse'
    },    
    {
      id: 2,
      img: 'img/carru2.png',
      nombre: 'Minions'
    },    
    {
      id: 3,
      img: 'img/carru3.png',
      nombre: 'Animalitos'
    },
        {
      id: 4,
      img: 'img/carru4.png',
      nombre: 'Princesas'
    },    {
      id: 5,
      img: 'img/carru5.png',
      nombre: 'Bluey'
    },    {
      id: 6,
      img: 'img/carru6.png',
      nombre: 'Capibara'
    },    {
      id: 7,
      img: 'img/carru7.png',
      nombre: 'Dinosaurios'
    },    {
      id: 8,
      img: 'img/carru8.png',
      nombre: 'Avengers'
    },    {
      id: 9,
      img: 'img/carru9.png',
      nombre: 'Plim Plim'
    },    {
      id: 10,
      img: 'img/carru10.png',
      nombre: 'Intesamente'
    }
  ]

@ViewChild('track') trackRef!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    this.enableDragScroll(this.trackRef.nativeElement);
  }

  scrollLeft(): void {
    this.trackRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.trackRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  enableDragScroll(container: HTMLElement): void {
    let isDown = false;
    let startX: number = 0;
    let scrollLeft: number = 0;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('active');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('active');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * -1;
      container.scrollLeft = scrollLeft + walk;
    });
  }


}
