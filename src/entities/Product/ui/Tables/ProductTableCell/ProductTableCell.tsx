import { ProductTypes } from "entities/Product/model/types/ProductSchema"
import styles from "./ProductTableCell.module.scss"
import { Link, useNavigate } from "react-router-dom";

interface ProductTablecellProps {
    data: ProductTypes;
}

const ProductTableCell: React.FC<ProductTablecellProps> = ({ data }) => {
    const { brand, id, price, product } = data;
    const navigate = useNavigate()

    return (
        <tr className={styles.wrapper} onClick={() => navigate(`/product/${id}`)}>
            <td>
                <p>{id}</p>
            </td>
            <td>
                <p>{brand}</p>
            </td>
            <td>
                <p>{price}</p>
            </td>
            <td>
                <p>{product}</p>
            </td>
        </tr>
    );
}

export default ProductTableCell;