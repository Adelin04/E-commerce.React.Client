'use client'

import Image from "next/image";
import React, { useState } from "react"

interface IPropsCardImages {
    photos: []
}

const CardImages = ({ photos }: IPropsCardImages) => {
    const [size, setSize] = useState()
    const [indexActive, setIndexActive] = useState(1)
    const tmp_photos = ["https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg", "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg", "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg", "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"]
    return (

        <div className=" flex justify-center items-center min-w-max h-[300px] " >

            {photos && photos.map((photo: any, index: number) => {
                return (
                    <div className={`flex justify-center items-center h-full relative mx-2 rounded-2xl cursor-pointer`} key={index} onClick={() => setIndexActive(index)}>
                        <Image priority className={`justify-center items-center relative h-full rounded-2xl  transition-all `} width={`${index === indexActive ? 300 : 50}`} height={300} src={photo.path} alt="Image logo" />
                        <div className="description absolute bottom-0 right-1 flex flex-col items-end justify-center p-1 w-full">
                            <p className="flex justify-center items-center w-5 h-5 bg-black text-white rounded-full cursor-pointer" >{index + 1}</p>
                        </div>
                    </div>

                )
            })}

        </div>

    )
}


export default CardImages;