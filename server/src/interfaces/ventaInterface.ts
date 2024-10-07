import { productVentaInterface } from "./productVentas"
export interface VentaInterface {
    fecha:Date,
    idEmployeed:string,
    productos:productVentaInterface[]
}