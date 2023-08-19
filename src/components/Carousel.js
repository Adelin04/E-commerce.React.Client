import React, { Component } from "react";
import styledComponents from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//  Carousel component used for home page slides 
export default class Carousel extends Component {
  constructor({  payload, slidesToShow = 1, slidesToScroll = 1 }) {
    super();
    this.payload = payload;
    this.slidesToShow = slidesToShow;
    this.slidesToScroll = slidesToScroll;
  }

  render() {
    const settings = {
      fade: true,
      dots: true,
      infinite: true,
      speed: 3000,
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
    };

    return (
      <div style={{ width: "100%", margin: "0px" }}>
        <Wrapper>
          <Slider {...settings}>
            {this.payload &&
              this.payload.map((data, index) => {
                return (
                  <div key={index} className="wrapper-img-carousel">
                    <img
                      className="img-carousel"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                      src={data}
                      alt={"This image is not available"}
                    />
                  </div>
                );
              })}
          </Slider>
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styledComponents.div`

.wrapper-img-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}

.slick-next {
  right: 10px;
  width: auto;
  height: auto;
}

.slick-prev {
  left: 10px;
  width: auto;
  height: auto;
  z-index: 1;
}

.slick-arrow, .slick-next {
  top: 85%;
}

.slick-next::before,
.slick-prev::before {
  color: var(--baseColor) !important;
  font-size: 30px;
}

.slick-dots {
  /* position: relative !important; */
  display: flex !important;
  justify-content: center;
  align-items: center;
  bottom: -7px;
  width: 100%;
  height: auto;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  color: transparent;
}

.slick-dots li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px !important;
  height: 10px !important;
}

.slick-dots li button {
  width: auto;
  height: auto;
}

.slick-dots li button:before {
  font-family: "slick";
  font-size: 0px;
  line-height: 20px;
  position: absolute;
  width: 10px !important;
  height: 10px !important;
  left: 0;
  content: "s" !important;
  text-align: center;
  // border-radius: 2px solid var(--baseColor);
  background-color: var(--baseColor);
}

 @media only screen and (max-width: 650px) {
  .wrapper-img-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-width: 300px;
    width: 100%;
    height: auto;
  }

  .img-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
  }


}

@media only screen and (max-width: 420px) {
  .wrapper-img-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-width: 50px;
    width: 100%;
    height: auto;
  }

  .img-carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 100%;
  }
  
  .slick-arrow, .slick-next {
    top: 70%;
  }
}

@media only screen and (max-width: 220px) {
  /* .slick-next::before,
  .slick-prev::before {
    color: var(--baseColor) !important;
    font-size: 10px;
  }

  .slick-arrow, .slick-next {
    top: 60%;
  } */

} 

`;
