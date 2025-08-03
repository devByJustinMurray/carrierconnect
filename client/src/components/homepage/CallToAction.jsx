import React from 'react'

const CallToAction = () => {
  return (
    <section className="bg-yellow-400 text-gray-900 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to streamline your carrier operations?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of logistics professionals using Carrier Connect to simplify shipments and elevate performance.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-gray-900 hover:bg-gray-800 text-yellow-400 font-bold py-3 px-6 rounded-md">
            Sign Up Free
          </button>
          <button className="border-2 border-gray-900 text-gray-900 font-bold py-3 px-6 rounded-md hover:bg-gray-900 hover:text-yellow-500 transition">
            Book a Demo
          </button>
        </div>
      </div>
    </section>

  )
}

export default CallToAction
