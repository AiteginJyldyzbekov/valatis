import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "shared/lib/requestAuth/requestAuth";

interface getProductsBrandsProps {
    offset: number;
    limit: number;
}

export const getProductsBrands = createAsyncThunk<Array<string>, getProductsBrandsProps, { rejectValue: string }>(
    'get/productsBrands',
    async (data) => {
        const { offset, limit } = data;

        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProductsBrands = async (attempt: number): Promise<Array<string>> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'get_fields',
                        params: { field: "brand" }
                    },
                });

                const filteredResult: Array<string> = response.result
                    .filter((item: string | null): item is string => item !== null)
                    .filter((value: string, index: number, self: string) => self.indexOf(value) === index);
                return filteredResult;
            } catch (e) {
                console.error("ID ERROR");
                // Повторяем запрос, если количество попыток меньше 3
                if (attempt < 3) {
                    return fetchProductsBrands(attempt + 1);
                } else {
                    throw new Error('Maximum retry attempts exceeded');
                }
            }
        };

        // Начинаем выполнение запроса с первой попытки
        return fetchProductsBrands(1);
    }
);