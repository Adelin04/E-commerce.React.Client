import Button from "@/app/component/button";
import PriceFormatted from "@/app/component/priceFormatted";
import ProductImage from "@/app/component/productImage";
import { IProduct } from "@/interfaces/interfaces";
import { useAdminStore } from "@/zustandStore/adminStore";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

interface PropsProductCardDashboard {
    product: IProduct,
}

const ProductCardDashboard = ({ product }: PropsProductCardDashboard) => {
    const { setProductClickedToEdit } = useAdminStore(state => state);

    return (
        <div className="flex justify-between items-center w-full h-max  rounded-lg border-y-2 border-gray-100  sm:flex-col">

            <div className="wrapper flex justify-center w-max h-full items-center">

                <div className="wrapper flex justify-start items-center w-[300px] h-full ">

                    <div className="wrapperImage flex justify-center items-center min-w-[60px] h-full bg-blue-400 rounded-lg">
                        <Image priority style={{width:'auto',height:'auto'}} width={60} height={60} src={product.productImages[0].path.trim()} alt="" />
                    </div>

                    <div className="flex flex-col justify-start items-start w-max pl-5">
                        <h4 className="description flex justify-center items-center font-bold">{`${product.name.toString().split(",").slice(0, 5)}...`}</h4>
                        <h4 className="description flex justify-center items-center">{`${product.description.toString().split(",").slice(0, 15)}...`}</h4>
                        <div className="stock flex justify-center items-center">{product.productCode}</div>
                    </div>

                </div>

            </div>

            <div className="wrapper md:flex justify-end items-center w-[150px] h-full ">

                <div className="flex justify-end items-center w-max h-full">
                    <div className='flex justify-center items-center w-[100px] h-[55px] text-[var(--baseColor)]'>
                        {<PriceFormatted price={product.price} className={'text-[30px] font-bold'} />}
                        <p className="flex justify-center items-start h-full font-bold text-[17px] text-[var(--baseColor)]" >{product.currency}</p>
                    </div>

                    <i className="flex justify-center items-center cursor-pointer h-[50px] w-[50px] " onClick={() => setProductClickedToEdit(product)}>
                        <FaBars />
                    </i>

                </div>
            </div>

        </div>
    )
}

export default ProductCardDashboard;