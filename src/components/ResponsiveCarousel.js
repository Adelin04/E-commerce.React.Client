import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import LoadingSpin from "react-loading-spin";

export default function ResponsiveCarousel({ pathImages, width }) {

    return (
        <div className="responsiveCarousel flex justify-center items-center w-full m-auto rounded-md">

            {!pathImages && <div className="spiner-home flex justify-center items-center w-full h-full  m-auto">
                <LoadingSpin />
            </div>}

            <Carousel
                autoPlay={true}
                showArrows={true}
                showIndicators={true}
                infiniteLoop={true}
                dynamicHeight={true}
                showThumbs={true}
                className="mySwiper"
            >
                {pathImages && pathImages.map((imgPath, index) => {
                    return (
                        <img className="imageCarousel flex justify-center items-center h-auto" style={{ width: `${width}%` || '100%' }} key={index} src={imgPath} alt={"Carousel Images"}
                        />
                    );
                })
                }
            </Carousel>
        </div>
    )

}