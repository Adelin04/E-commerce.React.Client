'use client'

import ProductDetails from '../../component/productDetails';
import ProductImage from '../../component/productImage';
import { useMounted } from '../../component/useMounted ';
import { IProduct } from '@/interfaces/interfaces';
import { useProductsStore } from '@/zustandStore/productsStore';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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