import React from 'react'

const Hero = () => {
 return (
    <section className="bg-[rgb(15,41,60)] text-white py-20 px-6 md:px-12 lg:px-24 ">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight ">
          Connected Freight. Seamless Delivery.
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Smart tracking. Reliable carriers. Logistics made simple.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-md">
            Get Started
          </button>
          <button className="bg-transparent border border-yellow-400 text-yellow-400 font-bold py-3 px-6 rounded-md hover:bg-yellow-500 hover:text-gray-900 transition">
            Request a Demo
          </button>
        </div>

      </div>
    </section>
  )
}

export default Hero