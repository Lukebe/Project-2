import {Category} from './Category';
class Product {
    private itemId : number;
    private description : string;
    private itemName : string;
    private category : Category;
    private price : number;

    constructor(data : any[]) {
        this.itemId = data[0];
        this.description = data[1];
        this.itemName = data[2];
        this.category = data[3];
        this.price = data[4];
    }

    getItemId() : number {
        return this.itemId;
    }
    getDescription() : string {
        return this.description;
    }
    getItemName() : string {
        return this.itemName;
    }
    getCategory() : Category {
        return this.category;
    }
    getPrice() : number {
        return this.price;
    }
}

export {Product};