export default class Pagination {
    private totalPages : number;
    private totalElements : number;
    private last : boolean;
    private pageSize : number;
    private pageNumber : number;
    private numberOfElements: number;
    private first : boolean;
    private empty : boolean;
    constructor(data:any){
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.last = data.last;
        this.pageSize = data.size;
        this.pageNumber = data.number;
        this.numberOfElements = data.numberOfElements;
        this.first = data.first;
        this.empty = data.empty
    }
    getTotalPages() : number {
        return this.totalPages;
    }
    getHumanFriendlyTotalPages() : number {
        return this.pageNumber + 1;
    }
    getTotalElements() : number {
        return this.totalElements;
    }
    isLastPage() : boolean {
        return this.last;
    }
    getPageSize() : number {
        return this.pageSize;
    }
    getPageNumber() : number {
        return this.pageNumber;
    }
    getHumanFriendlyPageNumber() : number {
        return this.pageNumber + 1;
    }
    getNumberOfElements() : number {
        return this.numberOfElements;
    }
    isFirstPage() : boolean {
        return this.first;
    }
    isEmpty() : boolean {
        return this.empty;
    }
}