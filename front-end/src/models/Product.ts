import {Category} from './Category';
class Product {
    private productId : number;
    private description : string;
    private itemName : string;
    private category : Category;
    private imageUrl : string;
    private price : number;

    constructor(data : any) {
        this.productId = data.productId;
        this.description = data.description;
        this.itemName = data.itemName;
        this.imageUrl = data.imageUrl;
        this.category = new Category(data.category);
        this.price = data.price;
    }

    getProductId() : number {
        return this.productId;
    }
    getDescription() : string {
        return this.description;
    }
    getItemName() : string {
        return this.itemName;
    }
    getImageUrl() : string {
        return this.imageUrl;
    }
    getCategory() : Category {
        return this.category;
    }
    getPrice() : number {
        return this.price;
    }
}

export {Product};