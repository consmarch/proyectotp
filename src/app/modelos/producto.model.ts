
export interface Producto{
    id:number;
    nombre:string;
    descripcion:string;
    precio:number;
    disponibilidad:boolean;
    cantidad?:number;
    img: string;
}