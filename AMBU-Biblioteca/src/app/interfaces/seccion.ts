import { NumberValueAccessor } from '@angular/forms/src/directives';
import { Departamento } from './departamento';

export interface Seccion {
    id: number;
    sec_nombre: string;
    sec_departamento_modelo: Departamento;
}
