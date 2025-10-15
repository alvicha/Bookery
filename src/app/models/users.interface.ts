export interface Users {
    users: UserInfo[];
}

export interface UserInfo {
    id?: number;
    nombre: string;
    apellidos: string;
    email: string;
    fecha_nacimiento: FechaNacimiento;
    password: string;
    telefono: string;
    rol: string;
}

export interface FechaNacimiento {
    date: Date;
    timezone_type: number;
    timezone: string;
}
