
import React, { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import SidebarNav from './SidebarNav';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <SidebarNav />
        <SidebarInset className="bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
