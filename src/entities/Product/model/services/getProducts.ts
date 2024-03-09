import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ProductTypes } from '../types/ProductSchema'
import { sendRequest } from 'shared/lib/requestAuth/requestAuth'
import filterUniqueProducts from 'shared/lib/filterUniqueProducts/filterUniqueProducts';

interface GetProductsProps {
    ids: Array<string>;
}
export const getProducts = createAsyncThunk<ProductTypes[], GetProductsProps, { rejectValue: string }>(
    'get/products',
    async (data) => {
        const { ids } = data;

        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProducts = async (attempt: number): Promise<ProductTypes[]> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'get_items',
                        params: { ids },
                    },
                });

                const uniqueProducts = filterUniqueProducts(response.result);
                return uniqueProducts;
            } catch (e) {
                console.error("PROD ERROR");
                console.error(e);
                if (attempt < 3) {
                    return fetchProducts(attempt + 1); // Повторяем запрос, если количество попыток меньше 3
                } else {
                    throw new Error('Maximum retry attempts exceeded');
                }
            }
        };

        return fetchProducts(1);
    }
);