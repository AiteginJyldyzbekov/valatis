import { type StateSchema } from "app/providers/StoreProvider/config/StateSchema"

export const getProductsState = (state: StateSchema) => state.product.products
