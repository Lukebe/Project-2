import {Category} from './Category';
import {Product} from './Product';
import {User} from './User';
import {Status} from './Status';
class Job {
    private jobId : number;
    private userCreated : User;
    private address : string;
    private dropoffAddress : string;
    private description : string;
    private dateCreated : Date;
    private dateAccepted : Date;
    private jobDateTime : Date;
    private userAccepted : User;
    private jobEarnings : number;
    private category : Category;
    private timeEstimate: string;
    private product : Product;
    private status : Status; 

    constructor(data : any) {
        this.jobId = data.jobId;
        if(data.userCreated) {
            this.userCreated = new User(data.userCreated);
        }else {
            this.userCreated = new User({userId: 0, username: '', firstname: '',
            lastname: '', email: '', phone : '', rating: 0});
        }
        this.address = data.address;
        this.dropoffAddress = data.dropoffAddress;
        this.description = data.description;
        this.dateCreated = new Date(data.dateCreated);
        this.dateAccepted = new Date(data.dateAccepted);
        this.jobDateTime = new Date(data.jobDateTime);
        if(data.userAccepted) {
            this.userAccepted = new User(data.userAccepted);
        } else {
            this.userAccepted = new User({userId: 0, username: '', firstname: '',
            lastname: '', email: '', phone : '', rating: 0});
        }
        this.jobEarnings = data.jobEarnings;
        if(data.category) {
            this.category = new Category(data.category);
        } else {
            this.category = new Category({categoryId: 0, name: '', description: ''});
        }
        this.timeEstimate = data.timeEstimate;
        if(data.product) {
            this.product = new Product(data.product);
        } else {
            this.product = new Product({productId: 0, description: '', itemName: '',
        imageUrl: '', category: new Category({categoryId: 0, name: '', description: ''}),
        price: 0});
        }
        if(data.status) {
            this.status = new Status(data.status);
        } else {
            this.status = new Status({statusId: 0, status: ''});
        }
    }

    getJobId() : number {
        return this.jobId;
    }
    getUserCreated() : User | undefined {
        return this.userCreated;
    }
    getAddress() : string {
        return this.address;
    }
    getDropoffAddress() : string {
        return this.dropoffAddress;
    }
    getExpectedTime() : Date {
        let dateObj : any = this.jobDateTime.getTime();
        dateObj += parseInt(this.timeEstimate);
// create a new Date object, using the adjusted time
        dateObj = new Date(dateObj);
        return dateObj;
    }
    getDescription() : string {
        return this.description;
    }
    getDateCreated() : Date {
        return this.dateCreated;
    }
    getDateAccepted() : Date {
        return this.dateAccepted;
    }
    getJobDateTime() : Date{
        return this.jobDateTime;
    }
    getUserAccepted() : User {
        return this.userAccepted;
    }
    getJobEarnings() : number {
        return this.jobEarnings;
    }
    getCategory() : Category {
        return this.category;
    }
    getTimeEstimate() : string {
        return this.timeEstimate;
    }
    getProduct() : Product {
        return this.product;
    }
    getStatus() : Status{
        return this.status;
    }
}

export {Job};