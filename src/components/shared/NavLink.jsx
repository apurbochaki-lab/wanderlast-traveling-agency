'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const pathName = usePathname()

    return (
        <li>
            <Link href={href} className={`${pathName === href && "text-blue-500 font-bold bg-zinc-200 p-1.5 rounded-lg"}`}>
                {children}
            </Link>
        </li>
    );
};

export default NavLink;