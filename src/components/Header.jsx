import React from 'react'
import Logo from '../images/logo.png'
import Avatar from '../images/avatar.png'
import { MdShoppingBasket } from "react-icons/md";
const Header = () => {
    return (
        <header className='fixed z-50 w-screen p-6 px-16'>

            {/* desktop & tab  */}



            <div className='hidden md:flex w-full h-full items-center justify-between'>

                <div className='flex items-center gap-2'>
                    <img className='w-8 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>Food</p>
                </div>

                <div className='flex items-center gap-8'>
                    <ul className='flex items-center gap-8'>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Service</li>
                    </ul>
                    <div className='relative flex items-center justify-center' >
                        <MdShoppingBasket className='text-textColor text-2xl hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                        <div className='absolute -top-2 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center p-2'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </div>

                    <img className='w-10 min-[40px] h-10 min-h-[40px] shadow-md rounded-full' src={Avatar} alt="userprofile" />
                </div>

            </div>


            {/* mobile */}


            <div className='flex md:hidden w-full  h-full '>

            </div>
        </header>
    )
}

export default Header
