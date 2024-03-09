import ProductTableCell from '../ProductTableCell/ProductTableCell';
import styles from './ProductTable.module.scss'
import { ProductTypes } from 'entities/Product/model/types/ProductSchema';
import { useMemo } from 'react';
import { FilterPanel } from 'widgets/FilterPanel';
import { Loader } from 'shared/ui/Loader/Loader';

interface ProductTableProps {
    data: ProductTypes[];
    isLoading: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({ data, isLoading }) => {

    const renderProducts = useMemo(() => {
        if (isLoading) return <Loader />
        return data.map((el) => (
            <ProductTableCell key={el.id} data={el} />
        ))
    }, [data, isLoading])

    return (
        <div className={styles.wrapper}>
            <div className={styles.table__options}>
                <FilterPanel />
            </div>
            <table>
                <thead className={styles.table__header}>
                    <tr>
                        <th>
                            <p>Id</p>
                        </th>
                        <th>
                            <p>Brand</p>
                        </th>
                        <th>
                            <p>Price</p>
                        </th>
                        <th>
                            <p>Product</p>
                        </th>
                    </tr>
                </thead>
            </table>
            <div className={styles.table__bodyWrapper}>
                <table>
                    <tbody>
                        {renderProducts}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductTable