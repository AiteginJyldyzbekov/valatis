import { useAppDispatch, useAppSelector } from "shared/lib/reduxHooks/reduxHooks";
import styles from "./ProductDetailPage.module.scss"
import { getProductDetail } from "entities/Product/model/services/getProductDetail";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsDetailState } from "entities/Product/model/selectors/getProductsDetailState";
import { Loader } from "shared/ui/Loader/Loader";
import { Button, ThemeButton } from "shared/ui/Button/Button";

const ProductDetailPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const { result, isLoading } = useAppSelector(getProductsDetailState)

    useEffect(() => {
        dispatch(getProductDetail({ id }))
    }, [])

    const goBack = () => {
        navigate(-1);
    };

    const renderProduct = useMemo(() => {
        return (
            <div className={styles.product__container}>
                <p>
                    Brand:{result?.brand ? result.brand : "No name"}
                </p>
                <p>Price:{result?.price}</p>
                <p>Product:{result?.product}</p>
                <p>Id:{result?.id}</p>
            </div>
        )
    }, [result])

    if (isLoading) return <Loader />
    return (
        <div className={styles.wrapper}>
            <Button clasName={styles.goBackBtn} onClick={goBack} theme={ThemeButton.OUTLINE}>Вернуться назад</Button>
            <div className={styles.product}>
                {renderProduct}
            </div>
        </div>
    )
}

export default ProductDetailPage;