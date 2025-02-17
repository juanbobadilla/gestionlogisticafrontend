import { Component, inject, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/productos/producto.service';
import { Producto } from '../../modelos/producto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{

    private servicioProducto = inject(ProductoService);
    public datosProductos:Producto[] = [];

    ngOnInit(): void {
      this.getTodosProductos();
    }

    public getTodosProductos(){
      this.servicioProducto.getTodosProductos().subscribe(
        (respuesta:any)=>{
          this.datosProductos = respuesta["data"]; 
        }
      );
    }
}
