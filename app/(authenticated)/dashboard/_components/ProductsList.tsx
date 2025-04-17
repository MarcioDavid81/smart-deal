import { ProductProps } from "@/types";
import { formatCurrency } from "@/utils/currency";

interface ProductsProps {
    products: ProductProps[];
}

const ProductsList = ({ products }: ProductsProps) => {

    return ( 
        <div>
            <h1>Lista de Produtos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} {`R$ ${formatCurrency(product.price)}`}</li>
                ))}
            </ul>
        </div>
     );
}
 
export default ProductsList;