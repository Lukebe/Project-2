class Status {
    private statusId : number;
    private status : string;

    constructor(data : any) {
        this.statusId = data.statusId;
        this.status = data.status;
    }

    getStatusId() : number {
        return this.statusId;
    }
    getStatus() : string {
        return this.status;
    }
}
export {Status}
