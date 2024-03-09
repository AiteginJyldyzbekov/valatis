import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "shared/lib/requestAuth/requestAuth";

interface getProductsNamesProps {
    offset: number;
    limit: number;
}

export const getProductsNames = createAsyncThunk<Array<string>, getProductsNamesProps, { rejectValue: string }>(
    'get/productsNames',
    async (data) => {
        const { offset, limit } = data;

        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProductsNames = async (attempt: number): Promise<Array<string>> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'get_fields',
                        params: { field: "product", offset, limit }
                    },
                });

                return response.result;
            } catch (e) {
                console.error("ID ERROR");
                // Повторяем запрос, если количество попыток меньше 3
                if (attempt < 3) {
                    return fetchProductsNames(attempt + 1);
                } else {
                    throw new Error('Maximum retry attempts exceeded');
                }
            }
        };

        // Начинаем выполнение запроса с первой попытки
        return fetchProductsNames(1);
    }
);