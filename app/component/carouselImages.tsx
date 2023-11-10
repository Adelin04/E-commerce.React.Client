'use client'

import { Component } from "react";
import Slider from "react-slick";
import ProductImage from "./productImage";
import Image from "next/image";
import { useProductsStore } from "@/zustandStore/productsStore";
import { useRouter } from "next/navigation";
import { IProduct } from "@/interfaces/interfaces";


interface PropsCarousel {
    products?: IProduct[] | null,
    images?: Array<string>,
    width?: number,
    height?: number,
}

const CarouselImages = ({ products, width, height }: PropsCarousel) => {
    const setSelectedProduct = useProductsStore(state => state.setSelectedProduct);

    const router = useRouter()


    const handleClick = (product: IProduct) => {
        setSelectedProduct(product)
        router.push(`/product?id=${product.id}`)
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        arrows: false,
        fade: false,
        cssEase: "linear",
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <div className="w-full h-full mx-auto justify-center items-center text-center px-2 ">
            <Slider className="m-2" {...settings}>

                {products?.map((product: IProduct, index: number) => {
                    return (
                        <div key={index} className="wrapperImage relative flex justify-center items-center text-center w-[20px] h-max border-2 rounded-lg outline-none">
                            <Image onClick={() => handleClick(product)} style={{ margin: 'auto', padding: '5px' }} key={index} width={width || 150} height={height || 150} alt="" src={product.productImages[0].path} />
                        </div>
                    )
                })}

            </Slider>

            <style jsx>{`
                   
                `
            }</style>
        </div>
    );

}

export default CarouselImages;