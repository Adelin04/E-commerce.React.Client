'use client'

import { useMounted } from '@/app/component/useMounted ';
import { useProductsStore } from '@/zustandStore/productsStore';
import { FerrisWheelSpinner } from 'react-spinner-overlay';
import ProductsList from '@/app/component/productsList';

const Collections = () => {

    let { products, filteredProducts } = useProductsStore((state) => state);
    const { hasMounted } = useMounted();

    return (
        <div className='clothingPage flex flex-wrap justify-center items-center ' >
            {!hasMounted ? <FerrisWheelSpinner /> : <ProductsList products={filteredProducts !== null && filteredProducts || products.filter(product => product.superCategoryProduct.name.toString().toLowerCase() === "COLLECTIONS".toLowerCase())} />}
        </div >
    )
}



export default Collections;