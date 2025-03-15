import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import AccountManager from '@/components/Layout/AccountManager';

const AppLayout = () => {
  return (
    <Layout>
      <div className="mb-6 flex justify-end">
        <AccountManager />
      </div>
      <Outlet />
    </Layout>
  );
};

export default AppLayout;
