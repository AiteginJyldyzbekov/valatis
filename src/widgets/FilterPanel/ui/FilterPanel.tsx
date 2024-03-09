import Select from "shared/ui/Select/Select";
import styles from "./FilterPanel.module.scss"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "shared/lib/reduxHooks/reduxHooks";
// import { getProductsFields } from "entities/Product/model/services/getProductsBrands";
import { getPaginationState } from "entities/Pagination/model/selectors/getPaginationState";
import { getProductsBrands } from "entities/Product/model/services/getProductsBrands";
import { getProductsBrandsState } from "entities/Product/model/selectors/getProductsBrandsState";
import { getProductsNames } from "entities/Product/model/services/getProductsNames";
import { getProductsNamesState } from "entities/Product/model/selectors/getProductsNamesState";
import { getFilteredIds } from "entities/Product/model/services/getFilteredIds";
import { Input } from "shared/ui/Input/Input";
import { filterTypes } from "entities/Product/model/types/ProductSchema";
import { getIsFilterState } from "entities/Product/model/selectors/getIsFilterState";
import { productActions } from "entities/Product/model/slice/ProductSlice";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { getProductsId } from "entities/Product/model/services/getProductsId";

const FilterPanel = () => {
    const dispatch = useAppDispatch()

    const { limit, offset } = useAppSelector(getPaginationState)
    const { result: brands } = useAppSelector(getProductsBrandsState)
    const { result: names } = useAppSelector(getProductsNamesState)
    const isFilter: boolean = useAppSelector(getIsFilterState);

    const [brand, setBrand] = useState<string>()
    const [product, setProduct] = useState<string>()
    const [price, setPrice] = useState<string | number>()

    useEffect(() => {
        dispatch(getProductsBrands({ offset, limit }))
    }, [dispatch])

    useEffect(() => {
        dispatch(getProductsNames({ offset, limit }))
    }, [dispatch])

    const handleFilterChange = (newValue: string | number, fieldType: filterTypes) => {
        setTimeout(() => {
            dispatch(getFilteredIds({ field: fieldType, value: newValue }));
        }, 500);

        if (!isFilter) {
            dispatch(productActions.setFilter(true))
        }

        switch (fieldType) {
            case filterTypes.BRAND:
                setProduct(null);
                setPrice("");
                break;
            case filterTypes.PRODUCT:
                setBrand(null);
                setPrice("");
                break;
            default:
                setBrand(null);
                setProduct(null);
                break;
        }
    }

    const handleResetFilter = () => {
        setPrice("");
        setBrand(null);
        setProduct(null);
        dispatch(productActions.setFilter(false))
        dispatch(getProductsId({ offset, limit }))
    }

    return (
        <table className={styles.filterPanel}>
            <Button onClick={handleResetFilter} theme={ThemeButton.OUTLINE}>Reset filter</Button>
            <tr>
                <th>
                    <p>FilterPanel</p>
                </th>
                <th>
                    <Select
                        options={brands}
                        onChange={handleFilterChange}
                        field={filterTypes.BRAND}
                        value={brand}
                        setState={setBrand}
                    />
                </th>
                <th>
                    <Input
                        placeholder="Price"
                        type="text"
                        onChange={handleFilterChange}
                        field={filterTypes.PRICE}
                        value={price}
                        setState={setPrice}
                    />
                </th>
                <th>
                    <Select
                        options={names}
                        onChange={handleFilterChange}
                        field={filterTypes.PRODUCT}
                        value={product}
                        setState={setProduct}
                    />
                </th>
            </tr>
        </table>
    )
}

export default FilterPanel;