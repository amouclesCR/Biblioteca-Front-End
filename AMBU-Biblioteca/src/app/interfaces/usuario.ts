import { Rol } from './rol';

export interface Usuario {
    id: number;
    password: string;
    cus_identificacion: string;
    username?: string;
    email: string;
    cus_rol: number;
    cus_rol_modelo: Rol;
}