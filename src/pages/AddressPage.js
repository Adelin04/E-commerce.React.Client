import React from 'react';
import AddressForm from '../components/AdressForm';
import { useSelector } from 'react-redux';
import { selectShoppingCart } from '../Features/ShoppingCartSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AddressPage = () => {
    const { shoppingCartList, nrProducts, totalPrice, currency } =
        useSelector(selectShoppingCart);

    return (
        <div className='AddressPage flex flex-col justify-between items-center h-full w-full'>
            <Header />

            <div className='wrapper-address flex justify-center items-center w-full h-full m-4'>
                <AddressForm />
            </div>

            <Footer />

        </div>
    )
}


export default AddressPage;