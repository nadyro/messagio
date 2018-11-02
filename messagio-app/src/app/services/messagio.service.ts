import Messagio from '../models/messagio.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable()
export class MessagioService {
    api_url = "http://localhost:3000";
    messagioUrl = `${this.api_url}/api/messagio`;

    constructor(
        private http: HttpClient
    ) { }


  createMessagio(messagio: Messagio): Observable<any>{
    console.log("Service");
    return this.http.post(`${this.messagioUrl}`, messagio);
  }

  getMessagios(): Observable<Messagio[]>{
    return this.http.get(this.messagioUrl)
    .pipe(map(res  => {
      return res["data"].docs as Messagio[];
    }))
  }
  editMessagio(messagio:Messagio){
    let editUrl = `${this.messagioUrl}`
    return this.http.put(editUrl, messagio);
  }

  deleteMessagio(id:string):any{
    let deleteUrl = `${this.messagioUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

}
