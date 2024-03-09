import { type StateSchema } from "app/providers/StoreProvider/config/StateSchema"

export const getProductsIdsState = (state: StateSchema) => state.product.productsIds
