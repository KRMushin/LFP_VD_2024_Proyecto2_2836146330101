import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BarraControlComponent } from "./Componentes/barra-control/barra-control.component";
import { EditorTextoComponent } from "./Componentes/editor-texto/editor-texto.component";
import { ConsolaComponent } from "./Componentes/consola/consola.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BarraControlComponent, EditorTextoComponent, ConsolaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NodeLexer';
}
