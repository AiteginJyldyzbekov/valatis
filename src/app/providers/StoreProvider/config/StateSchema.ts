import { PaginationSchema } from "entities/Pagination/model/types/PaginationSchema";
import { ProductSchema } from "entities/Product/model/types/ProductSchema";

export interface StateSchema {
    product: ProductSchema
    pagination: PaginationSchema
}