import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/homepage/Hero.jsx'
import ServiceOverview from '../components/homepage/ServiceOverview.jsx'
import Metrics from '../components/homepage/Metrics.jsx'
import CallToAction from '../components/homepage/CallToAction.jsx'
import Footer from '../components/homepage/Footer.jsx'

const Home = () => {
  return (
    <div>
      <div><Navbar /></div>
      <div className='pt-16'><Hero /></div> 
      <div><ServiceOverview /></div> 
      <div><Metrics /></div>
      <div><CallToAction /></div>
      <div><Footer /></div>
    </div>   
 )
}

export default Home
