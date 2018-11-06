class Messagio {
    _id: string;
    title: string;
    content: string;
    date: string;
    position: number;
    status: string;
    emitter: string;
    receiver: string;

    constructor(
    ){
        this.title = ""
        this.content = ""
        this.date = "";
        this.position = 0;
        this.status = ""
        this.emitter = "";
        this.receiver = "";
}
}

export default Messagio;