import { NumberValueAccessor } from "@angular/forms";

export interface Pagination {
    currnetPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T>{
    result:T;
    pagination:Pagination


}