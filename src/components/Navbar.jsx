'use client'

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import NavLink from './shared/NavLink';
import { Menu, X } from 'lucide-react';
import { Avatar, Button } from '@heroui/react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const Navbar = ({ session, refresh }) => {
    // console.log(session)

    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);
    // console.log(sidebarRef)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpen(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []);

    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        router.push("/login");
        refresh('/login')
    }

    return (
        <section className='bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm sticky top-0 z-50'>
            <nav className='flex justify-between items-center p-4 container mx-auto relative '>

                {/* Mobile Menu Icon */}
                <div className='md:hidden'>
                    <button onClick={() => setOpen(!open)}>
                        {
                            open
                                ? <X size={28} />
                                : <Menu size={28} />
                        }
                    </button>
                </div>

                {/* Desktop Left Nav */}
                <ul className='hidden md:flex gap-4 font-semibold'>
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/destinations">Destinations</NavLink>
                    <NavLink href="/my-bookings">My Bookings</NavLink>
                    <NavLink href="/admin">Admin</NavLink>
                </ul>

                {/* Logo */}
                <div>
                    <Image
                        src={"/assets/Wanderlast.png"}
                        width={150}
                        height={150}
                        alt='logo'
                    />
                </div>

                {/* Desktop Right Nav */}
                <div>
                    {session
                        ? <div className='flex items-center gap-4'>
                            <Avatar className='h-12 w-12'>
                                <Avatar.Image alt="John Doe" src={session?.user?.image} />
                                <Avatar.Fallback style={{textTransform: "uppercase", fontWeight: "bold"}}>{session?.user?.name.split(" ")[0].slice(0, 2)}</Avatar.Fallback>
                            </Avatar>
                            <h2 className='font-bold text-blue-500'>Hi, {session?.user?.name.split(" ")[0]}</h2>
                            <ul className='hidden md:flex gap-4 font-semibold'>
                                <NavLink href="/profile">Profile</NavLink>
                            </ul>
                            <Button className="rounded-lg text-red-500 font-bold" variant='outline' onClick={handleLogout}>Logout</Button>
                        </div>

                        : <ul className='hidden md:flex gap-4 font-semibold'>
                            <NavLink href="/login">Login</NavLink>
                            <NavLink href="/signup">Register</NavLink>
                        </ul>
                    }
                </div>

                {/* Mobile Sidebar */}
                <div
                    ref={sidebarRef}
                    className={`z-20 md:hidden absolute top-16 left-0 bg-white shadow-lg p-5 rounded-lg flex flex-col gap-4 font-semibold transition-all duration-300 ${open ? 'block' : 'hidden'
                        }`}
                >
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/destinations">Destinations</NavLink>
                    <NavLink href="/my-bookings">My Bookings</NavLink>
                    <NavLink href="/admin">Admin</NavLink>
                    <NavLink href="/profile">Profile</NavLink>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/signup">Sign Up</NavLink>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;