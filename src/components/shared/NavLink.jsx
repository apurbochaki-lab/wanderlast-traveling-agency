'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
    const pathName = usePathname()

    return (
        <li>
            <Link href={href} className={`${pathName === href && "text-blue-500 font-bold"}`}>
                {children}
            </Link>
        </li>
    );
};

export default NavLink;