import { type StateSchema } from "app/providers/StoreProvider/config/StateSchema"

export const getProductsDetailState = (state: StateSchema) => state.product.productDetail
