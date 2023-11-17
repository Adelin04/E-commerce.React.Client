'use client'
//import style
import '../globals.css'
import style from '../../styles/carousel.module.css'

//import components
import ResponsiveCarousel from '../component/responsiveCarousel';

//Import image for carousel
import image_1 from '../../public/slides/slide_1.png'
import image_2 from '../../public/slides/slide_2.png'
import image_3 from '../../public/slides/slide_3.png'
import { useProductsStore } from '@/zustandStore/productsStore';
import { useMounted } from '../component/useMounted ';
import Loading from '../loading';
import CarouselImages from '../component/carouselImages';
import ProductsList from '../component/productsList';
import React from 'react';

const Home = () => {
  const { products, filteredProducts } = useProductsStore(state => state)
  const { hasMounted } = useMounted()
  console.log('products',products);
  if (!hasMounted)
    return <Loading />
  return (

    <main className={style.containerHomepage}>

      <div className={style.wrapperCarousels}>

        {filteredProducts && <ProductsList products={filteredProducts} />}

        {(filteredProducts?.length === 0 || filteredProducts === null) &&
          <React.Fragment>

            <div className='wrapperResponsiveCarousel flex flex-col m-5' >
              <ResponsiveCarousel pathImages={[image_1, image_2, image_3]} />
            </div>

            <div className='wrapperCarouselImages flex justify-center items-center my-5 mx-auto p-10 w-full'>
              <CarouselImages products={products?.slice(1, 10)} />
            </div>

          </React.Fragment>
        }

      </div>

    </main >
  )
}
export default Home;

