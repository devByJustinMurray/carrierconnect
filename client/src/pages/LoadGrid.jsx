import React from 'react'
import Grid from '../components/Grid.jsx'
import { assets } from '../assets/assets.js';

const LoadGrid = () => {
  return (
    <div >
        <div className="w-full flex justify-between items-center bg-[rgb(15,41,60)] absolute pb-5 pt-5">
        <img src={assets.miniLogo} alt="Mini Logo" className=" sm: w-32 ml-15" />
        <h1 className="text-4xl font-bold text-yellow-400 pr-200" >Truckload Dashboard</h1>
        </div>
        <div className="min-h-screen bg-gray-200 pt-35">
        <Grid/>
        </div>

    </div>
  )
}

export default LoadGrid
