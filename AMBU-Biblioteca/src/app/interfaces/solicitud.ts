import { Usuario } from './usuario';

export interface Solicitud {
    id: number;
    sbja_fecha_solicitud: Date;
    sbja_estado_solicitud: boolean;
    sbja_usuario: number;
    sbja_usuario_nuevo: number;
    sbja_activos: number[];
    sbja_numero_formulario: string;
}