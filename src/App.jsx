import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CompanyProvider, useCompany } from './context/CompanyContext';
import { OnekoProvider, useOneko } from './context/OnekoContext';
import ComputersPage from './pages/ComputersPage';
import CampaignsPage from './pages/CampaignsPage';
import PhishPage from './pages/PhishPage';
import ComputePage from './pages/ComputePage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import React, { useEffect, useState } from 'react';

// Utility function to get a muted version of a color
function getMutedColor(color) {
  if (!color) return 'rgba(255, 255, 255, 0.8)';
  
  // For light colors, darken them slightly
  if (color === '#FFFFFF' || color === '#FAF3DD') {
    return 'rgba(0, 0, 0, 0.05)';
  }
  
  // For dark colors, lighten them slightly
  return 'rgba(255, 255, 255, 0.1)';
}

// TitleManager component for scrolling title text
function TitleManager() {
  const location = useLocation();

  React.useEffect(() => {
    let originalTitle = "Cat Companies";
    let interval;
    let scrollPosition = 0;
    const messages = [
      "😺 Hey! Over here! *waves paw* 👋",
      "😼 Pssst... your cat needs you! 🐈‍⬛ ",
      "😿 Your code is getting cold... 🥶"
    ];
    let currentMessageIndex = 0;
    
    // Update title based on current route
    if (location.pathname === "/") {
      document.title = "Cat Companies";
    } else if (location.pathname === "/computers") {
      document.title = "Cat Computers";
    } else if (location.pathname === "/campaigns") {
      document.title = "Cat Campaigns";
    } else if (location.pathname === "/phish") {
      document.title = "Cat Phish";
    } else if (location.pathname === "/compute") {
      document.title = "Cat Compute";
    } else if (location.pathname === "/contact") {
      document.title = "Contact Us - Cat Companies";
    }

    // Store the current title
    originalTitle = document.title;

    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear any existing interval first
        if (interval) {
          clearInterval(interval);
        }
        
        // Start the scrolling animation
        interval = setInterval(() => {
          // Create scrolling effect by rotating the text
          const currentMessage = messages[currentMessageIndex];
          const rotatedText = currentMessage.slice(scrollPosition) + currentMessage.slice(0, scrollPosition);
          document.title = rotatedText;
          
          // Move to the next character position
          scrollPosition = (scrollPosition + 1) % currentMessage.length;
          
          // Switch to next message when current one completes
          if (scrollPosition === 0) {
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
          }
        }, 90); // 40% faster (reduced from 150ms to 90ms)
      } else {
        // Clear the interval when tab becomes visible again
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        // Restore the original title
        document.title = originalTitle;
      }
    };

    // Add the event listener
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [location.pathname]);

  return null;
}

