import React from "react";
import { IoMdCloudUpload } from "react-icons/io";
import { SiFsecure, SiReact, SiRedux, SiTailwindcss, SiNodedotjs, SiGithub } from "react-icons/si";
import { GoFileSubmodule } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaLink, FaTwitter, FaShareSquare, FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="font-sans bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-gray-900 text-white text-center py-6">
        <h1 className="text-4xl font-bold">🚀 Share Pod</h1>
        <p className="mt-2 text-lg">Fast, secure & simple file sharing solution</p>
      </header>

      {/* Hero Section */}
      <section className="bg-white text-center py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">File Sharing, Made Effortless</h2>
          <p className="text-lg mb-6 text-gray-600">
            Drag, upload, and share your files instantly. No hassle.
          </p>
          <Link to="/dashbaord">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-white rounded-full font-medium shadow">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-14 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Share Pod?</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <IoMdCloudUpload size={60} className="mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2">Seamless Uploads</h3>
            <p>Upload large files easily and securely.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <SiFsecure size={55} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p>Password-protected links with expiry options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <GoFileSubmodule size={55} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Access Anywhere</h3>
            <p>Files available 24/7 across devices.</p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-14 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">How it Works</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <TbUpload size={55} className="mx-auto mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <p>Drag and drop your files into the uploader.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <FaLink size={55} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Generate Link</h3>
            <p>Get a secure link to share instantly.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <FaShareSquare size={55} className="mx-auto mb-4 text-pink-500" />
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p>Send the link to your peers or clients.</p>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="bg-gray-100 py-14 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Built With Modern Tools</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <SiReact size={40} className="text-cyan-500 mb-2" />
            <p className="font-medium">React</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <SiRedux size={40} className="text-purple-500 mb-2" />
            <p className="font-medium">Redux Toolkit</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <SiTailwindcss size={40} className="text-sky-400 mb-2" />
            <p className="font-medium">Tailwind CSS</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
            <SiNodedotjs size={40} className="text-green-600 mb-2" />
            <p className="font-medium">Node.js (Backend)</p>
          </div>
        </div>
      </section>

      {/* Developer Info */}
      <section className="bg-white py-12 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <FaLaptopCode size={40} className="mx-auto text-gray-700 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Crafted by Prince Kumar</h2>
          <p className="text-gray-600 mb-4">
            Passionate MERN stack developer dedicated to building fast and user-friendly web experiences.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/princeInScripts"
              target="_blank"
              className="text-gray-700 hover:text-black flex items-center space-x-2"
            >
              <SiGithub size={22} />
              <span>GitHub</span>
            </a>
            <a
              href="https://scriptxprince.me"
              target="_blank"
              className="text-blue-600 hover:underline flex items-center space-x-2"
            >
              <FaLink size={22} />
              <span>Portfolio</span>
              
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Start Sharing Today</h2>
        <Link to="/dashboard">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition shadow">
            Upload Files
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; {new Date().getFullYear()} Share Pod. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" className="hover:text-blue-400"><FaFacebook size={24} /></a>
          <a href="https://twitter.com" className="hover:text-sky-400"><FaTwitter size={24} /></a>
          <a href="https://instagram.com" className="hover:text-pink-500"><FaInstagram size={24} /></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
