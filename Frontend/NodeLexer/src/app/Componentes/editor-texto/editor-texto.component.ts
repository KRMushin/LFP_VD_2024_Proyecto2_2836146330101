import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnalizadorLexico } from '../../AnalizadorLexico/analizador-lexico';
import Token from '../../AnalizadorLexico/token';
import ErrorLexico from '../../AnalizadorLexico/error-lexico';

@Component({
  selector: 'app-editor-texto',
  standalone: true,
  imports: [],
  templateUrl: './editor-texto.component.html',
  styleUrl: './editor-texto.component.css'
})
export class EditorTextoComponent {

  private lexer: AnalizadorLexico;

  @ViewChild('codeArea') areaTexto!: ElementRef<HTMLTextAreaElement>;

  constructor() { 
    this.lexer = new AnalizadorLexico();
  }


  fila: number = 1;
  columna: number = 1;

  archivoAbierto: File | null = null;

  public analizar(): Token[] {
    const resultado = this.lexer.analizarEntrada(this.areaTexto.nativeElement.value);
    
    for (let index = 0; index < resultado.tokens.length; index++) {
      const token = resultado.tokens[index];
      console.log(`Token: ${token.tipo}, Lexema: ${token.lexema}, Fila: ${token.fila}, Columna: ${token.columna}`);
    }

    for (let index = 0; index < resultado.listaErrores.length; index++) {
      const error: ErrorLexico = resultado.listaErrores[index];
      console.error(`Error: ${error.tipo}, Descripción: ${error.lexema}, Fila: ${error.fila} , Columna: ${error.columna}`);
    }
    
    return resultado.tokens;

    
  }

  /*
    Area de actualizacion de la fila y columna
  */

  public actualizarCursor(evento: Event): void {
    const areaTexto = evento.target as HTMLTextAreaElement;
    if (!areaTexto) {
      console.error("No se pudo acceder al área de texto.");
      return;
    }
    const posicionCursor = areaTexto.selectionStart;
    const lineas = areaTexto.value.substring(0, posicionCursor).split(/\r?\n/);

    this.fila = lineas.length;
    this.columna = lineas[lineas.length - 1].length + 1;
  }

  /*
    AREA DE HERRAMIENTAS DEL EDITOR DEL TEXTO EL CUAL ABRE/ETC CON LOS ARCHIVOS
  */

  private mostrarTexto(contenido: string): void {
    if (this.areaTexto) {
      this.areaTexto.nativeElement.value = contenido;

      const evento = new Event('input', { bubbles: true });
      this.areaTexto.nativeElement.dispatchEvent(evento);
    }
  }

  private leerArchivo(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const contenido = reader.result as string;
      this.mostrarTexto(contenido);
    };
    reader.readAsText(file);
  }
  
  public abrirArchivo(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.nlex, .txt'; 

    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        this.archivoAbierto = file;
        this.leerArchivo(file);
      }
    };

    input.click();
  }

  public guardarArchivo(): void {
    if (this.archivoAbierto) {
      const blob = new Blob([this.areaTexto.nativeElement.value], { type: 'text/plain' });
      const enlace = document.createElement('a');
      enlace.href = URL.createObjectURL(blob);
      enlace.download = this.archivoAbierto.name;
      enlace.click();
    } else {
      console.error('No hay ningún archivo abierto para guardar.');
    }
  }

  public async guardarComo(): Promise<void> {
    const contenido = this.areaTexto.nativeElement.value;
  
    const nuevoArchivo = await (window as any).showSaveFilePicker({
      types: [
        {
          description: 'Archivos de texto',
          accept: { 'text/plain': ['.nlex'] },
        },
      ],
    });
  
    const writable = await nuevoArchivo.createWritable();
    await writable.write(contenido);
    await writable.close();
  }

  public limpiarTexto(): void {
    if (this.areaTexto) {
      this.areaTexto.nativeElement.value = '';
      this.fila = 1;
      this.columna = 1;
    }
  }
}
