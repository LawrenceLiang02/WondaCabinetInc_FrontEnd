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
  
  public getAllOrders(): Observable<order[]>{
        return this.http.get<order[]>(`${this.apiServerUrl}/orders`)
    }

    public getOrder(id: number): Observable<order> {
      return this.http.get<order>(`${this.apiServerUrl}/orders/${id}`)
  }

  public addOrder(order:order):Observable<order>{
    return this.http.post<order>(`${this.apiServerUrl}/orders`, order)
  }
}
