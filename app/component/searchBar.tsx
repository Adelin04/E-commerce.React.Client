import Image from "next/image";

//import Icons
import searchIcon from '@/public/search.svg'
import { useState } from "react";
import { useProductsStore } from "@/zustandStore/productsStore";

interface PropsSearchBar {
    className?: string | '',
    setInput: any,
}

const SearchBar = ({ className, setInput }: PropsSearchBar) => {
    const { filteredProducts, setProductByValueSearched } = useProductsStore(state => state);
    return (
        <div className="flex justify-center items-center w-max h-max border-b-2 rounded-lg border-[var(--baseColor)] ">
            <Image width={30} height={30} src={searchIcon} alt='logo Icon' />
            <input className={`flex justify-around items-center w-max h-max bg-transparent ${className}`} type="text" placeholder="Search your product" onChange={(e) => { setInput(e.target.value), setProductByValueSearched(e.target.value) }} />
        </div>
    )
}

export default SearchBar