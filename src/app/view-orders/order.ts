import { orderdetails } from "./orderdetails";


export interface order{
    orderId: number;
    orderDetails:orderdetails;
    orderStatus :string;
    trackingNo:number;
    design:string;
}