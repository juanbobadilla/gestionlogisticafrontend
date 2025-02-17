import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor() { }

  private url = "http://127.0.0.1:8000"
  private http = inject(HttpClient);

  public iniciarSesion(data:any){
    return this.http.post(`${this.url}/api/auth/login`, data);
  }

}
