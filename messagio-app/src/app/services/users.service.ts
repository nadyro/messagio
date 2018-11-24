import Users from '../models/users.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
    constructor(
        private http: HttpClient
    ) { }

    api_url = "http://localhost:3000";
    users_api = `${this.api_url}/api/users`;

    updateUsers(user: Users): Observable<any> {
        return (this.http.put(`${this.users_api}`, user));
    }
    createUsers(user: Users): Observable<any> {
        return (this.http.post(`${this.users_api}`, user));
    }
    getUsers(): Observable<Users[]> {
        return (this.http.get(this.users_api).pipe(map(res => {
            return res['data'].docs as Users[];
        })));
    }
}
