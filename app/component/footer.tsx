'use client'

import React from "react";

import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import Button from "./button";
import Link from "next/link";
import { useState } from "react";

//  Footer component
const Footer = () => {
  const [emailSubscriber, setEmailSubscriber] = useState('')


  return (
    <div className={'containerFooter flex justify-between items-center w-full h-max md:flex-col sm:flex-col'} style={{ background: 'var(--baseColor)' }} >

      <div className={'containerSocialMedia flex flex-col justify-between items-center w-[50%] h-full'}>

        <div className={'wrapperSocialMediaIcons flex justify-center items-center w-[80%] h-full'} >
          <Link className={'linkIconSocialMedia w-max h-max m-2 p-1'} href={'/'} >
            <FaFacebook className={'iconSocialMedia w-[30px] h-[30px] sm:w-[20px] sm:h-[20px]'} />
          </Link >
          <Link className={'linkIconSocialMedia w-max h-max m-2 p-1'} href={'/'} >
            <FaInstagram className={'iconSocialMedia w-[30px] h-[30px]  sm:w-[20px] sm:h-[20px]'} />
          </Link >
          <Link className={'linkIconSocialMedia w-max h-max m-2 p-1'} href={'/'} >
            <FaYoutube className={'iconSocialMedia w-[30px] h-[30px]  sm:w-[20px] sm:h-[20px]'} />
          </Link >
          <Link className={'linkIconSocialMedia w-max h-max m-2 p-1'} href={'/'} >
            <FaMailBulk className={'iconSocialMedia w-[30px] h-[30px]  sm:w-[20px] sm:h-[20px]'} />
          </Link >
        </div>

        <div className={'containerCopyRight flex flex-col justify-center items-center min-w-[50px] w-full h-max m-2 text-center '}>
          <p className="block text-center w-auto"> Made In Romania by <Link className="flex flex-col justify-center items-center text-blue-500 font-bold" target="_blank" href={'https://adelin-marin-portfolio.netlify.app/'}><span className="flex justify-center items-center w-max px-2">Adelin Marin</span></Link> © {new Date().getFullYear()} </p>
        </div>

      </div>

      <div className={'containerNewsletter flex flex-col justify-between items-center min-w-[350px] w-[50%] h-full'}>

        <h3 className={'title m-1 p-1 text-[17px] font-bold'}> Newsletter </h3>

        <input
          className={'inputNewsletter min-w-[150px] max-w-[60%] h-[30px] m-1'}
          placeholder="E-mail Address"
          value={emailSubscriber}
          id={emailSubscriber}
          type={"email"}
          onChange={(e) => setEmailSubscriber(e.target.value)}
        />

        <div className={'terms flex flex-col justify-center items-center m-0 w-full'}>

          <div className='flex justify-center items-center w-auto h-auto sm:flex-col'>
            <input className='checkBox w-[20px] h-[20px] cursor-pointer' type="checkbox" />
            <p className='text-center w-auto h-auto p-0'>I agree to all terms and conditions</p>
          </div>

          <div className='flex justify-center items-center w-full h-full '>
            <p className={'readTerms w-max border-b-2 border-red-400 '} >
              <Link href={'/termsAndCondition '} className="text-red-400">Read the terms and conditions</Link>
            </p>
          </div>

        </div>

        <Button
          textButton={"Subscribe"}
          onClick={() => {
            console.log(`send the email confirmation for ${emailSubscriber}`!)
            setEmailSubscriber('')
          }}

        />

      </div>

    </div>
  );
};

export default Footer;