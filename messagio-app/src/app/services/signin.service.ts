import Users from '../models/users.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SigninService {
    constructor (private http: HttpClient) {

    }
    api_url = "http://localhost:3000";
    signin_url = `${this.api_url}/api/signin`;
    getUserByEmail(user: Users):Observable<Users[]>{
        return (this.http.put(`${this.signin_url}`, user).pipe(map(res => {
            if (res['exists'] == true)
                return (res['data'] as Users[]);
            else
                return null;
        })))
    }
}
