import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiRutasService } from '../../api-rutas.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor-texto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor-texto.component.html',
  styleUrl: './editor-texto.component.css'
})
export class EditorTextoComponent {


  @ViewChild('codeArea') areaTexto!: ElementRef<HTMLTextAreaElement>;

  tokens: any[] = [];
  imprimibles: any[] = [];
  errores: any = {}; 
  listaErrores: any[] = [];
  erroresSintacticos: any[] = [];
  erroresOperaciones: any[] = [];
  erroresSintacticosConfigs: any[] = [];
  comentarios: any[] = [];

  json: any = {};

  constructor(private api: ApiRutasService) {}
  
  fila: number = 1;
  columna: number = 1;
  archivoAbierto: File | null = null;

  public analizar() {
    const codigo = this.areaTexto.nativeElement.value;

    if (!codigo) {
      console.error('No se pudo obtener el código del área de texto.');
      return;
    }

    this.api.obtenerTokensYJson(codigo).subscribe(
      (data: any) => {

        this.tokens = data.tokens || []; 

        if (this.tokens) {
          console.log(this.tokens);
        }
        this.imprimibles = data.imprimibles || [];
        this.errores = data.errores || {};
        this.comentarios = data.comentarios || [];
        
        if (this.errores) {
          this.listaErrores = this.errores.listaErrores || [];
          this.erroresSintacticos = this.errores.erroresSintacticos || [];
          console.log(this.erroresSintacticos);
          this.erroresOperaciones = this.errores.erroresOperaciones || [];
          console.log(this.erroresOperaciones);
          this.erroresSintacticosConfigs = this.errores.erroresSintacticosConfigs || [];
        }

      },
    );
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

  /*
    METODOS PARA ABRIR LOS REPORTES EN OTRA VENTANA 
  */
      //TOKEN
      mostrarTokensEnNuevaVentana() {
        if (!this.tokens || this.tokens.length === 0) {
          alert('No hay tokens disponibles para mostrar.');
          return;
        }
        const nuevaVentana = window.open('', '_blank', 'width=800,height=600');
      
        if (nuevaVentana) {
          const contenidoHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tokens Analizados</title>
            <style>
              body {
                font-family: 'Fira Code', monospace;
                padding: 20px;
                background-color: #1e1e1e;
                color: #ffffff;
              }
              h1 {
                text-align: center;
                color: #4caf50;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background-color: #2e2e2e;
                color: #ffffff;
              }
              th, td {
                border: 1px solid #444;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #4caf50;
                color: #ffffff;
              }
              tr:nth-child(even) {
                background-color: #3a3a3a;
              }
            </style>
          </head>
          <body>
            <h1>Tokens Analizados</h1>
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Lexema</th>
                  <th>Fila</th>
                  <th>Columna</th>
                </tr>
              </thead>
              <tbody>
                ${this.tokens
                  .map(
                    token => `
                      <tr>
                        <td>${token.tipo || 'N/A'}</td>
                        <td>${token.lexema || 'N/A'}</td>
                        <td>${token.fila || 'N/A'}</td>
                        <td>${token.columna || 'N/A'}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
          </html>
        `;
          nuevaVentana.document.open();
          nuevaVentana.document.write(contenidoHTML);
          nuevaVentana.document.close();
        } else {
          alert('No se pudo abrir una nueva ventana. Verifica que los pop-ups no estén bloqueados.');
        }
      }

      mostrarErroresEnNuevaVentana() {
        if (!this.tokens || this.tokens.length === 0) {
          alert('No hay Errores de ningun tipo.');
          return;
        }
        const nuevaVentana = window.open('', '_blank', 'width=800,height=600');
      
        if (nuevaVentana) {
          const contenidoHTML = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Tokens y Errores</title>
            <style>
              body {
                font-family: 'Fira Code', monospace;
                padding: 20px;
                background-color: #1e1e1e;
                color: #ffffff;
              }
              h1 {
                text-align: center;
                color: #4caf50;
              }
              h2 {
                color: #ff9800;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
                background-color: #2e2e2e;
                color: #ffffff;
              }
              th, td {
                border: 1px solid #444;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #4caf50;
                color: #ffffff;
              }
              tr:nth-child(even) {
                background-color: #3a3a3a;
              }
            </style>
          </head>
          <body>
            <h2>Errores Léxicos</h2>
            <table>
              <thead>
                <tr>
                  <th>Tipo Error</th>
                  <th>Carácter Error</th>
                  <th>Fila</th>
                  <th>Columna</th>
                  <th>AFD Informe</th>
                  <th>Lexema</th>
                </tr>
              </thead>
              <tbody>
                ${this.listaErrores
                  .map(
                    error => `
                      <tr>
                        <td>${error.tipo || 'N/A'}</td>
                        <td>${error.caracterError || 'N/A'}</td>
                        <td>${error.fila || 'N/A'}</td>
                        <td>${error.columna || 'N/A'}</td>
                        <td>${error.estadoError || 'N/A'}</td>
                        <td>${error.lexema || 'N/A'}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
      
            <h2>Errores Sintacticos en operaciones</h2>
            <table>
              <thead>
                <tr>
                  <th>Mensaje Error</th>
                </tr>
              </thead>
                <tbody>
                ${this.erroresSintacticos
                  .map(
                    error => `
                      <tr>
                        <td>${error.mensaje || 'N/A'}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
      
            </body>
            <h2>Errores Sintacticos en Configuraciones </h2>
            <table>
              <thead>
                <tr>
                  <th>Error Mensaje</th>
                </tr>
              </thead>
              <tbody>
                ${this.erroresSintacticosConfigs
                  .map(
                    error => `
                      <tr>
                        <td>${error.mensaje || 'N/A'}</td>
                      </tr>
                    `
                  )
                  .join('')}
              </tbody>
            </table>
          </html>
        `;
          nuevaVentana.document.open();
          nuevaVentana.document.write(contenidoHTML);
          nuevaVentana.document.close();
        } else {
          alert('No se pudo abrir una nueva ventana. Verifica que los pop-ups no estén bloqueados.');
        }
      }
  }
