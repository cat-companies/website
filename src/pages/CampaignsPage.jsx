import React from 'react';
import { useCompany } from '../context/CompanyContext';

function CampaignsPage() {
  const { companyColors } = useCompany();
  const colors = companyColors.campaigns;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#333333' }}>
          Cat Campaigns
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Strategic Marketing
            </h2>
            <p className="text-gray-700 mb-4">
              Cat Campaigns provides comprehensive marketing solutions for businesses of all sizes. 
              Our team of experts handles everything from campaign strategy to execution and analytics.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Brand strategy and positioning</li>
              <li>Digital marketing campaigns</li>
              <li>Content creation and distribution</li>
              <li>Social media management</li>
              <li>Marketing analytics and reporting</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Campaign Services
            </h2>
            <p className="text-gray-700 mb-4">
              Our campaign services are designed to help your business reach its target audience and achieve measurable results.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Email marketing campaigns</li>
              <li>Social media advertising</li>
              <li>Search engine marketing</li>
              <li>Content marketing</li>
              <li>Influencer partnerships</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
            Our Approach
          </h2>
          <p className="text-gray-700 mb-4">
            At Cat Campaigns, we believe in a data-driven approach to marketing. We analyze your target audience, 
            develop a tailored strategy, and continuously optimize your campaigns for maximum ROI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Strategy</h3>
              <p className="text-sm text-gray-600">Develop a comprehensive marketing strategy aligned with your business goals.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Execution</h3>
              <p className="text-sm text-gray-600">Implement campaigns across multiple channels with precision and creativity.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Analytics</h3>
              <p className="text-sm text-gray-600">Measure performance and optimize campaigns for continuous improvement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignsPage; 