import React from 'react'
import { SiSharex } from 'react-icons/si'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-gray-100 py-4 px-20 flex justify-between items-center">
    <div className="flex items-center">
      
     <Link to={'/'}><SiSharex className="h-8 w-8 mr-4"/></Link> 
     <Link to={'/'}><h1 className="text-lg font-bold">Share Pod</h1></Link> 
    </div>
    <div className="flex items-center space-x-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded-md"><Link to="/file-upload">Upload More Files</Link></button>
     
    </div>
  </header>
  )
}

export default Header
