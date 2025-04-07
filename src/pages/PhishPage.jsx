import React from 'react';
import { useCompany } from '../context/CompanyContext';

function PhishPage() {
  const { companyColors } = useCompany();
  const colors = companyColors.phish;
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#333333' }}>
          Cat Phish
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Cybersecurity Training
            </h2>
            <p className="text-gray-700 mb-4">
              Cat Phish provides comprehensive cybersecurity training for businesses of all sizes. 
              Our team of experts helps you protect your organization from phishing attacks and other security threats.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Phishing simulation campaigns</li>
              <li>Security awareness training</li>
              <li>Incident response planning</li>
              <li>Compliance training</li>
              <li>Security assessment tools</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
              Security Services
            </h2>
            <p className="text-gray-700 mb-4">
              Our security services are designed to help your business identify vulnerabilities and strengthen your security posture.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Vulnerability assessments</li>
              <li>Penetration testing</li>
              <li>Security policy development</li>
              <li>Threat intelligence</li>
              <li>Security consulting</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
            Our Approach
          </h2>
          <p className="text-gray-700 mb-4">
            At Cat Phish, we believe in a proactive approach to cybersecurity. We help you identify risks, 
            train your employees, and implement security measures to protect your business from threats.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Assessment</h3>
              <p className="text-sm text-gray-600">Evaluate your current security posture and identify vulnerabilities.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Training</h3>
              <p className="text-sm text-gray-600">Educate your employees on security best practices and threat awareness.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2" style={{ color: colors.primary }}>Protection</h3>
              <p className="text-sm text-gray-600">Implement security measures to protect your business from threats.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhishPage; 