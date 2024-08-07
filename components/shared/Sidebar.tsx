"use client"
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

function Sidebar() {

  const pathname = usePathname();

  return (
    <aside className='sidebar border-r-4 border-gray-800'>
        <div className='flex size-full flex-col gap-4'>
            <Link href="/" className='sidebar-logo'>
                <Image src="/assets/images/logo-icon.png" alt="logo" width={230} height={30}/>
            </Link>

            <nav className='sidebar-nav '>
                <SignedIn>
                    <ul className='sidebar-nav_elements '>
                        {navLinks.slice(0,6).map((link)=>{
                            const isActive = link.route === pathname
                            return(
                                <li key={link.route} className={`sidebar-nav_element rounded-md group border-4 shadow-xl ${
                                    isActive ? 'border-black bg-purple-500 hover:bg-purple-500 text-white' : 
                                    'border-black text-gray-800 bg-white'} hover:bg-purple-300
                                     hover:border-gray-900 hover:translate-y-[5px] hover:translate-x-[5px]
                                      hover:shadow-none transition-all duration-100 shadow-[5px_5px_0px_2px_#000000] mb-5`}>
                                    <Link className='sidebar-link' href={link.route}>
                                     <Image 
                                        src={link.icon}
                                        alt="link logo"
                                        width={24}
                                        height={24}
                                        className={`${isActive && 'brightness-200' }`}
                                     />
                                      {link.label}
                                    </Link>
                                </li>
                            )
                        })}
                        </ul>
                        
                    {/* Second List of elements for profile and credit */}
                    <ul className='sidebar-nav_elements '>
                            {navLinks.slice(6).map((link)=>{
                                const isActive = link.route === pathname
                                return(
                                    <li key={link.route} className={`sidebar-nav_element rounded-md group  ${
                                        isActive ? 'border-gray-800 bg-purple-500 text-white' : 
                                        'border-gray-800 text-gray-800 bg-white'} hover:bg-gray-300
                                        hover:border-gray-900 hover:shadow-2xl transition-all duration-200`}>
                                        <Link className='sidebar-link' href={link.route}>
                                        <Image 
                                            src={link.icon}
                                            alt="link logo"
                                            width={24}
                                            height={24}
                                            className={`${isActive && 'brightness-200' } mx-2`}
                                        />
                                        {link.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        <li className='flex-center cursor-pointer gap-2 p-4'>
                            <UserButton afterSignOutUrl='/' showName/>
                        </li>
                    </ul>
                </SignedIn>
                <SignedOut>
                    <Button asChild className='button bg-purple-gradient bg-cover'>
                        <Link href='/sign-in'>
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </nav>
        </div>
    </aside>
  )
}

export default Sidebar
