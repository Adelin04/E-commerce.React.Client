'use client'

import Image from "next/image";
import React, { useState } from "react"
import { FerrisWheelSpinner, CircleSpinnerOverlay } from 'react-spinner-overlay'

interface IPropsCardImages {
    photos: []
}

const CardImages = ({ photos }: IPropsCardImages) => {
    const [size, setSize] = useState()
    const [indexActive, setIndexActive] = useState(1)

    return (

        <div className=" flex justify-center items-center h-[300px] " >

            {photos && photos.map((photo: any, index: number) => {
                return (
                    <div className={`flex justify-center items-center h-full relative mx-2 rounded-2xl cursor-pointer`} key={index} onClick={() => setIndexActive(index)}>

                        {photo ? <Image priority className={`justify-center items-center relative h-full rounded-2xl  transition-all `} width={`${index === indexActive ? 300 : 50}`} height={300} src={photo.path.toString().trim()} alt="Image logo" /> : < FerrisWheelSpinner />}
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