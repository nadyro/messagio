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

  parsingDate(str = null) {
    if (str == null)
      var date = new Date();
    else
      var date = new Date(str);
    
    var minutes;
    if (date.getMinutes() < 10)
      minutes = "0" + date.getMinutes();
    else
      minutes = "" + date.getMinutes();

    var months = [
      "Jan.", "Feb.", "Mar.", "Apr.",
      "May", "Jun.", "Jul.", "Sep.",
      "Oct.", "Nov.", "Dec."
    ];
    var full_date = "" + date.getDate() + " " + months[date.getUTCMonth() - 1] + " " + date.getUTCFullYear() + " at " + date.getHours() + " : " + minutes;
    return (full_date);
  }

  createMessagio(messagio: Messagio): Observable<any> {
    console.log("Service");
    console.log(this.http.post(`${this.messagioUrl}`, messagio));
    return this.http.post(`${this.messagioUrl}`, messagio);
  }

  getMessagios(): Observable<Messagio[]> {
    var mess;
    return this.http.get(this.messagioUrl)
      .pipe(map(res => {
        mess = res["data"].docs as Messagio[];
        mess.forEach(element => {
          element.date = this.parsingDate(element.date);
        });
        return mess;
      }))
  }
  editMessagio(messagio: Messagio) {
    let editUrl = `${this.messagioUrl}`
    return this.http.put(editUrl, messagio);
  }

  deleteMessagio(id: string): any {
    let deleteUrl = `${this.messagioUrl}/${id}`
    return this.http.delete(deleteUrl)
      .pipe(map(res => {
        return res;
      }))
  }

}
