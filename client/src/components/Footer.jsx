import React from 'react'

function Footer() {
  return (
   <footer className="w-full border-t bg-[var(--bg-color)] text-[var(--text-color)] py-6 px-4 flex flex-col md:flex-row items-center justify-between">
  <p className="text-center text-sm font-medium">
    Crafted with ❤️ by <span className="font-semibold">Prince Kumar</span>
  </p>
  
  <div className="flex items-center gap-4 mt-4 md:mt-0">
    <a href="https://www.linkedin.com/in/prince-kumar-788673253/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
      <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-6 h-6" />
    </a>
    <a href="https://github.com/princeInScripts" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
      <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className="w-6 h-6" />
    </a>
    <a href="https://instagram.com/scriptxprince" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
      <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-6 h-6" />
    </a>
    <a href="mailto:pk8917912@example.com" className="hover:scale-110 transition-transform">
      <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-6 h-6" />
    </a>
  </div>
</footer>

  )
}

export default Footer
