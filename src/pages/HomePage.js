import React, { useEffect } from "react";
import styledComponents from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselMultiple from "../components/CarouselMultiple";
import { selectProduct } from "../Features/ProductSlice";
import { useSelector } from "react-redux";
import LoadingSpin from "react-loading-spin";
import ProductsList from "../components/ProductsList";
import ResponsiveCarousel from "../components/ResponsiveCarousel";

const HomePage = () => {
  const state = useSelector(selectProduct);
  const pathImagesCarousel_2nd = state &&  state.products.slice(0, 6).map(product => product.productImages)

  
  return (
    <Wrapper>
      <div className="header-homepage">
        <Header />
      </div>

      <div className="wrapper-products-list">
        {state && state.filteredProducts !== null && <ProductsList products={state.filteredProducts} />}
      </div>

      <div className="wrapperCarousel_1st">
        <ResponsiveCarousel pathImages={[
          "./slides/slide_3.png",
          "./slides/slide_1.png",
          "./slides/slide_2.png",
        ]} />
      </div>

{/*       <div className="wrapperCarousel_2nd">
        <ResponsiveCarousel pathImages={pathImagesCarousel_2nd.map(element => {return element[0].path})} width={20}/>
      </div>

      <div className="wrapperCarousel_3th">
        <ResponsiveCarousel pathImages={pathImagesCarousel_2nd.map(element => {return element[0].path})} width={20} />
      </div> */}

     {state && (state.filteredProducts === null || state.filteredProducts.length === 0) &&
        <div
          className="wrapper-carousels"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            margin: "30px",
          }}
        >
{/*           <Carousel
            payload={[
              "./slides/slide_3.png",
              "./slides/slide_1.png",
              "./slides/slide_2.png",
            ]}
          /> */}

          {state.products && <div
            className="multipleCarousel"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              width: "80%",
              height: "auto",
              margin: "50px",
            }}
          >
            <CarouselMultiple
              products={state.products.slice(0, 6)}
              slidesToShow={4}
              slidesToScroll={1}
            />
          </div>}

          {state.products && <div
            className="multipleCarousel"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              width: "80%",
              height: "auto",
              margin: "auto",
            }}
          >
            <CarouselMultiple
              products={state.products.slice(0, 6)}
              slidesToShow={4}
              slidesToScroll={1}
            />
          </div>}

          {!state.products && <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              margin: "50px",
            }}
          >
            <LoadingSpin />
          </div>}
        </div>

      } 

      <div className="footer">
        <Footer />
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styledComponents.div`
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    .wrapper-products-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin: 25px auto;
      width: 100%;
    }

    .header-homepage,.footer {
      display: flex;
      flex-direction: space-between;
      justify-content: start;
      align-items: center;
      width:100%;
      // height: 100%;
    }

    .wrapperCarousel_1st {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin: 30px auto;
    }
    
    .wrapperCarousel_3th,
    .wrapperCarousel_2nd {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 80%;
      margin: 50px auto;
    }

    
    @media only screen and (max-width: 1024px) {
      .multipleCarousel {
        margin: 0px;
      }
    }
`;
