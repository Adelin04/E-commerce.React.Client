'use client'

import LoadingSpin from 'react-loading-spin';
import React from 'react';
import ProductCard from './productCard';
import { IProduct } from '@/interfaces/interfaces';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import { useProductsStore } from '@/zustandStore/productsStore';


interface PropsProductList {
    products: IProduct[]
}
const ProductsList = ({ products }: PropsProductList) => {


    return (
        <>
            {products.map((product: IProduct, index: number) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', flexDirection: "column", flexWrap: 'wrap' }} key={index}>
                        <ProductCard key={index} product={product} />
                    </div>
                );
            })}
        </>
    )
}

export default ProductsList;
