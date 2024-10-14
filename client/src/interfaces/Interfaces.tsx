export interface productInterface {
    nombre: string;
    descripcion: string;
    costo: number;
    precio_u: number;
    idProvider: string;
    categoria: string; 
    marca:string;
    img:string;
    cantidad:number;
}

export interface productsInterface {
    _id:string;
    nombre: string;
    descripcion: string;
    costo: number;
    precio_u: number;
    idProvider: string;
    categoria: string; 
    marca:string;
    img:string;
}

export interface ProvidersInterface {
    nombre:string;
    apellido:string;
    cuit:string;
    telefono:string;
    email:string;
    direccion:string;
}

export interface categoryInterface {
    _id:string;
    nombre: string;
    marca:string;
    urlImg:string;
}

export interface ProviderInterface {
    _id:string;
    nombre:string;
    apellido:string;
    email:string;
    direccion:string;
    telefono:string;
    cuit:string;
}