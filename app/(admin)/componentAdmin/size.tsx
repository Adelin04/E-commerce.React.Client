import React from "react";

import { useState } from "react";
import logoIcon from '../icons/logoIcon.svg'
import { URI } from '../../../utils/globalUri'
import Button from "@/app/component/button";
import { useProductsStore } from "@/zustandStore/productsStore";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaTrash } from "react-icons/fa";

//  style
import style from '@/styles/footer.module.css'

interface PropsSizeProduct {
    close: () => void,
}

const Size = ({ close }: PropsSizeProduct) => {

    //Zustand State
    const { products, sizesProductAvailable } = useProductsStore(state => state);

    const [newSize, setNewSize] = useState('');
    const [toggleSizeCollapse, setToggleSizeCollapse] = useState(false)
    const [msg, setMsg] = useState('SIZES')



    const handleClickSaveNewSize = async () => {

        if (newSize !== null || newSize !== '')
            await fetch(`${URI}Size/v1/create/newSize`, {
                method: 'POST',
                body: JSON.stringify({ sizeName: newSize }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `${localStorage.getItem('TOKEN_ACCESS') && localStorage.getItem('TOKEN_ACCESS')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const { success } = data
                    console.log('response -> ', data);
                    // if (success) {
                    // }
                })
                .catch(error => {
                    console.log(error.toString())
                    setMsg(error.toString())
                })
                .finally(() => setNewSize(''))

    }


    return (
        <div className="containerAddNewProduct flex flex-col justify-center items-center min-w-[600px] w-max h-max bg-[var(--baseColor)] rounded-lg" >


            <div className="wrapper-header flex justify-between w-full">

                <div>

                </div>

                <div className="msg flex justify-center items-center font-bold text-[20px]">{msg}</div>

                <Button
                    onClick={() => close()}
                    textButton={"X"}
                    className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />

            </div>


            <div className="wrapper-form-select-product flex-col w-full h-full mt-3" >

                <div className="new-size flex justify-between m-3 items-center w-[95%]">
                    <Button
                        onClick={handleClickSaveNewSize}
                        textButton={"Save New Size"}
                        className={' flex justify-center items-center w-max p-2 h-6 font-bold bg-[var(--sliderColor)] rounded-md hover:text-white hover:bg-[var(--baseColor)]'} />
                    <input
                        className='w-full max-w-[300px] h-[35px] font-bold text-[15px] text-center '
                        placeholder="New Size"
                        value={newSize}
                        id={newSize}
                        type={"email"}
                        onChange={(e) => setNewSize(e.target.value)}
                    />
                </div>


                <div className="new-size flex flex-col justify-center items-center m-3 w-[95%]">

                    <label className="w-full p-2 text-[17px] font-bold"> Sizes </label>
                    <div className="relative flex flex-col justify-center items-center w-full rounded-[10px] cursor-pointer  bg-white shadow-[0_4px_5px_-4px_#3b71ca] " style={{ height: '25px' }} onClick={() => setToggleSizeCollapse(!toggleSizeCollapse)}> {toggleSizeCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
                        <div className="absolute top-0 flex flex-col justify-center items-center w-full rounded-[10px] border border-gray-200  bg-white z-1" style={{ height: `${toggleSizeCollapse ? 'auto' : '25px'}`, }} >
                            <p className="flex flex-col justify-center items-center h-[25px]"> Available</p>

                            <i className="arrowUpDown flex justify-center items-start text-center h-full  absolute text-[20px] top-0.5 right-0 cursor-pointer hover:text-red-600" onClick={() => setToggleSizeCollapse(!toggleSizeCollapse)}> {toggleSizeCollapse ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}</i>
                            {sizesProductAvailable?.map((size: any, index: number) => {
                                return (
                                    <div key={index} className="flex justify-around items-center w-full h-auto m-1 " style={{ display: `${toggleSizeCollapse ? 'flex' : 'none'}` }}>
                                        <p className="flex justify-around items-center w-full ">
                                            <span className="w-24 text-left "> {size.name}  </span> <i className="flex justify-center items-center w-max h-[25px] cursor-pointer hover:text-red-600" onClick={() => console.log('clicked')}><FaTrash /></i> </p>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>



            </div>



        </div>
    )
};

export default Size;
