export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    rol: Rol;
}

export interface Rol {
    id: number;
    rol: string;
}