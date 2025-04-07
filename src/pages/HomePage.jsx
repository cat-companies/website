import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCompany } from '../context/CompanyContext';

function HomePage() {
  const { companyColors, setCompany } = useCompany();
  const [hoveredCompany, setHoveredCompany] = useState(null);
  
  // Get the colors for the currently hovered company
  const colors = hoveredCompany ? companyColors[hoveredCompany] : null;
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="py-12 md:py-20 px-4 transition-all duration-500"
        style={{ 
          background: colors 
            ? `linear-gradient(to bottom, ${colors.background.replace('0.1', '0.05')}, white)` 
            : 'linear-gradient(to bottom, rgba(51, 51, 51, 0.05), white)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 transition-colors duration-500"
              style={{ color: colors ? colors.primary : '#333333' }}
            >
              Welcome to Cat Companies
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10">
              A family of innovative companies providing comprehensive solutions for your business needs.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Link 
                to="/computers" 
                className="px-6 py-3 rounded-lg font-medium transition-all duration-500"
                style={{ 
                  backgroundColor: colors ? colors.primary : '#333333',
                  color: colors ? colors.highlight : 'white',
                  border: colors ? `2px solid ${colors.primary}` : 'none'
                }}
                onMouseEnter={() => setHoveredCompany('computers')}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                Explore Our Services
              </Link>
              <a 
                href="#companies" 
                className="px-6 py-3 rounded-lg font-medium transition-all duration-500"
                style={{ 
                  backgroundColor: colors ? 'transparent' : '#f3f4f6',
                  color: colors ? colors.primary : '#333333',
                  border: colors ? `2px solid ${colors.primary}` : 'none'
                }}
                onMouseEnter={() => setHoveredCompany('computers')}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Companies Section */}
      <section id="companies" className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-16 transition-colors duration-500"
            style={{ color: colors ? colors.primary : '#333333' }}
          >
            Our Companies
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {/* Computers */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: hoveredCompany === 'computers' 
                  ? companyColors.computers.primary 
                  : '#333333'
              }}
              onMouseEnter={() => setHoveredCompany('computers')}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              <div className="p-4 md:p-6 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Cat Computers</h3>
                <p className="text-white/90 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                  Managed IT services, hardware solutions, and technical support to keep your business running smoothly.
                </p>
                <Link 
                  to="/computers" 
                  className="mt-auto inline-block px-4 py-2 rounded-lg font-medium transition-all duration-500 text-center text-sm md:text-base"
                  style={{ 
                    backgroundColor: hoveredCompany === 'computers' ? 'white' : 'white',
                    color: hoveredCompany === 'computers' ? companyColors.computers.primary : '#333333',
                    border: hoveredCompany === 'computers' ? `2px solid white` : 'none'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Campaigns */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: hoveredCompany === 'campaigns' 
                  ? companyColors.campaigns.primary 
                  : '#333333'
              }}
              onMouseEnter={() => setHoveredCompany('campaigns')}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              <div className="p-4 md:p-6 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Cat Campaigns</h3>
                <p className="text-white/90 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                  Strategic marketing campaigns that drive engagement, increase brand awareness, and generate leads.
                </p>
                <Link 
                  to="/campaigns" 
                  className="mt-auto inline-block px-4 py-2 rounded-lg font-medium transition-all duration-500 text-center text-sm md:text-base"
                  style={{ 
                    backgroundColor: hoveredCompany === 'campaigns' ? 'white' : 'white',
                    color: hoveredCompany === 'campaigns' ? companyColors.campaigns.primary : '#333333',
                    border: hoveredCompany === 'campaigns' ? `2px solid white` : 'none'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Phish */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: hoveredCompany === 'phish' 
                  ? companyColors.phish.primary 
                  : '#333333'
              }}
              onMouseEnter={() => setHoveredCompany('phish')}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              <div className="p-4 md:p-6 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Cat Phish</h3>
                <p className="text-white/90 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                  Comprehensive cybersecurity solutions to protect your business from threats and ensure data security.
                </p>
                <Link 
                  to="/phish" 
                  className="mt-auto inline-block px-4 py-2 rounded-lg font-medium transition-all duration-500 text-center text-sm md:text-base"
                  style={{ 
                    backgroundColor: hoveredCompany === 'phish' ? 'white' : 'white',
                    color: hoveredCompany === 'phish' ? companyColors.phish.primary : '#333333',
                    border: hoveredCompany === 'phish' ? `2px solid white` : 'none'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Compute */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:scale-105"
              style={{ 
                backgroundColor: hoveredCompany === 'compute' 
                  ? companyColors.compute.primary 
                  : '#333333'
              }}
              onMouseEnter={() => setHoveredCompany('compute')}
              onMouseLeave={() => setHoveredCompany(null)}
            >
              <div className="p-4 md:p-6 h-full flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-white">Cat Compute</h3>
                <p className="text-white/90 mb-4 md:mb-6 flex-grow text-sm md:text-base">
                  Cloud computing solutions that provide scalability, flexibility, and cost-efficiency for your business.
                </p>
                <Link 
                  to="/compute" 
                  className="mt-auto inline-block px-4 py-2 rounded-lg font-medium transition-all duration-500 text-center text-sm md:text-base"
                  style={{ 
                    backgroundColor: hoveredCompany === 'compute' ? 'white' : 'white',
                    color: hoveredCompany === 'compute' ? companyColors.compute.primary : '#333333',
                    border: hoveredCompany === 'compute' ? `2px solid white` : 'none'
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section 
        className="py-6 px-0 transition-all duration-500 w-full overflow-hidden"
        style={{ 
          backgroundColor: colors 
            ? colors.background.replace('0.1', '0.05') 
            : 'rgb(249, 250, 251)'
        }}
      >
        <div className="w-full">
          <h2 
            className="text-2xl md:text-3xl font-bold text-center mb-6 transition-colors duration-500"
            style={{ color: colors ? colors.primary : '#333333' }}
          >
            Our Partners
          </h2>
          
          <div className="partners-container overflow-hidden">
            <div className="partners-scroll flex items-center">
              {/* First set of logos */}
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 1</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 2</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 3</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 4</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 5</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 6</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 7</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 8</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 9</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 10</span>
              </div>
              
              {/* Duplicate set for seamless scrolling */}
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 1</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 2</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 3</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 4</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 5</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 6</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 7</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 8</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 9</span>
              </div>
              <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 bg-white rounded-lg shadow-md flex items-center justify-center mx-2 md:mx-4">
                <span className="text-gray-400 text-sm md:text-base">Partner 10</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 