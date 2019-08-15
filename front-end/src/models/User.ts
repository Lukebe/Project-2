class User {
    private userId : number;
    private userName : string;
    private firstName : string;
    private lastName : string;
    private email : string;
    private phone : string;
    private rating : number;

    constructor(data : any) {
        this.userId = data.userid;
        this.userName = data.username;
        this.firstName = data.firstname;
        this.lastName = data.lastname;
        this.email = data.email;
        this.phone = data.phone;
        this.rating = data.rating;
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
    getPhone() : string {
        return this.phone;
    }
    getRating() : number {
        return this.rating;
    }
}
export {User}
