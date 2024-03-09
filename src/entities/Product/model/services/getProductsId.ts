import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "shared/lib/requestAuth/requestAuth";


interface GetProductsIdProps {
    offset: number;
    limit: number;
}

export const getProductsId = createAsyncThunk<Array<string>, GetProductsIdProps, { rejectValue: string }>(
    'get/productsId',
    async (data, thunkApi) => {
        const { offset, limit } = data;

        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProductsId = async (attempt: number): Promise<any> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'get_ids',
                        params: { offset, limit },
                    },
                });

                return response.result;
            } catch (e) {
                // Повторяем запрос, если количество попыток меньше 3
                if (attempt < 3) {
                    return fetchProductsId(attempt + 1);
                } else {
                    throw new Error('Maximum retry attempts exceeded');
                }
            }
        };

        // Начинаем выполнение запроса с первой попытки
        return fetchProductsId(1);
    }
);