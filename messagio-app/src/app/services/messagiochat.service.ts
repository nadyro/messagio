/*import { Injectable } from "@angular/core";
import { MessagioSocketService } from "./messagiosocket.service";
import { Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';


@Injectable()
export class MessagioChatService {
    messagios: Subject<any>;

    constructor(private wsService: MessagioSocketService) {
        this.messagios = <Subject<any>>wsService.connect().pipe(map((response: any): any => {
            return response;
        }));
    }

    sendMessagios(msg) {
        console.log(msg);
        return (this.messagios.next(msg));
    }
}*/