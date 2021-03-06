import { Usuario } from './usuario';
import { Seccion } from './seccion';

export interface Activo {
    id: number;
    act_descripcion: string;
    act_observacion: string;
    act_numero_activo: string;
    act_color: string;
    act_serie: string;
    act_modelo: string;
    act_marca: string;
    act_estatus: boolean;
    act_costo: string;
    act_usuario_responsabe: number;
    act_usuario: Usuario;
    act_seccion: number;
    act_seccion_modelo: Seccion;
    act_Fecha_Creacion?: Date;
}