function NavLink({ to, children, company, dropdownItems, description }) {
  const { setCompany, companyColors, activeCompany } = useCompany();
  const colors = company ? companyColors[company] : null;
  const location = useLocation();
  const isActive = location.pathname === to;
  const dropdownRef = React.useRef(null);
  
  // Get the current active company colors
  const activeColors = activeCompany ? companyColors[activeCompany] : null;
  
  // Determine if the header is using a dark background
  const isDarkHeader = activeColors && 
    (activeColors.secondary === '#000000' || 
     activeColors.secondary === '#1F2937' || 
     activeColors.secondary === '#111827' ||
     activeColors.secondary === '#1a1a1a');
  
  return (
    <div className="group relative">
      <Link 
        to={to}
        className="py-2 px-3 text-sm transition-colors duration-200"
        style={{ 
          color: isDarkHeader ? '#FFFFFF' : '#333333',
          fontWeight: isActive ? '600' : '400'
        }}
        onMouseEnter={() => setCompany(company)}
        onMouseLeave={() => setCompany(null)}
      >
        {children}
      </Link>
      {dropdownItems && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 flex w-[520px] backdrop-blur-md shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          style={{ 
            maxWidth: '90vw',
            backgroundColor: colors ? `${colors.background.replace('0.1', '0.7')}` : 'rgba(255, 255, 255, 0.7)',
            transition: 'background-color 500ms ease-in-out'
          }}
        >
          <div className="py-2 w-2/5 border-r border-gray-200/20 overflow-y-auto max-h-[80vh]">
            {dropdownItems.map((item, index) => (
              <a key={index} href="#" className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-50/10 transition-colors duration-200">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-900 mt-0.5">{item.description}</div>
              </a>
            ))}
          </div>
          <div className="py-2 px-4 w-[30%]">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">About {children}</h3>
            <p className="text-xs text-gray-900 leading-relaxed">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AppContent() {
  const { companyColors, activeCompany } = useCompany();
  const { isOnekoEnabled, toggleOneko } = useOneko();
  const colors = activeCompany ? companyColors[activeCompany] : null;
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Determine if the header is using a dark background
  const isDarkHeader = colors && 
    (colors.secondary === '#000000' || 
     colors.secondary === '#1F2937' || 
     colors.secondary === '#111827' ||
     colors.secondary === '#1a1a1a');

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav 
        className="fixed w-full z-50 transition-all duration-500 ease-in-out"
        style={{ 
          backgroundColor: colors ? `${colors.background.replace('0.1', '0.3')}` : 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-12 px-4 pr-8">
            <Link 
              to="/" 
              className="flex items-center"
              onMouseEnter={() => setCompany('catcompanies')}
              onMouseLeave={() => setCompany(null)}
            >
              <img 
                src="/logo.svg" 
                alt="Cat Companies Logo" 
                className="h-8 w-auto transition-colors duration-500" 
                style={{ 
                  filter: colors ? `brightness(0) saturate(100%) ${colors.primary}` : 'none'
                }}
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink 
                to="/computers" 
                company="computers"
                description="Managed IT services, hardware solutions, and technical support to keep your business running smoothly."
                dropdownItems={[
                  { title: 'Hardware Solutions', description: 'Custom-built computers and servers' },
                  { title: 'IT Support', description: '24/7 technical assistance and troubleshooting' },
                  { title: 'Network Setup', description: 'Secure and efficient network infrastructure' }
                ]}
              >
                Computers
              </NavLink>
              
              <NavLink 
                to="/campaigns" 
                company="campaigns"
                description="Strategic marketing campaigns that drive engagement, increase brand awareness, and generate leads."
                dropdownItems={[
                  { title: 'Digital Marketing', description: 'SEO, PPC, and social media campaigns' },
                  { title: 'Content Creation', description: 'Engaging content for all platforms' },
                  { title: 'Analytics', description: 'Data-driven insights and reporting' }
                ]}
              >
                Campaigns
              </NavLink>
              
              <NavLink 
                to="/phish" 
                company="phish"
                description="Comprehensive cybersecurity solutions to protect your business."
                dropdownItems={[
                  { title: 'Security Audits', description: 'Identify and fix vulnerabilities' },
                  { title: 'Employee Training', description: 'Security awareness programs' },
                  { title: 'Incident Response', description: '24/7 security monitoring' }
                ]}
              >
                Phish
              </NavLink>
              
              <NavLink 
                to="/compute" 
                company="compute"
                description="Cloud computing solutions for modern businesses."
                dropdownItems={[
                  { title: 'Cloud Migration', description: 'Seamless transition to the cloud' },
                  { title: 'DevOps', description: 'Automated deployment and scaling' },
                  { title: 'Data Analytics', description: 'Big data processing and analytics' }
                ]}
              >
                Compute
              </NavLink>
            </div>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white/80 backdrop-blur-md shadow-lg rounded-b-lg`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/computers"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Computers
              </Link>
              <Link 
                to="/campaigns"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Campaigns
              </Link>
              <Link 
                to="/phish"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Phish
              </Link>
              <Link 
                to="/compute"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compute
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content with padding for fixed navbar */}
      <div className="pt-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/computers" element={<ComputersPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/phish" element={<PhishPage />} />
          <Route path="/compute" element={<ComputePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Expanded Footer */}
      <footer className="bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between">
            {/* Left Side */}
            <div className="flex gap-12">
              {/* Company Info */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900">Cat Companies</h3>
                <p className="text-gray-600 text-xs mb-2">
                  Innovative solutions for modern businesses.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-gray-900">Services</h3>
                <ul className="space-y-1">
                  <li><Link to="/computers" className="text-gray-600 hover:text-gray-900 text-xs">IT Solutions</Link></li>
                  <li><Link to="/campaigns" className="text-gray-600 hover:text-gray-900 text-xs">Marketing</Link></li>
                  <li><Link to="/phish" className="text-gray-600 hover:text-gray-900 text-xs">Cybersecurity</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact - Right aligned */}
            <div>
              <h3 className="text-sm font-semibold mb-2 text-gray-900">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div className="flex flex-wrap gap-1">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">London</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">York</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">Leeds</span>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">Somerset</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-center text-xs">
                  <svg className="h-4 w-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  contact@catcompanies.co.uk
                </li>
                <li className="flex items-center text-xs">
                  <svg className="h-4 w-4 mr-1.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +44 (0) 123 456 7890
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <div>
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/15926165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <div className="text-[10px]">© 2025 Cat Companies LTD</div>
                  <div className="text-[10px]">Company No. 15926165</div>
                </a>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <a href="#" className="text-[10px] text-gray-600 hover:text-gray-900 transition-colors">Privacy</a>
                  <a href="#" className="text-[10px] text-gray-600 hover:text-gray-900 transition-colors">Terms</a>
                  <a href="#" className="text-[10px] text-gray-600 hover:text-gray-900 transition-colors">Sitemap</a>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-gray-600">Cursor Pet</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOnekoEnabled}
                      onChange={toggleOneko}
                      className="sr-only peer"
                    />
                    <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all" style={{ backgroundColor: isOnekoEnabled ? (colors ? colors.primary : '#333333') : '#e5e7eb' }}></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <CompanyProvider>
        <OnekoProvider>
          <AppContent />
        </OnekoProvider>
      </CompanyProvider>
    </Router>
  );
}

export default App 