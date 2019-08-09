import {Category} from './Category';
import {Product} from './Product';
import {User} from './User';
import {Status} from './Status';
class Job {
    private jobId : number;
    private userCreated : User;
    private address : string;
    private description : string;
    private dateCreated : Date;
    private dateAccepted : Date | undefined;
    private jobDateTime : Date;
    private userAccepted : User | undefined;
    private jobPrice : number;
    private category : Category;
    private timeEstimate: Date;
    private product : Product;
    private status : Status;

    constructor(data : any[]) {
        this.jobId = data[0];
        this.userCreated = data[1];
        this.address = data[2];
        this.description = data[3];
        this.dateCreated = new Date(data[4]);
        this.dateAccepted = new Date(data[5]);
        this.jobDateTime = new Date(data[6]);
        this.userAccepted = new User(data[7]);
        this.jobPrice = data[8];
        this.category = data[9];
        this.timeEstimate = new Date(data[10]);
        this.product = new Product(data[11]);
        this.status = new Status(data[12]);
    }

    getJobId() : number {
        return this.jobId;
    }
    getUserCreated() : User {
        return this.userCreated;
    }
    getAddress() : string {
        return this.address;
    }
    getDescription() : string {
        return this.description;
    }
    getDateCreated() : Date {
        return this.dateCreated;
    }
    getDateAccepted() : Date | undefined {
        return this.dateAccepted;
    }
    getJobDateTime() : Date{
        return this.jobDateTime;
    }
    getUserAccepted() : User | undefined {
        return this.userAccepted;
    }
    getJobPrice() : number {
        return this.jobPrice;
    }
    getCategory() : Category {
        return this.category;
    }
    getTimeEstimate() : Date {
        return this.timeEstimate;
    }
    getProduct() : Product {
        return this.product;
    }
    getStatus() : Status {
        return this.status;
    }
}

export {Job};