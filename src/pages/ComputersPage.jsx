import React from 'react';
import { useCompany } from '../context/CompanyContext';

function ComputersPage() {
  const { companyColors } = useCompany();
  const colors = companyColors.computers;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#333333' }}>
          Cat Computers
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Managed Service Provider
            </h2>
            <p className="text-gray-700 mb-4">
              Cat Computers provides comprehensive IT management services for businesses of all sizes. 
              Our team of experts handles everything from hardware procurement to maintenance and support.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>24/7 remote monitoring and support</li>
              <li>Hardware and software procurement</li>
              <li>Network security and management</li>
              <li>Data backup and recovery solutions</li>
              <li>IT consulting and strategy</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Our Approach
            </h2>
            <p className="text-gray-700 mb-4">
              We believe in proactive IT management to prevent issues before they impact your business. 
              Our approach is tailored to each client's specific needs and industry requirements.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Customized service plans</li>
              <li>Regular system health checks</li>
              <li>Predictive maintenance</li>
              <li>Employee training and support</li>
              <li>Scalable solutions as your business grows</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
            Client Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic mb-2">"Cat Computers transformed our IT infrastructure. Downtime has been reduced by 95%."</p>
              <p className="text-sm font-semibold" style={{ color: colors.secondary }}>- Sarah Johnson, CEO of TechStart</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic mb-2">"Their proactive approach has saved us countless hours and prevented major issues."</p>
              <p className="text-sm font-semibold" style={{ color: colors.secondary }}>- Michael Chen, Operations Director</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <p className="text-gray-700 italic mb-2">"The best decision we made was partnering with Cat Computers for our IT needs."</p>
              <p className="text-sm font-semibold" style={{ color: colors.secondary }}>- Lisa Rodriguez, Small Business Owner</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            className="px-6 py-3 rounded-full font-semibold transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary,
              color: colors.highlight
            }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComputersPage; 