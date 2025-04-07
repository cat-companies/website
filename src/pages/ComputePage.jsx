import React from 'react';
import { useCompany } from '../context/CompanyContext';

function ComputePage() {
  const { companyColors } = useCompany();
  const colors = companyColors.compute;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#333333' }}>
          Cat Compute
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Cloud Computing
            </h2>
            <p className="text-gray-700 mb-4">
              Cat Compute provides comprehensive cloud computing solutions for businesses of all sizes. 
              Our team of experts helps you leverage the power of the cloud to drive innovation and growth.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Cloud infrastructure setup</li>
              <li>Serverless computing</li>
              <li>Container orchestration</li>
              <li>Cloud migration services</li>
              <li>Cloud cost optimization</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Computing Resources
            </h2>
            <p className="text-gray-700 mb-4">
              Our computing resources are designed to help your business scale efficiently and cost-effectively.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>High-performance computing</li>
              <li>GPU acceleration</li>
              <li>Edge computing solutions</li>
              <li>Data processing pipelines</li>
              <li>Machine learning infrastructure</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
            Our Approach
          </h2>
          <p className="text-gray-700 mb-4">
            At Cat Compute, we believe in a flexible and scalable approach to computing. We help you identify the right 
            computing resources for your needs and implement solutions that grow with your business.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Assessment</h3>
              <p className="text-sm text-gray-600">Evaluate your computing needs and identify the right solutions.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Implementation</h3>
              <p className="text-sm text-gray-600">Deploy computing resources with precision and efficiency.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Optimization</h3>
              <p className="text-sm text-gray-600">Continuously optimize your computing resources for maximum performance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComputePage; 