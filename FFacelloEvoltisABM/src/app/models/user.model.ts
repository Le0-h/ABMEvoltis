export interface User {
    id?: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;
  rol?: string;
  activo: boolean;
  fechaCreacion?: Date;
}
