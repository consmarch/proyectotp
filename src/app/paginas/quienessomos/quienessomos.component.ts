import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-quienessomos',
  imports: [],
  templateUrl: './quienessomos.component.html',
  styleUrl: './quienessomos.component.css'
})
export class QuienessomosComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  painting: boolean = false;
  selectedTool: string = 'brush';

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.setupDrawing(canvas);
  }

  selectTool(tool: string): void {
    this.selectedTool = tool;
    console.log('Herramienta seleccionada:', tool);
  }

  setupDrawing(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('mousedown', (e) => {
      this.painting = true;
      this.draw(e);
    });

    canvas.addEventListener('mouseup', () => {
      this.painting = false;
      this.ctx.beginPath();
    });

    canvas.addEventListener('mousemove', (e) => {
      this.draw(e);
    });
  }

  draw(e: MouseEvent): void {
    if (!this.painting || this.selectedTool !== 'brush') return;

    this.ctx.lineWidth = 5;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000000';

    this.ctx.lineTo(e.offsetX, e.offsetY);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(e.offsetX, e.offsetY);
  }

}
