import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[rgb(15,41,60)] text-gray-300 py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-4">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold text-yellow-500 mb-4">Carrier Connect</h3>
          <p>Your logistics partner for smarter shipping and seamless carrier management.</p>
          <p className="mt-4 text-sm text-gray-500">© 2025 Carrier Connect Inc. All rights reserved.</p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-500">About Us</a></li>
            <li><a href="#" className="hover:text-yellow-500">Careers</a></li>
            <li><a href="#" className="hover:text-yellow-500">Press</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-yellow-500">API Docs</a></li>
            <li><a href="#" className="hover:text-yellow-500">Help Center</a></li>
            <li><a href="#" className="hover:text-yellow-500">Logistics Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
          <p>123 Freight Lane, Suite 400</p>
          <p>Rogers, AR 72758</p>
          <p className="mt-2">Email: support@carrierconnect.io</p>
          <p>Phone: (479) 555-0198</p>
        </div>
      </div>
    </footer>

  )
}

export default Footer
