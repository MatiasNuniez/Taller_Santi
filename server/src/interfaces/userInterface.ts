import { UserTypes } from "../enums/userTypes";
export interface UserInterface{
    nombre:string;
    apellido:string;
    telefono:string;
    direccion:string;
    rol:UserTypes;
    password:string;
    DNI:string;
    state:boolean;
}