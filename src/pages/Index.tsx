
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate('/dashboard-v2');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-lg text-gray-500">Redirecting to dashboard...</p>
    </div>
  );
};

export default Index;
