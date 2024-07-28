import React from "react";
// import "../index.css";
import FileUpload from "../components/FleUpload";
import { IoMdCloudUpload } from "react-icons/io";
import { SiFsecure } from "react-icons/si";
import { GoFileSubmodule } from "react-icons/go";
import { TbUpload } from "react-icons/tb";
import { FaFacebook, FaInstagram, FaLink, FaTwitter } from "react-icons/fa6";
import { FaShareSquare } from "react-icons/fa";



const Home = () => {
  return (
    <div className="">
      {/* Header Section */}
      <header className="bg-gray-800 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Share Pod</h1>
        <p className="mt-2">Share files effortlessly, anywhere, anytime</p>
      </header>

      {/* Hero Section */}
      <section className="bg-white text-center py-12 px-4">
        <h2 className="text-4xl font-bold mb-4">
          Simplified File Sharing for Everyone
        </h2>
        <p className="text-xl mb-6">
          Upload, share, and access files with ease
        </p>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">
          What makes Share Pod special?
        </h2>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/3">
            <div className="bg-white p-6 h-52 rounded-lg shadow-lg">
              <IoMdCloudUpload size={60}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">Easy File Uploads</h3>
              <p>Upload your files quickly and easily.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white p-6 h-52 rounded-lg shadow-lg">
              <SiFsecure size={55}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">Secure Sharing</h3>
              <p>Share files securely with anyone.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white p-6 h-52 rounded-lg shadow-lg">
              <GoFileSubmodule size={55}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">Quick Access</h3>
              <p>Access your files from anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="bg-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-8">How Share Pod works</h2>
        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-6 h-52 rounded-lg shadow-lg">
             
              <TbUpload size={55}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">Upload your file</h3>
              <p>Select and upload the file you want to share.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-100 h-52 p-6 rounded-lg shadow-lg">
              <FaLink size={55}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">
                Get your shareable link
              </h3>
              <p>Receive a link to share with anyone.</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-gray-100 p-6 h-52 rounded-lg shadow-lg">
             
              <FaShareSquare size={55}  className="mx-auto mb-4"/>
              <h3 className="text-xl font-bold mb-2">Share with anyone</h3>
              <p>Send the link to your friends, family, or colleagues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-500 text-white text-center py-12 px-4">
        <h2 className="text-3xl font-bold mb-4">Ready to start sharing?</h2>
        <button className="bg-white text-blue-500 px-6 py-3 rounded-full hover:bg-gray-100">
          Upload Your First File
        </button>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2024 Share Pod. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://facebook.com" className="hover:text-blue-500">
            <FaFacebook size={24}/>
          </a>
          <a href="https://twitter.com" className="hover:text-blue-500">
            <FaTwitter size={24}/>
          </a>
          <a href="https://instagram.com" className="hover:text-blue-500">
            <FaInstagram size={24}/>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;