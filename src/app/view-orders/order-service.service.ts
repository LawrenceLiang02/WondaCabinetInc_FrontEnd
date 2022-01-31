import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { order } from './order';


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
    return this.http.get<order[]>(`${this.apiServerUrl}/email/${email}`);
  }

  public getAllCancelledOrdersByEmail(email: string): Observable<order[]>{
    return this.http.get<order[]>(`${this.apiServerUrl}/email/cancelled/${email}`);
  }

  public getAllActiveOrdersByEmail(email: string): Observable<order[]>{
    return this.http.get<order[]>(`${this.apiServerUrl}/email/active/${email}`);
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
}
