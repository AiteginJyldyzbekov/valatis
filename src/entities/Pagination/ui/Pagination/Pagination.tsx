import { useAppDispatch, useAppSelector } from "shared/lib/reduxHooks/reduxHooks";
import styles from "./Pagination.module.scss"
import { getPaginationState } from "entities/Pagination/model/selectors/getPaginationState";
import { paginationActions } from "entities/Pagination/model/slice/PaginationSlice";
import { getProductsIdsState } from "entities/Product/model/selectors/getProductsIdsState";
import { getIsFilterState } from "entities/Product/model/selectors/getIsFilterState";
import { Button, ThemeButton } from "shared/ui/Button/Button";

const Pagination = () => {
    const dispatch = useAppDispatch();
    const { page, offset, limit } = useAppSelector(getPaginationState)
    const { isLoading } = useAppSelector(getProductsIdsState)
    const isFilter: boolean = useAppSelector(getIsFilterState);

    const handleNextPage = () => {
        dispatch(paginationActions.nextPage())
    }

    const handlePrevPage = () => {
        dispatch(paginationActions.prevPage())
    }


    return (
        <div className={styles.pagination}>
            <Button
                onClick={handlePrevPage}
                disabled={isLoading || isFilter || page == 1}
                theme={ThemeButton.DEFAULT}
            >
                Prev
            </Button>
            <p>{page}</p>
            <Button
                onClick={handleNextPage}
                disabled={isLoading || isFilter}
                theme={ThemeButton.DEFAULT}
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination;