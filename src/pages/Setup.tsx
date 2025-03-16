
import React from 'react';
import HowItWorksSlider from '@/components/Setup/HowItWorksSlider';
import BusinessComparisonTable from '@/components/Setup/BusinessComparisonTable';
import ComparisonFeatures from '@/components/Setup/ComparisonFeatures';

const Setup = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">TrackScore Setup</h2>
      
      <HowItWorksSlider />
      
      <ComparisonFeatures />
      
      <BusinessComparisonTable />
    </div>
  );
};

export default Setup;
