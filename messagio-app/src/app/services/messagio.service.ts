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


  //Create todo, takes a ToDo Object
  createMessagio(messagio: Messagio): Observable<any>{
    //returns the observable of http post request 
    return this.http.post(`${this.messagioUrl}`, messagio);
  }

  //Read todo, takes no arguments
  getMessagios(): Observable<Messagio[]>{
    return this.http.get(this.messagioUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
        
      return res["data"].docs as Messagio[];
    }))
  }
  //Update todo, takes a ToDo Object as parameter
  editMessagio(messagio:Messagio){
    let editUrl = `${this.messagioUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, messagio);
  }

  deleteMessagio(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.messagioUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  //Default Error handling method.
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
