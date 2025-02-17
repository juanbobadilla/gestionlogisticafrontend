import { Component, inject, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/clientes/cliente.service';
import { Cliente } from '../../modelos/cliente';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

    private fb = inject(FormBuilder);
    formulario!:FormGroup;
    public opcionBoton = 0; //si el boton esta en 0 puede guardar, si esta en 1 actualizar, de lo contrario, va a eliminar
    private servicioClientes = inject(ClienteService);
    public datosClientes:Cliente[] = [];

    ngOnInit(): void {
      this.getTodosClientes();
      this.formularioLogin();
    }

    public getTodosClientes(){
      this.servicioClientes.getTodosClientes().subscribe({
        next: data => this.datosClientes = data,
        error: err => console.error("Error al obtener clientes:", err),
        complete: () => console.log("peticion finalizada")
      })
    }

    public formularioLogin(){
      this.formulario = this.fb.group({
        idCliente: [''],
        nombreCompleto: ['', [Validators.required]],
        direccion: ['', [Validators.required]],
        telefono:['', [Validators.required, Validators.maxLength(10)]],
        email: ['', [Validators.required, Validators.email]],
        tipoCliente: ['nacional', [Validators.required]]
      });
    }

    public enviarFormulario(){
      if (this.formulario.invalid) {
        this.formulario.markAllAsTouched();
        return;
      }

      switch (this.opcionBoton) {
        case 0:
          this.servicioClientes.storeCliente(this.formulario.value).subscribe({
            next: data => this.getTodosClientes(),
            error: err => console.error("Error al obtener clientes:", err),
            complete: () => this.formulario.reset()
          })
          this.opcionBoton = 0;
          break;
        case 1:
          this.servicioClientes.actualizarCliente(this.formulario.value).subscribe({
            next: data => this.getTodosClientes(),
            error: err => console.error("Error al obtener clientes:", err),
            complete: () => {
              this.formulario.reset();
              this.opcionBoton = 0;
            }
          })
          
          break;
        
        case 2:
          this.servicioClientes.borrarCliente(this.formulario.value).subscribe({
            next: data => this.getTodosClientes(),
            error: err => console.error("Error al obtener clientes:", err),
            complete: () => this.formulario.reset()
          })
          this.opcionBoton = 0;
          break;

        default:
          break;
      }

      
    }

    public obtenerCliente(data:Cliente, opcion:number){
      console.log(data);
      this.opcionBoton = opcion;
      this.formulario.setValue({
        idCliente: data.idCliente,
        nombreCompleto: data.nombreCompleto,
        direccion: data.direccion,
        telefono: data.telefono,
        email: data.email,
        tipoCliente: data.tipoCliente
      })
    }
  
}
