import { Injectable } from '@angular/core';
//import * as Rx from 'rxjs';
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
            this.socket = io(environment.ws_url);
            this.socket.on('messagio', (data) => {
                console.log("Received message from Websocket Server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });
        return (observable);
    }
   /* connect(): Rx.Subject<MessageEvent> {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = io(environment.ws_url);

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        let observable = new Observable(observer => {
            this.socket.on('messagio', (data) => {
                console.log("Received message from Websocket Server")
                observer.next(data);
            })
            return () => {
                this.socket.disconnect();
            }
        });

        // We define our Observer which will listen to messages
        // from our other components and send messages back to our
        // socket server whenever the `next()` method is called.
        let observer = {
            next: (data: Object) => {
                this.socket.emit('messagio', data);
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }*/

}