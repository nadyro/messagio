class Messagio {
    _id: string;
    title: string;
    content: string;
    date: string;
    full_date: number;
    position: number;
    status: string;
    emitter: string;
    receiver: string;

    constructor(
    ){
        this.title = ""
        this.content = ""
        this.date = "";
        this.full_date = 0;
        this.position = 0;
        this.status = ""
        this.emitter = "";
        this.receiver = "";
}
}

export default Messagio;