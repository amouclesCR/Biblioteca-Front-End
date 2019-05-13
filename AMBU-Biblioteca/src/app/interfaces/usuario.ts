import { Rol } from './rol';

export interface Usuario {
    id: number;
    usu_clave: string;
    usu_identificacion: string;
    usu_nombre: string;
    usu_correo: string;
    usu_rol: number;
    usu_rol_modelo: Rol;
}