'use client'

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import LoadingSpin from "react-loading-spin";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from '../../styles/carousel.module.css';
import ProductImage from "./productImage";


export interface PropsCarousel {
    pathImages?: any[];
    width?: number,
    height?: number,
}

export default function ResponsiveCarousel({ pathImages, width, height }: PropsCarousel) {

    return (
        <div className={styles.container}>
            <div className={styles.wrapperSpinner}>
                {!pathImages && <LoadingSpin />}
            </div>

            <Carousel
                autoPlay={true}
                showArrows={true}
                showIndicators={true}
                infiniteLoop={true}
                dynamicHeight={true}
                showThumbs={false}
            // className={styles.mySwiper}
            >
                {pathImages?.map((imgPath: string, index: number) => {
                    return (
                        <div key={index}>
                            <Image key={index}
                                width={width}
                                height={height}
                                src={imgPath}
                                alt={"Carousel Images"}
                                className={styles.imageCarousel}
                            />
                        </div>
                    );
                })
                }
            </Carousel>
        </div>
    )

}