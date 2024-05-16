import MenuItem from './MenuItem'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { PiPottedPlantFill } from "react-icons/pi";
import { ImConnection } from "react-icons/im";
import { FaDatabase } from "react-icons/fa6";
import Link from 'next/link';
import DarkMode from './DarkMode';

export default function Header() {
  return (
    <div className='flex justify-between items-center p-5 max-w-screen-2xl mx-auto'>
        <div className='flex gap-5'>  
            <MenuItem title ="about" address="/about" Icon={BsFillInfoCircleFill}/>
            <MenuItem title ="connect" address="/connect" Icon={ImConnection}/>
            <MenuItem title ="data storage" address="/data" Icon={FaDatabase}/>
        </div>
        <div className='flex items-center gap-10'>
          <Link href={"/"} className='flex gap-1 justify-center'>
            <PiPottedPlantFill className='text-6xl font-bold bg-green-500 py-1 px-1 rounded-lg'/>
          </Link>
          <DarkMode />
        </div>
    </div>
  )
}
