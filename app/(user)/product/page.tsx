'use client'

import ProductDetails from '../../component/productDetails';
import { useMounted } from '../../component/useMounted ';
import { useProductsStore } from '@/zustandStore/productsStore';


const ProductPage = () => {
    const selectedProduct = useProductsStore(state => state.selectedProduct);
    const { hasMounted } = useMounted();

    return (
        <div >
            {hasMounted && <ProductDetails product={selectedProduct} />}
        </div >
    )
}


export default ProductPage;