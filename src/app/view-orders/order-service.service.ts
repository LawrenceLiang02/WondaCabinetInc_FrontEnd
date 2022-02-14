import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { order, orderByTrackingNo } from './order';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  
  public getAllActiveOrders(): Observable<order[]>{
        // return this.http.get<order[]>(`${this.apiServerUrl}/orders`)
        return this.http.get<order[]>(`${this.apiServerUrl}/orders/active`)
    }

  public getAllCancelledOrders(): Observable<order[]>{
      // return this.http.get<order[]>(`${this.apiServerUrl}/orders`)
      return this.http.get<order[]>(`${this.apiServerUrl}/orders/cancelled`)
  }

  public getAllOrdersByEmail(email: string): Observable<order[]>{
    return this.http.get<order[]>(`${this.apiServerUrl}/orders/email/${email}`);
  }

  public getAllCancelledOrdersByEmail(email: string): Observable<order[]>{
    return this.http.get<order[]>(`${this.apiServerUrl}/orders/email/cancelled/${email}`);
  }

  public getAllActiveOrdersByEmail(email: string): Observable<order[]>{
    return this.http.get<order[]>(`${this.apiServerUrl}/orders/email/active/${email}`);
  }

  public getAllOrders(): Observable<order[]>{
    // return this.http.get<order[]>(`${this.apiServerUrl}/orders`)
    return this.http.get<order[]>(`${this.apiServerUrl}/orders`)
}

    public getOrder(id: number): Observable<order> {
      return this.http.get<order>(`${this.apiServerUrl}/orders/${id}`)
  }

  public addOrder(order:order):Observable<order>{
    return this.http.post<order>(`${this.apiServerUrl}/orders`, order)
  }

  public updateOrder(id:number,order:order):Observable<order>{
    return this.http.put<order>(`${this.apiServerUrl}/orders/${id}`, order)
  }

  public getOrderByTrackingNo(trackingNo:number):Observable<orderByTrackingNo>{
    return this.http.get<orderByTrackingNo>(`${this.apiServerUrl}/orders/track/${trackingNo}`)
  }

  public deleteOrder(id:number){
    return this.http.delete(`${this.apiServerUrl}/orders/delete/${id}`)
  }

  public requestUpdate(trackingNo: number, body: string){
    return this.http.post(`${this.apiServerUrl}/orders/updaterequest`, {
      trackingNo,
      body
    })
  }

  public requestCancellation(trackingNo: number, body: string){
    return this.http.post(`${this.apiServerUrl}/orders/cancelrequest`, {
      trackingNo,
      body
    })
  }
}
