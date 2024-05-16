import React from 'react'
import MenuItem from './MenuItem'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { PiPottedPlantFill } from "react-icons/pi";
import { ImConnection } from "react-icons/im";
import { FaDatabase } from "react-icons/fa6";
import Link from 'next/link';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-5 max-w-screen-2xl mx-auto'>
        <div className='flex gap-4'>  
            <MenuItem title ="about" address="/about" Icon={BsFillInfoCircleFill}/>
            <MenuItem title ="connect" address="/connect" Icon={ImConnection}/>
            <MenuItem title ="data storage" address="/data" Icon={FaDatabase}/>
        </div>
        <Link href={"/"} className='flex gap-1 justify-center'>
          <PiPottedPlantFill className='text-6xl font-bold bg-green-500 py-1 px-2 rounded-lg'/>
        </Link>
    </div>
  )
}
