class Messagio {
    _id: string;
    title: string;
    content: string;
    date: Date;
    status: string;
    emitter: string;
    receiver: string;

    constructor(
    ){
        this.title = ""
        this.content = ""
        this.date = new Date()
        this.status = ""
        this.emitter = "";
        this.receiver = "";
}
}

export default Messagio;