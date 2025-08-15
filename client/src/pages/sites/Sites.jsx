import React from 'react'
import SiteForm from '../../components/site/SiteForm'
import Navbar2 from '../../components/Navbar2'

const Sites = () => {
  return (
    <div className="min-h-screen bg-gray-800"> 
      <div><Navbar2 /></div>
      <div><SiteForm/></div>
    </div>
  )
}

export default Sites
