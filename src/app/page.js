'use client';
import React from 'react'
import Mqtt from '@/components/Mqtt';


export default function page() {
  return (
    <div className='flex gap-10 items-center p-5 max-w-screen-sm mx-auto'>
      <Mqtt />
    </div>
  )
}
