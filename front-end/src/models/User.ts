class User {
    private userId : number;
    private userName : string;
    private firstName : string;
    private lastName : string;
    private email : string;
    private rating : number;

    constructor(data : any[]) {
        this.userId = data[0];
        this.userName = data[1];
        this.firstName = data[2];
        this.lastName = data[3];
        this.email = data[4];
        this.rating = data[5];
    }

    getUserId() : number {
        return this.userId;
    }
    getUsername() : string {
        return this.userName;
    }
    getFirstName() : string {
        return this.firstName;
    }
    getLastName() : string {
        return this.lastName;
    }
    getFullName() : string {
        return this.firstName + ' ' + this.lastName;
    }
    getEmail() : string {
        return this.email;
    }
    getRating() : number {
        return this.rating;
    }
}
export {User}
