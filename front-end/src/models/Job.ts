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

    constructor(data : any) {
        this.jobId = data.jobId;
        this.userCreated = new User(data.userCreated);
        this.address = data.address;
        this.description = data[3];
        this.dateCreated = new Date(data.dateCreated);
        this.dateAccepted = new Date(data.dateAccepted);
        this.jobDateTime = new Date(data.jobDateTime);
        this.userAccepted = new User(data.userAccepted);
        this.jobPrice = data.jobPrice;
        this.category = new Category(data.category);
        this.timeEstimate = new Date(data.timeEstimate);
        this.product = new Product(data.product);
        this.status = new Status(data.status);
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