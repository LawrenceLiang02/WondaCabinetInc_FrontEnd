import { orderdetails } from "./orderdetails";


export interface order{
    orderId: number;
    cabinetType :string;
    color:string;
    material:string;
    orderStatus :string;
    trackingNo:number;
    design:string;
}