'use client'

import { IProduct } from "@/interfaces/interfaces";
import React, { Component } from "react";
import { FerrisWheelSpinner } from 'react-spinner-overlay'
import { useRouter } from 'next/navigation';
/* import LoadingSpin from "react-loading-spin";
import { Navigate, Route } from "react-router-dom";
import styledComponents from "styled-components";*/
import Slider from "react-slick";
import { Router } from "next/router";
import ProductImage from "./productImage";
import Image from "next/image";

//  Carousel component used for home page products

interface PropsCarousel {
  images: Array<string>,
  slidesToShow: number,
  slidesToScroll: number,
  width?: number,
  height?: number,
  onClick?: () => void | null,
}

class CarouselProductImages extends React.Component<PropsCarousel> {

  /**
   *
  */

  state: PropsCarousel = {
    // optional second annotation for better type inference
    width: this.props.width,
    height: this.props.height,
    images: this.props.images,
    slidesToShow: this.props.slidesToShow,
    slidesToScroll: this.props.slidesToScroll,
    onClick: this.props.onClick
  };


  LoadingList: any = [];
  redirect!: boolean;
  goToIdProduct!: number;


  componentDidMount = () => {
    this.LoadingCarousel();
  };

  handleClicked = () => {
    if (onclick) {
      this.redirect = true
    }
    else return null
  };

  LoadingCarousel = () => {
    for (let index = 0; index < this.state.slidesToShow; index++) {
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
          {<FerrisWheelSpinner />}
        </div>
      );
    }
  };

  render() {
    const { slidesToScroll, slidesToShow, images, width, height } = this.props

    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      arrows: false,
      // fade: true,
      cssEase: "linear",
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="w-[300px]">
        {/* {this.redirect && 
          Router(`/product?id=${this.product.id}`)
        } */}
        <Slider {...settings}>

          {images?.map((url: any, index: number) => {
            return (
              <div key={index}>
                <ProductImage width={width || 100} height={height || 100} key={index} pathImage={url.path} alt="" />
              </div>
            );
          })}

        </Slider>
      </div>
    );
  }
}

export default CarouselProductImages;

