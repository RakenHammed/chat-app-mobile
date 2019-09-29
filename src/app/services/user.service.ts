import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private urlService: UrlService,
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    const params = {
      email,
      password,
    };
    return this.http.post(`${this.urlService.url}/api/v1/users/login`, params);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlService.url}/api/v1/users/`);
  }

}
