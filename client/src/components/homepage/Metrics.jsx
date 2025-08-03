import React from 'react'

const Metrics = () => {
return (
    <section className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Trusted by Thousands. Built for Scale.
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Carrier Connect empowers businesses to move smarter with fast, reliable, and secure logistics tools.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500">5,000+</h3>
            <p className="text-gray-700 mt-2">Active Carriers</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500">100,000+</h3>
            <p className="text-gray-700 mt-2">Monthly Shipments</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500">99.8%</h3>
            <p className="text-gray-700 mt-2">Delivery Accuracy</p>
          </div>
          <div>
            <h3 className="text-4xl font-extrabold text-yellow-500">99.99%</h3>
            <p className="text-gray-700 mt-2">Uptime Guarantee</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Metrics
