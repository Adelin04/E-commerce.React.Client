'use client'

import React from 'react';
import ProductCard from './productCard';
import { IProduct } from '@/interfaces/interfaces';


interface PropsProductList {
    products: IProduct[]
}
const ProductsList = ({ products }: PropsProductList) => {


    return (
        <div className='flex flex-wrap justify-center items-center w-[90%]'>
            {products.map((product: IProduct, index: number) => {
                return (
                    <div className='mx-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto', flexDirection: "column", flexWrap: 'wrap', }} key={index}>
                        <ProductCard key={index} product={product} />
                    </div>
                );
            })}
        </div>
    )
}

export default ProductsList;
