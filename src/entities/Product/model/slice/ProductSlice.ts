import { createSlice } from '@reduxjs/toolkit'
import { type ProductSchema } from '../types/ProductSchema'
// import { getCarById } from '../services/getCarById/getCarById'
import { getProducts } from '../services/getProducts'
import { getProductsId } from '../services/getProductsId'
import { getFilteredIds } from '../services/getFilteredIds'
import { getProductsBrands } from '../services/getProductsBrands'
import { getProductsNames } from '../services/getProductsNames'
import { getProductDetail } from '../services/getProductDetail'


const initialState: ProductSchema = {
    products: {
        isLoading: false,
        error: '',
        result: []
    },
    productDetail: {
        isLoading: false,
        error: '',
        result: null
    },
    productsIds: {
        isLoading: false,
        error: '',
        ids: []
    },
    productsBrands: {
        isLoading: false,
        error: '',
        result: []
    },
    productsNames: {
        isLoading: false,
        error: '',
        result: []
    },
    isFilter: false
}

export const productSlice = createSlice({
    name: 'create/car',
    initialState,
    reducers: {
        updateProductIds: (state, action) => {
            state.productsIds.ids = action.payload;
        },
        setFilter: (state, action) => {
            state.isFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            // Get products
            .addCase(getProducts.pending, (state) => {
                state.products.error = undefined
                state.products.isLoading = true
                console.log('pending')
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.products.result = action.payload
                state.products.isLoading = false
            })
            .addCase(getProducts.rejected, (state, action) => {
                console.log('rejected')
                state.products.isLoading = false
                state.products.error = action.payload
            })

            //Get products ids
            .addCase(getProductsId.pending, (state) => {
                state.productsIds.error = undefined
                state.productsIds.isLoading = true
                console.log('pending')
            })
            .addCase(getProductsId.fulfilled, (state, action) => {
                state.productsIds.ids = action.payload
                state.productsIds.isLoading = false
            })
            .addCase(getProductsId.rejected, (state, action) => {
                console.log('rejected')
                state.productsIds.isLoading = false
                state.productsIds.error = action.payload
            })

            // Get filtered ids
            .addCase(getFilteredIds.pending, (state) => {
                state.productsIds.error = undefined
                state.productsIds.isLoading = true
                console.log('pending')
            })
            .addCase(getFilteredIds.fulfilled, (state, action) => {
                console.log('fulfilled')
                if (action.payload.length === 0) {
                    state.products.result = []
                }
                state.productsIds.ids = action.payload
                state.productsIds.isLoading = false
            })
            .addCase(getFilteredIds.rejected, (state, action) => {
                console.log('rejected')
                state.productsIds.isLoading = false
                state.productsIds.error = action.payload
            })

            //Get products brands

            .addCase(getProductsBrands.pending, (state) => {
                state.productsBrands.error = undefined
                state.productsBrands.isLoading = true
                console.log('pending')
            })
            .addCase(getProductsBrands.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.productsBrands.result = action.payload
                state.productsBrands.isLoading = false
            })
            .addCase(getProductsBrands.rejected, (state, action) => {
                console.log('rejected')
                state.productsBrands.isLoading = false
                state.productsBrands.error = action.payload
            })

            //Get products names

            .addCase(getProductsNames.pending, (state) => {
                state.productsNames.error = undefined
                state.productsNames.isLoading = true
                console.log('pending')
            })
            .addCase(getProductsNames.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.productsNames.result = action.payload
                state.productsNames.isLoading = false
            })
            .addCase(getProductsNames.rejected, (state, action) => {
                console.log('rejected')
                state.productsNames.isLoading = false
                state.productsNames.error = action.payload
            })

            // Get product detail
            .addCase(getProductDetail.pending, (state) => {
                state.productDetail.error = undefined
                state.productDetail.isLoading = true
                console.log('pending')
            })
            .addCase(getProductDetail.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.productDetail.isLoading = false
                state.productDetail.result = action.payload
            })
            .addCase(getProductDetail.rejected, (state, action) => {
                console.log('rejected')
                state.productDetail.isLoading = false
                state.productDetail.error = action.payload
            })
    }
})

export const { actions: productActions } = productSlice
export const { reducer: productReducer } = productSlice
