import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contacto',
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

  numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  rouletteNumbers = [...this.numbers];
  usedNumbers: number[] = [];
  angle = 0;
  spinning = false;
  selectedNumber: number | null = null;
  showSelected = false;

  spin() {
    if (this.spinning || this.rouletteNumbers.length === 0) return;

    this.spinning = true;
    this.showSelected = false;

    const index = Math.floor(Math.random() * this.rouletteNumbers.length);
    const selected = this.rouletteNumbers[index];
    const degreesPerSegment = 360 / 90;

    this.angle += 360 * 5 + (360 - index * degreesPerSegment);
    this.selectedNumber = selected;

    setTimeout(() => {
      this.showSelected = true;

      setTimeout(() => {
        this.usedNumbers.push(selected);
        this.rouletteNumbers = this.rouletteNumbers.filter(n => n !== selected);
        this.selectedNumber = null;
        this.showSelected = false;
        this.spinning = false;
      }, 5000); // Mostrar por 10 segundos

    }, 4000); // Esperar a que termine de girar antes de mostrar
  }

  reset() {
    this.rouletteNumbers = [...this.numbers];
    this.usedNumbers = [];
    this.angle = 0;
    this.selectedNumber = null;
    this.showSelected = false;
    this.spinning = false;
  }

}