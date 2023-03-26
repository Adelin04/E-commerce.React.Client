import { Carousel } from "react-responsive-carousel";
import LoadingSpin from "react-loading-spin";
import styledComponents from "styled-components";

import "react-responsive-carousel/lib/styles/carousel.min.css";



export default function ResponsiveCarousel({ pathImages,width }) {

    return (
        <Wrapper >
            <div className="wrapperSpinner">
                {!pathImages && <LoadingSpin />}
            </div>

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


                        <img style={{width:`${width}%` || '100%'}} key={index} className="imageCarousel" src={imgPath} alt={"Carousel Images"}
                        />

                    );
                })
                }
            </Carousel>
        </Wrapper>
    )

}


const Wrapper = styledComponents.div`
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
  
  
  .imageCarousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: auto;
    border-radius: 10px;
  }
  
  .wrapperSpinner {
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: auto;
    margin: auto;
  }

  .control-dots {
    bottom: -12px;
  }
`