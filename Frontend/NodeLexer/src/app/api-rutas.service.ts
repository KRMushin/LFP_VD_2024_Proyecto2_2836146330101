import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRutasService {

  private http = inject(HttpClient);
  private baseUrl: String = 'http://localhost:5000/';

  public obtenerTokensYJson(cadena: string): any {
    return this.http.post(`${this.baseUrl}analisis-lexico`, cadena, {
      headers: { 'Content-Type': 'text/plain' }, // Enviar como texto plano
    });
  }

}