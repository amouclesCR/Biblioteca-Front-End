import { Usuario } from './usuario';
import { Activo } from './activo';

export interface Solicitud {
    id: number;
    sbja_fecha_solicitud: Date;
    sbja_estado_solicitud: boolean;
    sbja_usuario: number;
    sbja_usuario_nuevo: number;
    sbja_activos: number[];
    sbja_numero_formulario: string;
    sbja_solicitud_traspaso: boolean;
    sbja_usuario_modelo: Usuario;
    sbja_nuevoUsuario_modelo: Usuario;
    sbja_activos_modelos: Activo[];
}