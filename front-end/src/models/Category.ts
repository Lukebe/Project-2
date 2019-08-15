class Category {
    private categoryId : number;
    private name : string;
    private description : string;

    constructor(data : any) {
        this.categoryId = data.categoryId;
        this.name = data.name;
        this.description = data.description;
    }

    getCategoryId() : number {
        return this.categoryId;
    }
    getName() : string {
        return this.name;
    }
    getDescription() : string {
        return this.description;
    }
}

export {Category};