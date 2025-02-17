import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Producto } from '../../modelos/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor() { }

  private localStorageService = inject(LocalStorageService);
  private url = "http://127.0.0.1:8000"
  private http = inject(HttpClient);
  public usuarioGuardado: { access_token: string; expires_in: string; token_type:number } | null | undefined;

  public getTodosProductos(){
    this.recuperarDatosLocalStorage();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.usuarioGuardado?.access_token}`,
      'Content-Type': 'application/json',
      'Custom-Header': 'ValorPersonalizado'
    });
    return this.http.get<Producto[]>(`${this.url}/api/auth/producto/informe`, { headers });
  }


  private recuperarDatosLocalStorage(): void {
    this.usuarioGuardado = this.localStorageService.getItem<{ access_token: string, expires_in: string, token_type:number }>('usuario');
    if (this.usuarioGuardado) {
      console.log("Datos recuperados de localStorage:", this.usuarioGuardado);
    }
  }


}
