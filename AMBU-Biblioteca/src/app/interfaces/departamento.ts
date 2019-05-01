import { Seccion } from './seccion';

export interface Departamento {
    id: number;
    ubi_nombre: string;
    ubi_seccion_id: number;
    ubi_seccion: Seccion;
}
