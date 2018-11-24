import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable()
export class MessagioSocketService {

    // Our socket connection
    private socket;

    constructor() { }

    sendMessage(message) {
        this.socket.emit("add-messagio", message);
    }
    getMessage() {
        let observable = new Observable(observer => {
            this.socket = io(environment.ws_url, { transports: ['websocket'] });
            this.socket.on('messagio', (data) => {
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });
        return (observable);
    }

}