'use client'

import logoIcon from "../../public/logoIcon.svg";
import style from '@/styles/productCard.module.css'
import Image from 'next/image';
import { FerrisWheelSpinner, CircleSpinnerOverlay } from 'react-spinner-overlay'

interface PropsProductImage {
    pathImage: string | null | ''
    width?: number | null,
    height?: number | null,
    alt?: string
}

function ProductImage({ pathImage, width, height, alt }: PropsProductImage) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {pathImage && pathImage.length > 0 ?
                <div style={{ display: "flex", justifyContent: "center", alignContent: 'center', padding: '0px' }}>
                    <img className={style.image} /* priority={true} */ width={width || 250} height={height || 250} src={pathImage.toString() || logoIcon} alt={'no photo'} />
                </div>
                :
                <div style={{ display: "flex", justifyContent: "center", alignContent: 'center', height: '100%' }}>
                    {<FerrisWheelSpinner />}
                </div>
            }
        </div>
    );
};

export default ProductImage;