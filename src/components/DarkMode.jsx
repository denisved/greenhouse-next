"use client";

import {MdLightMode, MdDarkMode} from 'react-icons/md';

import { useTheme } from 'next-themes';

export default function DarkMode() {
    const {theme, setTheme, systemTheme} = useTheme()
    const currentTheme = theme === 'system' ? systemTheme : theme
  return (
    <div> 
        {currentTheme === 'dark' ? 
        (<MdLightMode onClick={()=>setTheme('light')} className = 'text-3xl cursor-pointer hover:text-green-500' />) 
        : 
        (<MdDarkMode onClick={()=>setTheme('dark')} className = 'text-3xl cursor-pointer hover:text-green-500' />)} 
    </div>
  )
}
 