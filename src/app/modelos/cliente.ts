export interface Cliente{
    idCliente: number;
    nombreCompleto: string;
    direccion: string;
    telefono: string;
    email: string;
    tipoCliente: 'nacional' | 'internacional';
}