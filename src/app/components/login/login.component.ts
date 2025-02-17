import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login/login.service';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { LocalStorageService } from '../../servicios/storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private servicioLogin = inject(LoginService);
  private fb = inject(FormBuilder);
  private localStorageService = inject(LocalStorageService);
  private router = inject(Router);
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formularioLogin();
  }

  public formularioLogin(){
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    
  }

  public login(){

    if (this.formulario.invalid) {
      console.log("Formulario inválido");
      return;
    }

    this.servicioLogin.iniciarSesion(this.formulario.value).subscribe({
      next: data => this.localStorageService.setItem('usuario', data),
      error: err => console.error("Error al obtener clientes:", err),
      complete: () => this.router.navigate(['/clientes'])
    });

    
  }

}
