import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:typedef
  getToken(params?) {
    return this.http.get('user/me', {
      params
    });
  }
  // tslint:disable-next-line:typedef
  saveUser(data){
    return this.http.post('/user/signup', data);
  }
  // tslint:disable-next-line:typedef
  saveProfile(data){
    return this.http.put('/user/profile', data);
  }
  // tslint:disable-next-line:typedef
  loginUser(params) {
    return this.http.post('/user/signin', params);
  }
  // tslint:disable-next-line:typedef
  getUser(params?) {
    console.log('params', params);
    if (params){
      return this.http.get('/user', {
        params
      });
    }else{
      return this.http.get('/user/me');
    }
  }
}
