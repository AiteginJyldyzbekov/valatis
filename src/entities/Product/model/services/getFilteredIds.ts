import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRequest } from "shared/lib/requestAuth/requestAuth";
import { filterTypes } from "../types/ProductSchema";

interface getFilteredIdsProps {
    field: filterTypes;
    value: string | number;
}

export const getFilteredIds = createAsyncThunk<Array<string>, getFilteredIdsProps, { rejectValue: string }>(
    'get/filteredIds',
    async (data) => {
        const { field, value } = data
        // Рекурсивная функция для повторного выполнения запроса если запрос дает ошибку
        const fetchProductsId = async (attempt: number): Promise<Array<string>> => {
            try {
                const response = await sendRequest({
                    method: 'POST',
                    url: `${__API__}`,
                    data: {
                        action: 'filter',
                        params: { [field]: value }
                    },
                });
                return response.result;
            } catch (e) {
                console.error("ID ERROR");
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