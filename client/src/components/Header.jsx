import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';


const Header = () => {
  const {userData} = useContext(AppContent);
  return (
    <div>
      
    <h1> {userData ? userData.name : 'Not Working!'} </h1>

    </div>
  )
}

export default Header
