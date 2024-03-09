import { createAsyncThunk } from '@reduxjs/toolkit'
import { type ProductTypes } from '../types/ProductSchema'
import { sendRequest } from 'shared/lib/requestAuth/requestAuth';
import filterUniqueProducts from 'shared/lib/filterUniqueProducts/filterUniqueProducts';

interface getProductDetailProps {
    id: string;
}

export const getProductDetail = createAsyncThunk<ProductTypes, getProductDetailProps, { rejectValue: string }>(
    'get/productDetail',
    async (data) => {
        const { id } = data;

        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProduct = async (attempt: number): Promise<ProductTypes> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'get_items',
                        params: { ids: [id] },
                    },
                });

                const uniqueProducts = filterUniqueProducts(response.result);
                return uniqueProducts[0]
            } catch (e) {
                console.error("PROD ERROR");
                console.error(e);
                if (attempt < 3) {
                    return fetchProduct(attempt + 1); // Повторяем запрос, если количество попыток меньше 3
                } else {
                    throw new Error('Maximum retry attempts exceeded');
                }
            }
        };

        return fetchProduct(1);
    }
)
