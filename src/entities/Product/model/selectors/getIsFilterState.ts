import { type StateSchema } from "app/providers/StoreProvider/config/StateSchema"

export const getIsFilterState = (state: StateSchema) => state.product.isFilter
