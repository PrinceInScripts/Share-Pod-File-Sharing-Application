import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 py-4 px-6 mt-10">
        <div className="text-center">
          <p>&copy; 2024 Your Website Name. All rights reserved.</p>
          <p>
            <a href="/terms" className="text-blue-500">Terms of Service</a> | 
            <a href="/contact" className="text-blue-500"> Contact Us</a>
          </p>
        </div>
      </footer>
  )
}

export default Footer
