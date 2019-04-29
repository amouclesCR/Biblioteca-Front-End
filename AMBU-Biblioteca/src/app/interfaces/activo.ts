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
    act_estatus: string;
    act_costo: string;
    act_organizacion: string;
    act_subestatus: string;
    act_usuario_responsabe: number;
    act_usuario: Usuario;
    act_seccion: number;
    act_seccion_modelo: Seccion;
}
