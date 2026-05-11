import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import NavLink from './shared/NavLink';

const Navbar = () => {
    return (
        <nav className='flex justify-between p-4 bg-white container mx-auto'>
            <ul className='flex gap-4 font-semibold'>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/destinations">Destinations</NavLink>
                <NavLink href="/my-bookings">My Bookings</NavLink>
                <NavLink href="/admin">Admin</NavLink>
            </ul>

            <div>
                <Image src={"/assets/Wanderlast.png"} width={150} height={150} alt='logo'></Image>
            </div>

            <ul className='flex gap-4 font-semibold'>
                <NavLink href="/profile">Profile</NavLink>
                <NavLink href="/login">Login</NavLink>
                <NavLink href="/signup">Sign Up</NavLink>
            </ul>
        </nav>
    );
};

export default Navbar;