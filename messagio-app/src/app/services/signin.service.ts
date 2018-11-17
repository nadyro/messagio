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

    getUserByEmail(user: any):Observable<Users[]>{
        return (this.http.put(`${this.signin_url}`, user).pipe(map(res => {
            if (res['exists'] == true)
                return (res as Users[]);
            else
                return null;
        })))
    }

    getSession(user: any):Observable<any>{
        console.log("test");
        return (this.http.put(`${this.signin_url}`, user).pipe(map(res => {
            console.log(res);
            return res;
        })))
    }

}
