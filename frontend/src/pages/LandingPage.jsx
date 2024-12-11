import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-yellow-500">VSMS</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="block text-gray-900">VEHICLE SERVICE</span>
              <span className="block text-yellow-500 mt-2">MANAGEMENT SYSTEM</span>
            </h1>

            {/* Circular Icons */}
            <div className="mt-20 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-gray-800 rounded-full opacity-10"></div>
              </div>
              <div className="relative grid grid-cols-4 gap-8 max-w-lg mx-auto">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-16 h-16 bg-red-400 rounded-full opacity-20
                    ${i >= 4 ? 'transform translate-y-8' : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-20">
              <Link
                to="/dashboard"
                className="inline-block px-8 py-3 text-lg font-medium text-white bg-yellow-500 
                         rounded-md hover:bg-yellow-600 transition-colors duration-200"
              >
                TELL ME MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 