
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import SecondBrain from './SecondBrain';

const AppLayout = () => {
  const location = useLocation();
  
  // Render SecondBrain component when the path is /second-brain
  const renderContent = () => {
    if (location.pathname === '/second-brain') {
      return <SecondBrain />;
    }
    
    // For all other routes, use the regular Outlet from react-router
    return <Outlet />;
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default AppLayout;
