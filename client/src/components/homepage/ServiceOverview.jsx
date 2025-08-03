import React from 'react'
import { FaTruck, FaSignal, FaLock, FaChartBar } from "react-icons/fa";

const ServiceOverview = () => {
 return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Our Core Services
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Carrier Connect brings clarity to logistics with powerful tools and seamless integrations.
        </p>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Service 1 */}
          <div className="flex flex-col items-center text-center">
            <FaTruck className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600">
              Stay updated on every carrier’s location and shipment status without guesswork.
            </p>
          </div>

          {/* Service 2 */}
          <div className="flex flex-col items-center text-center">
            <FaSignal className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Automated Updates</h3>
            <p className="text-gray-600">
              Deliver notifications to clients and teams with real-time event triggers.
            </p>
          </div>

          {/* Service 3 */}
          <div className="flex flex-col items-center text-center">
            <FaLock className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure API Integration</h3>
            <p className="text-gray-600">
              Connect your backend safely with robust, encrypted endpoints.
            </p>
          </div>

          {/* Service 4 */}
          <div className="flex flex-col items-center text-center">
            <FaChartBar className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Performance Analytics</h3>
            <p className="text-gray-600">
              Access key carrier metrics and delivery insights in a visual dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>


  )
}

export default ServiceOverview
