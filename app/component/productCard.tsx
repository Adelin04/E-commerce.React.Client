'use client'

import styles from '../../styles/productCard.module.css'
import PriceFormatted from './priceFormatted';
import { IProduct } from '@/interfaces/interfaces';
import ProductImage from './productImage';
import { useRouter } from 'next/navigation';
import { useProductsStore } from '@/zustandStore/productsStore';


interface PropsProductCard {
    product: IProduct
}

function ProductCard({ product }: PropsProductCard) {
    const setSelectedProduct = useProductsStore(state => state.setSelectedProduct);

    const router = useRouter()


    const handleClick = () => {
        setSelectedProduct(product)
        router.push(`/product?id=${product.id}`)
    };

    return (
        <div className={styles.productContent}>
            <h3 className={styles.productTitle}>{product.name}</h3>

            <div className={styles.productImageWrapper} >

                <div className={styles.productImage} onClick={handleClick} >
                    <ProductImage pathImage={product.productImages[0].path} />
                </div>

                <div className={styles.wrapperDescription} >
                    <p> {`${product.description.slice(0, 25)}...` || `{${product.color} ${product.name}}...`}</p>
                </div>

                <div className={styles.wrapperPrice}>
                    {<PriceFormatted price={product.price} />}
                    <p style={{ fontWeight: 'bold', color: 'var(--sliderColor)' }} >{product.currency}</p>
                </div>

            </div>
        </div >
    );
};



export default ProductCard;