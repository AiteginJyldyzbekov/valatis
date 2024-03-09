import { useAppDispatch, useAppSelector } from "shared/lib/reduxHooks/reduxHooks";
import styles from "./ProductsPage.module.scss"
import { useEffect } from "react";
import { getProducts } from "entities/Product/model/services/getProducts";
import { getProductsState } from "entities/Product/model/selectors/getProductsState";
import { getProductsId } from "entities/Product/model/services/getProductsId";
import { getProductsIdsState } from "entities/Product/model/selectors/getProductsIdsState";
import { Loader } from "shared/ui/Loader/Loader";
import { getPaginationState } from "entities/Pagination/model/selectors/getPaginationState";
import { ProductTable } from "entities/Product";
import { Pagination } from "entities/Pagination";

const ProductsPage = () => {
    const dispatch = useAppDispatch()
    const { result, isLoading: productsLoading } = useAppSelector(getProductsState);
    const { ids, isLoading: idsLoading } = useAppSelector(getProductsIdsState);
    const { limit, offset, page } = useAppSelector(getPaginationState)

    useEffect(() => {
        dispatch(getProductsId({ offset, limit }))
    }, [dispatch, page]);

    useEffect(() => {
        if (!idsLoading && ids.length > 0) {
            dispatch(getProducts({ ids }));
        }
    }, [idsLoading])

    return (
        <div className={styles.wrapper}>
            <ProductTable data={result} isLoading={productsLoading} />
            <Pagination />
        </div>
    )
}

export default ProductsPage;