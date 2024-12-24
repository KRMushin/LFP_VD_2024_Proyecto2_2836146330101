import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consola',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consola.component.html',
  styleUrl: './consola.component.css'
})
export class ConsolaComponent {
  lineasSalida: string[] = [];

  agregarLinea(contenido: string) {
    this.lineasSalida.push(contenido);

    setTimeout(() => {
      const divSalida = document.querySelector('.console-output');
      if (divSalida) {
        divSalida.scrollTop = divSalida.scrollHeight;
      }
    }, 0);
  }
}
