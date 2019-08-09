class Category {
    private id : number;
    private name : string;
    private description : string;

    constructor(data : any[]) {
        this.id = data[0];
        this.name = data[1];
        this.description = data[2];
    }

    getId() : number {
        return this.id;
    }
    getName() : string {
        return this.name;
    }
    getDescription() : string {
        return this.description;
    }
}

export {Category};