import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EditorTextoComponent } from "./Componentes/editor-texto/editor-texto.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, EditorTextoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'NodeLexer';
}
