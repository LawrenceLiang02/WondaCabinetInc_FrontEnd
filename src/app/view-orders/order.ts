import { orderdetails } from "./orderdetails";


export interface order{
    orderId: number;
    cabinetType :string;
    color:string;
    material:string;
    orderStatus :string;
    trackingNo:string;
    design:string;
    handleType:string;
    email:string;
    address:string;
    city:string;
    orderDate:string;
    deliveryDate:string;
}

export interface orderByTrackingNo{
    orderStatus :string;
    trackingNo:string;
}