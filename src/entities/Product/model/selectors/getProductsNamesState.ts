import { type StateSchema } from "app/providers/StoreProvider/config/StateSchema"

export const getProductsNamesState = (state: StateSchema) => state.product.productsNames
