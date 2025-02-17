import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Cliente } from '../../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private localStorageService = inject(LocalStorageService);
    private url = "http://127.0.0.1:8000"
    private http = inject(HttpClient);
    public usuarioGuardado: { access_token: string; expires_in: string; token_type:number } | null | undefined;


    constructor() { }

    public getTodosClientes(){
      this.recuperarDatosLocalStorage();
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usuarioGuardado?.access_token}`,
        'Content-Type': 'application/json',
        'Custom-Header': 'ValorPersonalizado'
      });
      return this.http.get<Cliente[]>(`${this.url}/api/auth/clientes`, { headers });
    }

    public storeCliente(body:Cliente){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usuarioGuardado?.access_token}`,
        'Content-Type': 'application/json',
        'Custom-Header': 'ValorPersonalizado'
      });
      return this.http.post<Cliente>(`${this.url}/api/auth/clientes/create`, body, { headers });
    }

    public actualizarCliente(body:Cliente){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usuarioGuardado?.access_token}`,
        'Content-Type': 'application/json',
        'Custom-Header': 'ValorPersonalizado'
      });
      return this.http.put<Cliente>(`${this.url}/api/auth/clientes/update`, body, { headers });
    }

    public borrarCliente(body:any){
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.usuarioGuardado?.access_token}`,
        'Content-Type': 'application/json',
        'Custom-Header': 'ValorPersonalizado'
      });
      return this.http.delete(`${this.url}/api/auth/clientes/delete`, {headers, body}  );
    }

    private recuperarDatosLocalStorage(): void {
      this.usuarioGuardado = this.localStorageService.getItem<{ access_token: string, expires_in: string, token_type:number }>('usuario');
      if (this.usuarioGuardado) {
        console.log("Datos recuperados de localStorage:", this.usuarioGuardado);
      }
    }

}
