import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styledComponents from "styled-components";
import Carousel from "../components/Carousel";
import CarouselMultiple from "../components/CarouselMultiple";
import { selectProduct } from "../Features/ProductSlice";
import { useSelector } from "react-redux";
import LoadingSpin from "react-loading-spin";
import ProductsList from "../components/ProductsList";
import ResponsiveCarousel from "../components/ResponsiveCarousel";
import './HomePage.css'

const HomePage = () => {
  const state = useSelector(selectProduct);

  return (

    <div className="homepage flex flex-col justify-between items-center w-full h-full">

      <Header />

      <div className="wrapperCarousel_1st flex justify-center items-center">
        <ResponsiveCarousel pathImages={[
          "./slides/slide_3.png",
          "./slides/slide_1.png",
          "./slides/slide_2.png",
        ]} />
      </div>

      <div className="wrapper-products-list flex flex-wrap justify-center items-center w-[90%]">
        {state && state.filteredProducts !== null && <ProductsList products={state.filteredProducts} />}
      </div>

      {state && (state.filteredProducts === null || state.filteredProducts.length === 0) &&
        <div className="wrapper-carousels flex flex-col justify-around items-center w-full mx-auto m-10">

          {state.products && <div
            className="multipleCarousel flex flex-col justify-start items-center w-[80%] h-max m-[50px]"
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

          {!state.products &&
            <div className="spiner-home flex justify-center items-center h-full m-[50px]">
              <LoadingSpin />
            </div>}

        </div>

      }


      <div className="wrapper-footer-homepage flex justify-center items-center w-full mt-10">
        <Footer />
      </div>
    </div>

  );
};

export default HomePage;