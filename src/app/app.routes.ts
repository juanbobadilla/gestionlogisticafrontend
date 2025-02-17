import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'', loadComponent: ()=> import('../app/components/login/login.component').then(c => c.LoginComponent) },
    {path:'clientes', loadComponent: ()=> import('../app/components/cliente/cliente.component').then(c => c.ClienteComponent) },
    {path:'productos', loadComponent: ()=> import('../app/components/productos/productos.component').then(c => c.ProductosComponent) },

];
