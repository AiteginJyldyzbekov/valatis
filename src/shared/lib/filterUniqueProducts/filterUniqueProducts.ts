import { ProductTypes } from "entities/Product/model/types/ProductSchema";

function filterUniqueProducts(products: ProductTypes[]) {
    const uniqueProducts: ProductTypes[] = [];
    const uniqueIds = new Set<string>();

    for (const product of products) {
        if (!uniqueIds.has(product.id)) {
            uniqueIds.add(product.id);
            uniqueProducts.push(product);
        }
    }

    return uniqueProducts;
}

export default filterUniqueProducts;