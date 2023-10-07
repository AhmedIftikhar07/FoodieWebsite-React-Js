import React from 'react'
import Logo from '../images/logo.png'
import Avatar from '../images/avatar.png'
import { MdShoppingBasket } from "react-icons/md";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';



const Header = () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user}, dispatch] = useStateValue();

    const login = async()=>{
        const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
        dispatch({
            type: actionType.SET_USER,
            user: providerData[0],
        });
        localStorage.setItem("user", JSON.stringify(providerData[0]));
    }
    return (
        <header className='fixed z-50 w-screen p-6 px-16'>

            {/* desktop & tab  */}



            <div className='hidden md:flex w-full h-full items-center justify-between'>

                <Link to={"/"} className='flex items-center gap-2'>
                    <motion.img whileTap={{scale:0.7}} className='w-8 object-cover' src={Logo} alt="logo" />
                    <p className='text-headingColor text-xl font-bold'>Food</p>
                </Link>

                <div className='flex items-center gap-8'>
                    <ul className='flex items-center gap-8'>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About</li>
                        <li className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Service</li>
                    </ul>
                    <motion.div
                    whileTap={{scale:0.6}}
                     className='relative flex items-center justify-center' >
                        <MdShoppingBasket className='text-textColor text-2xl hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer' />
                        <div className='cursor-pointer absolute -top-2 -right-3 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center p-2'>
                            <p className='text-xs text-white font-semibold'>2</p>
                        </div>
                    </motion.div>

                    <div className='relative'>
                    <motion.img
                    whileTap={{scale:0.6}}
                     className='w-10 min-[40px] h-10 min-h-[40px] shadow-md rounded-full cursor-pointer' src={user ? user.photoURL : Avatar} alt="userprofile"
                     onClick={login}
                      />
                    </div>
                </div>

            </div>


            {/* mobile */}


            <div className='flex md:hidden w-full  h-full '>

            </div>
        </header>
    )
}

export default Header
