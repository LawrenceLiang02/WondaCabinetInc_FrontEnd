import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private http: HttpClient) {}
  private apiServerUrl = environment.apiBaseUrl;
  public AUTH_API = `${this.apiServerUrl}/auth/`;
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }


  signup(firstName: string, lastName: string, phone: string,username: string, email: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup',{
      firstName,
      lastName,
      phone,
      username,
      email,
      password
    }, httpOptions);
  }


  
   loginNoToken(username: string, password: string): Observable<any> {
    return this.http.post(this.AUTH_API + 'loginnotoken', {
      username,
      password
    }, httpOptions);
  }




  refreshToken(token: string) {
    return this.http.post(this.AUTH_API + 'refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
 
  passwordToken(email: string){
    return this.http.post(this.AUTH_API + 'passwordtoken', {
      email
    }, httpOptions)
  }

  resetPassword(passwordToken: string, newPassword: string){
    return this.http.post(this.AUTH_API + 'resetpassword', {
      passwordToken,
      newPassword
    }, httpOptions)
  }
}