class Status {
    private statusId : number;
    private status : string;

    constructor(data : any[]) {
        this.statusId = data[0];
        this.status = data[1];
    }

    getStatusId() : number {
        return this.statusId;
    }
    getStatus() : string {
        return this.status;
    }
}
export {Status}
