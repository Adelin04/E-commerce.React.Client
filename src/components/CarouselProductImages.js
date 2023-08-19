import React, { Component } from "react";
import LoadingSpin from "react-loading-spin";
import { Navigate, Route } from "react-router-dom";
import Slider from "react-slick";
import styledComponents from "styled-components";
import logoIcon from "../icons/herokuSleepIco.png";

//  Carousel component used for home page products
class CarouselProductImages extends React.Component {
  constructor({ products, slidesToShow = 5, slidesToScroll = 1, onclickProductEvent = true }) {
    super();

    this.state = {
      loading: true,
      redirect: false,
      goToIdProduct: null,
    };

    this.products = products;
    this.slidesToShow = slidesToShow;
    this.slidesToScroll = slidesToScroll;
    this.onclickProductEvent = onclickProductEvent;
    this.LoadingList = [];
  }

  componentDidMount = () => {
    this.LoadingCarousel();
  };

  handleClicked = (e) => {
    if (this.onclickProductEvent) {
      this.setState({ goToIdProduct: e.target.id });
      this.setState({ redirect: true });
    }
    else return null
  };

  LoadingCarousel = () => {
    for (let index = 0; index < this.slidesToShow; index++) {
      this.LoadingList.push(
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img style={{ width: "550px", height: "auto" }} src={logoIcon} />
          {<LoadingSpin />}
        </div>
      );
    }
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 3000,
      arrows: false,
      // fade: true,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
    };

    return (
      <div style={{ width: "100%", margin: "auto" }}>
        {this.state.redirect && (
          <Navigate
            to={`product-details/${this.state.goToIdProduct}`}
            replace={true}
          />
        )}

        <Wrapper>
          {this.products.length > 0 ? (
            <Slider {...settings}>

              {this.products[0].productImages.map((productPath, index) => {
                return (
                  <div key={index} className="wrapper-img-carousel">
                    {productPath && (
                      <img
                        className="img-carousel"
                        id={productPath.id}
                        src={productPath.path}
                        alt={"This image is not available"}
                        onClick={this.handleClicked}
                      />
                    )}
                  </div>
                );
              })}
            </Slider>
          ) : (
            <div className="loading-spin">
              <LoadingSpin />
            </div>
          )}
        </Wrapper>
      </div>
    );
  }
}

export default CarouselProductImages;

const Wrapper = styledComponents.div`

.wrapper-img-carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
}


.img-carousel {
  margin: auto;
  width: auto;
  height: auto;
  // max-height: 290px;
  border-radius: 10px;
  border: 1px solid var(--myBorder);
  cursor: pointer;
  background: var(--backgroundCard);
}

.product-price,
.product-name {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    text-align: center;
  }

  .loading-spin {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .slick-prev ,
  .slick-next {
    // top: 410px;
  }
  
  .slick-next {
    // right: 5%;
    // width: auto;
    // height: auto;
  }
  
  .slick-prev {
    // left: 5%;
    // width: auto;
    // height: auto;
    // z-index: 1;
}

.slick-next::before,
.slick-prev::before {
  // color: var(--baseColor) !important;
  // font-size: 30px;
  visibility: hidden !important;
}

.slick-dots {
  display: flex !important;
  justify-content: center;
  align-items: center;
  width:60%;
  left:0;
  right:0;
  height: auto;
  padding: 0;
  margin: auto;
  bottom: -15px;
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
  border-radius: 2px solid #dd7130;
  background-color: var(--baseColor);
}

.wrapper-btn-shop {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px;

}




 @media only screen and (max-width: 650px) {
  
  .wrapper-img-carousel {
    .product-price,
    .product-name {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
        text-align: center;
        font-size: 10px;
      }
      
     
}

@media only screen and (max-width: 420px) {
  .wrapper-img-carousel {
    .product-price,
    .product-name {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0px;
        text-align: center;
        font-size: 10px;
      }

    }
    .slick-next::before,
    .slick-prev::before {
      font-size: 25px;
    }
  }
  
  @media only screen and (max-width: 220px) {
  .slick-next::before,
  .slick-prev::before {
    font-size: 20px;
  }
} 

`;
