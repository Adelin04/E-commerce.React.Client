import { IProduct } from "@/interfaces/interfaces";
import ProductCard from "@/app/component/productCard";
import ProductCardDashboard from "./productCardDashboard";
import Button from "@/app/component/button";
import { useState } from "react";

interface PropsProductsList {
    products: IProduct[] | null,
    setToggleEdit: (args: any) => any,
}


const ProductListDashboard = ({ products, setToggleEdit }: PropsProductsList) => {
    // const [toggleEdit, setToggleEdit] = useState(false)

    // console.log('...', toggleEdit);

    return (
        <div className="productsList flex flex-col justify-start items-center w-full h-auto m-1 p-2 ">

            {products?.map((product: IProduct, index: number) => {
                return (
                    <div key={index} className="containerProductsList flex  justify-start items-center w-full h-auto m-0.5 ">
                        <ProductCardDashboard product={product} key={product?.id} />
                    </div>
                )
            })}
        </div>
    )
}

export default ProductListDashboard;