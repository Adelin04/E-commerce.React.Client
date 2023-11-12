'use client'

import { useProductsStore } from '@/zustandStore/productsStore';
import ProductsList from '../../component/productsList';
import { FerrisWheelSpinner } from 'react-spinner-overlay'
import { useMounted } from '../../component/useMounted ';
import { IProduct } from '@/interfaces/interfaces';

const Clothing = () => {
    let { products, filteredProducts } = useProductsStore((state) => state);
    const { hasMounted } = useMounted();

    return (
        <div className='clothingPage flex flex-wrap justify-center items-center ' >
            {!hasMounted ? <FerrisWheelSpinner /> : <ProductsList products={filteredProducts !== null && filteredProducts || products.filter((product: IProduct | any) => product.superCategoryProduct.name.toString().toLowerCase() !== 'accessory')} />}
        </div >
    )
}


export default Clothing;