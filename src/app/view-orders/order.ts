import { orderdetails } from "./orderdetails";


export interface order{
    orderId: number;
    orderdetails:orderdetails;
    orderStatus :string;
    trackingNo:number;
    design:string;
}