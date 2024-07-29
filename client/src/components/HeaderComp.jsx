import React from 'react'
import { SiSharex } from 'react-icons/si'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-gray-800 text-white  py-4 px-4 lg:px-20 flex justify-between items-center">
    <div className="flex items-center">
      
     <Link to={'/'}><SiSharex className="lg:h-8 lg:w-8 w-4 h-4 mr-2 lg:mr-4"/></Link> 
     <Link to={'/'}><h1 className="lg:text-2xl text-lg font-serif font-bold">Share Pod</h1></Link> 
    </div>
    <div className="flex items-center space-x-4">
      <button className="bg-blue-500 text-white lg:py-2 lg:px-4 px-2 py-1 rounded-md"><Link to="/upload">Upload More Files</Link></button>
     
    </div>
  </header>
  )
}

export default Header
