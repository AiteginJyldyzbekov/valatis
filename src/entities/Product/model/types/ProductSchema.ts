export interface ProductTypes {
    brand: string | null;
    id: string;
    price: number;
    product: string;
}

export interface ProductSchema {
    products: {
        isLoading: boolean;
        error?: string;
        result: ProductTypes[];
    },
    productDetail: {
        isLoading: boolean;
        error?: string;
        result: ProductTypes | null;
    },
    productsIds: {
        isLoading: boolean;
        error?: string;
        ids: Array<string>;
    },
    productsBrands: {
        isLoading: boolean;
        error?: string;
        result: Array<string>;
    },
    productsNames: {
        isLoading: boolean;
        error?: string;
        result: Array<string>;
    },
    isFilter: boolean
}

export enum filterTypes {
    PRODUCT = "product",
    BRAND = "brand",
    PRICE = "price"
}
