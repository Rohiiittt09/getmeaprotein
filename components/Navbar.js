"use client"
import React, { useState } from 'react'


import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"


const Navbar = () => {

  const [showdrop, setshowdrop] = useState(false)

  const { data: session } = useSession()
  // if(session) {
  //   return <>
  //     Signed in as {session.user.email} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>}
  return (
   <nav className='flex fixed z-20 top-0 w-screen justify-between px-2 md:px-4 h-[8vh] items-center bg-gray-800 text-white font-bold'>
    <div><Link href="/"><h1 className='text-[12px] md:text-2xl'>GETMEAPROTEN!</h1></Link></div>
    {/* <ul className=' flex justify-center gap-4'>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/contact">Projects</a></li>
      <li><a href="/signup">Sign Up</a></li>
      <li><a href="/login">Login</a></li>
    </ul> */}
    <div className=' flex gap-2 md:gap-5'>
      {session && <><div className='flex flex-col'>
<button onClick={()=>{setshowdrop(!showdrop)}} onBlur={()=>{setTimeout(()=>{setshowdrop(false)}, 400)}} id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="inline-flex cursor-pointer w-fit my-auto h-fit text-[10px] md:text-[18px] rounded-2xl items-center justify-center  bg-brand box-border text-white bg-gradient-to-br from-purple-600 to-blue-500hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
  Welcome {session.user.name}
  <svg className="w-4 h-4 ms-1.5 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7"/></svg>
</button>

<div id="dropdownDelay" className={`z-10 ${showdrop?"":"hidden"}   absolute z-80 pt-10 mt-5 border-t-0  bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-fit`}>
    <ul className="p-2 text-sm text-[10px] md:text-[18px]   text-body font-medium" aria-labelledby="dropdownDelayButton">
      <li>
      <Link
        href="/dashboard"
        className="inline-flex items-center w-full p-2  rounded hover:bg-slate-800"
      >
        Dashboard
      </Link>
    </li>
       <li>
      <Link
        href={`/${session.user.name}`}
        className="inline-flex items-center w-full p-2 rounded hover:bg-slate-800"
      >
        Your Page
      </Link>
    </li>
    </ul>
</div></div></>
}
    {session && <button type="button" onClick={()=>{signOut()}} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-2xl h-fit text-[10px] md:text-[18px]  my-auto text-sm px-4 py-2.5 cursor-pointer text-center leading-5">LogOut</button> }
    
    </div>
    {!session && <Link href={"/login"}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800  font-medium rounded-2xl text-[10px] md:text-[18px]   text-sm px-4 py-2.5 cursor-pointer text-center leading-5">Login</button>
    </Link>}    

   </nav>
  )
}

export default Navbar
