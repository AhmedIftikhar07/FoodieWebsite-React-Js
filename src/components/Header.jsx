import React, { useState } from 'react'
import Logo from '../images/logo.png'
import Avatar from '../images/avatar.png'
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);


    const login = async () => {

        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));

        } else {
            setIsMenu(!isMenu)
        }
    }
    const logoutHandle = () => {
        setIsMenu(false)
        localStorage.clear()
        dispatch({
            type: actionType.SET_USER,
            user: null,
        })
    }
    return (
        <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary drop-shadow-md'>

            {/* desktop & tab  */}



            <div className='hidden md:flex w-full h-full items-center justify-between'>

                <Link to={"/"} className='flex items-center gap-2'>
                    <motion.img whileTap={{ scale: 0.7 }} className='w-8 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>Food</p>
                </Link>

                <div className='flex items-center gap-8'>
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className='flex items-center gap-8'>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Service</li>
                    </motion.ul>
                    <motion.div
                        whileTap={{ scale: 0.6 }}
                        className='relative flex items-center justify-center' >
                        <MdShoppingBasket className='text-textColor text-2xl hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                        <div className='cursor-pointer absolute -top-2 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center p-2'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </motion.div>

                    <div className='relative'>
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            className='w-10 min-[40px] h-10 min-h-[40px] shadow-md rounded-full cursor-pointer'
                            src={user ? user.photoURL : Avatar}
                            alt="userprofile"
                            onClick={login}
                        />

                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                                    {
                                        user && user.email && (
                                            <Link to={'/createItem'}>
                                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                                active:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'>New Item <MdAdd /></p>
                                            </Link>
                                        )
                                    }

                                    <p
                                        onClick={logoutHandle}
                                        className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                                active:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base'>Logout <MdLogout /></p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>

            </div>


            {/* mobile */}


            <div className='flex md:hidden w-full  h-full items-center justify-between'>

                <motion.div
                    whileTap={{ scale: 0.6 }}
                    className='relative flex items-center justify-center' >
                    <MdShoppingBasket className='text-textColor text-2xl hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                    <div className='cursor-pointer absolute -top-2 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center p-2'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </motion.div>
                <Link to={"/"} className='flex items-center gap-2'>
                    <motion.img whileTap={{ scale: 0.7 }} className='w-8 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>Food</p>
                </Link>

                <div className='relative'>
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        className='w-10 min-[40px] h-10 min-h-[40px] shadow-md rounded-full cursor-pointer'
                        src={user ? user.photoURL : Avatar}
                        alt="userprofile"
                        onClick={login}
                    />

                    {
                        isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                                {
                                    user && user.email && (
                                        <Link to={'/createItem'}>
                                            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
                                active:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-sm'>New Item <MdAdd className='text-orange-400' /></p>
                                        </Link>
                                    )
                                }
                                <ul

                                    className='flex flex-col'>
                                    <li className='text-sm text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 hover:bg-slate-100 active:bg-slate-200'>Home</li>
                                    <li className='text-sm text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 hover:bg-slate-100 active:bg-slate-200'>Menu</li>
                                    <li className='text-sm text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 hover:bg-slate-100 active:bg-slate-200'>About</li>
                                    <li className='text-sm text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out px-4 py-2 hover:bg-slate-100 active:bg-slate-200'>Service</li>
                                </ul>
                                <p onClick={logoutHandle}
                                    className='px-4 py-2 mt-2 flex items-center justify-center gap-3 cursor-pointer bg-orange-100 hover:bg-orange-200
                                active:bg-orange-300
                                transition-all duration-100 ease-in-out text-textColor text-sm'>Logout <MdLogout className='text-orange-400 ' /></p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header
