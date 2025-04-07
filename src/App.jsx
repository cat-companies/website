import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CompanyProvider, useCompany } from './context/CompanyContext';
import { OnekoProvider, useOneko } from './context/OnekoContext';
import ComputersPage from './pages/ComputersPage';
import CampaignsPage from './pages/CampaignsPage';
import PhishPage from './pages/PhishPage';
import ComputePage from './pages/ComputePage';
import ContactPage from './pages/ContactPage';
import logo from './assets/logo.svg';
import React from 'react';

function NavLink({ to, children, company, dropdownItems, description }) {
  const { setCompany, companyColors, activeCompany } = useCompany();
  const colors = company ? companyColors[company] : null;
  const location = useLocation();
  const isActive = location.pathname === to;
  const dropdownRef = React.useRef(null);
  const [shouldStack, setShouldStack] = React.useState(false);
  
  // Get the current active company colors
  const activeColors = activeCompany ? companyColors[activeCompany] : null;
  
  // Determine if the header is using a dark background
  const isDarkHeader = activeColors && 
    (activeColors.secondary === '#000000' || 
     activeColors.secondary === '#1F2937' || 
     activeColors.secondary === '#111827' ||
     activeColors.secondary === '#1a1a1a');
  
  // Determine if this is one of the rightmost nav items (Phish or Compute)
  const isRightmostNav = company === 'phish' || company === 'compute';
  
  React.useEffect(() => {
    const checkSpace = () => {
      if (dropdownRef.current) {
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const dropdownRightEdge = dropdownRect.right;
        
        setShouldStack(dropdownRightEdge > viewportWidth);
      }
    };

    // Check on mount and when hovering
    checkSpace();
    window.addEventListener('resize', checkSpace);
    return () => window.removeEventListener('resize', checkSpace);
  }, []);
  
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
          className={`absolute top-full bg-white/80 backdrop-blur-md shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 ${
            shouldStack ? 'right-0 flex-col w-[400px]' : 'left-0 flex w-[800px]'
          }`}
          style={{ 
            maxWidth: '90vw'
          }}
        >
          {shouldStack ? (
            <>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">About {children}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
              </div>
              <div className="py-4 max-h-[60vh] overflow-y-auto">
                {dropdownItems.map((item, index) => (
                  <a key={index} href="#" className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </a>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="py-2 w-1/2 border-r border-gray-200 overflow-y-auto max-h-[80vh]">
                {dropdownItems.map((item, index) => (
                  <a key={index} href="#" className="block px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                  </a>
                ))}
              </div>
              <div className="py-3 px-6 w-1/2">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">About {children}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Home page component
function HomePage() {
  const { companyColors } = useCompany();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Welcome to Cat Companies</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            A family of innovative companies providing comprehensive solutions for your business needs.
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/computers" 
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all"
            >
              Explore Our Services
            </Link>
            <a 
              href="#companies" 
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
      
      {/* Companies Section */}
      <section id="companies" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Our Companies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Computers */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: '#333333' }}
            >
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white">Cat Computers</h3>
                <p className="text-white/90 mb-6 flex-grow">
                  Managed IT services, hardware solutions, and technical support to keep your business running smoothly.
                </p>
                <Link 
                  to="/computers" 
                  className="mt-auto inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Campaigns */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: '#333333' }}
            >
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white">Cat Campaigns</h3>
                <p className="text-white/90 mb-6 flex-grow">
                  Strategic marketing campaigns that drive engagement, increase brand awareness, and generate leads.
                </p>
                <Link 
                  to="/campaigns" 
                  className="mt-auto inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Phish */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: '#333333' }}
            >
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white">Cat Phish</h3>
                <p className="text-white/90 mb-6 flex-grow">
                  Comprehensive cybersecurity solutions to protect your business from threats and ensure data security.
                </p>
                <Link 
                  to="/phish" 
                  className="mt-auto inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            {/* Compute */}
            <div 
              className="rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: '#333333' }}
            >
              <div className="p-6 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white">Cat Compute</h3>
                <p className="text-white/90 mb-6 flex-grow">
                  Cloud computing solutions that provide scalability, flexibility, and cost-efficiency for your business.
                </p>
                <Link 
                  to="/compute" 
                  className="mt-auto inline-block px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Partners</h2>
          
          <div className="partners-container">
            <div className="partners-scroll">
              {/* First set of logos */}
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 1</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 2</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 3</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 4</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 5</span>
              </div>
              
              {/* Duplicate set for seamless scrolling */}
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 1</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 2</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 3</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 4</span>
              </div>
              <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center mx-4">
                <span className="text-gray-400">Partner 5</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900">Why Choose Cat Companies?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Comprehensive Solutions</h3>
              <p className="text-gray-600">
                From IT infrastructure to marketing and security, we provide end-to-end solutions for all your business needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Expert Team</h3>
              <p className="text-gray-600">
                Our team of experienced professionals is dedicated to delivering high-quality services and solutions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Proven Results</h3>
              <p className="text-gray-600">
                We have a track record of delivering successful outcomes for businesses across various industries.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Contact us today to learn how Cat Companies can help you achieve your business goals.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#" 
              className="px-6 py-3 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-all"
            >
              Contact Us
            </a>
            <a 
              href="#" 
              className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-all"
            >
              Schedule a Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function AppContent() {
  const { activeCompany, companyColors, isTransitioning } = useCompany();
  const { isOnekoEnabled, toggleOneko } = useOneko();
  const location = useLocation();
  
  // Determine the current company based on the route
  const getCurrentCompany = () => {
    if (location.pathname.includes('/computers')) return 'computers';
    if (location.pathname.includes('/campaigns')) return 'campaigns';
    if (location.pathname.includes('/phish')) return 'phish';
    if (location.pathname.includes('/compute')) return 'compute';
    if (location.pathname.includes('/contact')) return 'contact';
    return null;
  };
  
  const currentCompany = getCurrentCompany();
  const colors = currentCompany ? companyColors[currentCompany] : null;
  
  // Function to get a muted version of a color
  const getMutedColor = (color) => {
    if (!color) return 'rgba(255, 255, 255, 0.8)';
    
    // For light colors, darken them slightly
    if (color === '#FFFFFF' || color === '#FAF3DD') {
      return 'rgba(0, 0, 0, 0.05)';
    }
    
    // For dark colors, lighten them slightly
    return 'rgba(255, 255, 255, 0.1)';
  };
  
  // Define dropdown items for each company
  const computersItems = [
    { title: 'Desktop Solutions', description: 'High-performance workstations for professionals' },
    { title: 'Laptop Series', description: 'Portable power for on-the-go productivity' },
    { title: 'Accessories', description: 'Essential add-ons to enhance your experience' }
  ];
  
  const campaignsItems = [
    { title: 'Active Campaigns', description: 'Currently running marketing initiatives' },
    { title: 'Campaign Archive', description: 'Past successful marketing strategies' },
    { title: 'Analytics', description: 'Data-driven insights and reporting' }
  ];
  
  const phishItems = [
    { title: 'Security Reports', description: 'Comprehensive security assessments' },
    { title: 'Training Programs', description: 'Employee security awareness training' },
    { title: 'Statistics', description: 'Security metrics and analytics' }
  ];
  
  const computeItems = [
    { title: 'Cloud Services', description: 'Scalable cloud infrastructure' },
    { title: 'Server Solutions', description: 'Enterprise-grade server infrastructure' },
    { title: 'Resources', description: 'Computing resources and tools' }
  ];
  
  // Company descriptions
  const computersDescription = "MSP services: IT infrastructure management, hardware procurement, maintenance, remote monitoring, security updates, technical support. Minimize downtime, maximize productivity.";
  
  const campaignsDescription = "Marketing agency: targeted campaigns, creative strategy, data-driven insights, social media, content creation, email marketing. Increase brand awareness, generate leads.";
  
  const phishDescription = "Cybersecurity: threat protection, vulnerability assessments, employee training, data breach prevention, compliance management. Secure sensitive information, maintain standards.";
  
  const computeDescription = "Cloud computing: scalable resources, infrastructure migration, optimization, remote collaboration. Reduce costs, improve flexibility, enable anywhere productivity.";
  
  return (
    <div className="min-h-screen flex flex-col">
      <nav 
        className="fixed w-full z-50 transition-colors duration-500 ease-in-out"
        style={{ 
          backgroundColor: colors ? getMutedColor(colors.primary) : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center h-12 px-4 pr-8">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Cat Computers Logo" className="h-8 w-auto" />
            </Link>
            <div className="flex space-x-8">
              <NavLink 
                to="/computers" 
                company="computers" 
                dropdownItems={computersItems}
                description={computersDescription}
              >
                Computers
              </NavLink>
              <NavLink 
                to="/campaigns" 
                company="campaigns" 
                dropdownItems={campaignsItems}
                description={campaignsDescription}
              >
                Campaigns
              </NavLink>
              <NavLink 
                to="/phish" 
                company="phish" 
                dropdownItems={phishItems}
                description={phishDescription}
              >
                Phish
              </NavLink>
              <NavLink 
                to="/compute" 
                company="compute" 
                dropdownItems={computeItems}
                description={computeDescription}
              >
                Compute
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Background color transition for hover effect */}
      <div 
        className="fixed inset-0 transition-colors duration-500 ease-in-out z-0"
        style={{ 
          backgroundColor: activeCompany ? companyColors[activeCompany].primary : 'transparent',
          opacity: activeCompany ? 0.3 : 0
        }}
      />
      
      {/* Background color for current page */}
      <div 
        className="fixed inset-0 transition-colors duration-500 ease-in-out z-0"
        style={{ 
          backgroundColor: colors ? colors.primary : 'transparent',
          opacity: colors ? 1 : 0
        }}
      />
      
      {/* Main content area with padding to account for fixed navbar */}
      <main className="flex-grow pt-12 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/computers" element={<ComputersPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/phish" element={<PhishPage />} />
          <Route path="/compute" element={<ComputePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-5 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left side - Services and Company */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Services</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Campaigns</a></li>
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Phish Training</a></li>
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>About Us</a></li>
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>News</a></li>
                  <li><a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Partners</a></li>
                </ul>
              </div>
            </div>
            
            {/* Right side - Contact Us and Newsletter */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5" style={{ color: colors ? colors.primary : '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a href="tel:+15551234567" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>+1 (555) 123-4567</a>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5" style={{ color: colors ? colors.primary : '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:info@catcompanies.com" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>info@catcompanies.com</a>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 mt-0.5" style={{ color: colors ? colors.primary : '#333333' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="flex flex-wrap gap-2">
                      <a href="https://www.google.com/maps/search/?api=1&query=New+York+City" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-full transition-colors" style={{ color: '#333333', backgroundColor: colors ? colors.primary : '#f3f4f6', borderColor: colors ? colors.primary : '#e5e7eb' }}>New York</a>
                      <a href="https://www.google.com/maps/search/?api=1&query=London+UK" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-full transition-colors" style={{ color: '#333333', backgroundColor: colors ? colors.primary : '#f3f4f6', borderColor: colors ? colors.primary : '#e5e7eb' }}>London</a>
                      <a href="https://www.google.com/maps/search/?api=1&query=Leeds+UK" target="_blank" rel="noopener noreferrer" className="text-xs px-2 py-1 rounded-full transition-colors" style={{ color: '#333333', backgroundColor: colors ? colors.primary : '#f3f4f6', borderColor: colors ? colors.primary : '#e5e7eb' }}>Leeds</a>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-4" style={{ color: '#333333' }}>Newsletter</h3>
                <p className="text-xs mb-3" style={{ color: '#333333' }}>Stay updated with our latest news and offers</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="text-xs px-3 py-1 rounded-l-md border border-gray-300 focus:outline-none focus:ring-1"
                    style={{ 
                      color: '#333333',
                      borderColor: colors ? colors.primary : '#e5e7eb',
                      '--tw-ring-color': colors ? colors.primary : '#6b7280'
                    }}
                  />
                  <button 
                    className="text-xs px-3 py-1 rounded-r-md text-white transition-colors"
                    style={{ 
                      backgroundColor: colors ? colors.primary : '#333333',
                      '--tw-ring-color': colors ? colors.primary : '#6b7280'
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="mt-5 pt-5 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <a 
                  href="https://find-and-update.company-information.service.gov.uk/company/15926165"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 transition-colors"
                >
                  <div className="text-xs" style={{ color: '#333333' }}>© 2025 Cat Companies LTD</div>
                  <div className="text-xs" style={{ color: '#333333' }}>Company No. 15926165</div>
                </a>
              </div>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-4">
                  <a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Privacy</a>
                  <a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Terms</a>
                  <a href="#" className="text-xs hover:text-gray-600 transition-colors" style={{ color: '#333333' }}>Sitemap</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: '#333333' }}>Cursor Pet</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOnekoEnabled}
                      onChange={toggleOneko}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all" style={{ backgroundColor: isOnekoEnabled ? (colors ? colors.primary : '#333333') : '#e5e7eb' }}></div>
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