
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  LayoutDashboard,
  Package,
  BadgeDollarSign,
  MessageSquare,
  FileBarChart2,
  Receipt,
  Settings,
  ChevronDown,
  ChevronRight,
  Bell,
  UserCircle,
  Link2,
  MessageCircle,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Workflow
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '../Logo';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasSubmenu?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, hasSubmenu, onClick }) => {
  return (
    <Link
      to={to}
      className={cn(
        "nav-item group",
        active && "nav-item-active"
      )}
      onClick={onClick}
    >
      <span className="flex-shrink-0 w-5 h-5">{icon}</span>
      <span className="flex-grow">{label}</span>
      {hasSubmenu && (
        <ChevronRight 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            active && "rotate-90"
          )} 
        />
      )}
    </Link>
  );
};

interface SubmenuProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Submenu: React.FC<SubmenuProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="mb-1">
      <button 
        className="w-full flex items-center px-3 py-2 text-sm text-trackscore-muted hover:text-trackscore-text transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex-grow font-medium">{title}</span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      <div className={cn(
        "pl-2 space-y-1 overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0"
      )}>
        {children}
      </div>
    </div>
  );
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [alertCount, setAlertCount] = useState(3);
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard-v2':
        return 'Dashboard 2.0';
      case '/setup':
        return 'Setup Guide';
      case '/orders':
        return 'Order List';
      case '/reports':
        return 'Business Reports';
      case '/communication':
        return 'Communication';
      case '/alerts':
        return 'Alert Center';
      case '/cashflow':
        return 'Cashflow Impact';
      case '/impact':
        return 'Business Impact';
      case '/ask-ai':
        return 'Ask AI';
      case '/pnl-record':
        return 'PnL Tracker';
      case '/integrations':
        return 'Integrations';
      case '/billing':
        return 'Billing';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };
  
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside className="hidden md:flex flex-col w-64 p-4 border-r border-slate-200 bg-trackscore-lightblue">
        <div className="flex items-center gap-2 mb-8 pl-3">
          <Logo />
          <h1 className="text-xl font-semibold text-trackscore-text">TrackScore</h1>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-trackscore-blue/20 transition-all duration-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <nav className="flex-grow space-y-1.5">
          <NavItem 
            to="/setup" 
            icon={<Workflow className="text-inherit" />} 
            label="Setup" 
            active={location.pathname === "/setup"} 
          />
          <NavItem 
            to="/dashboard" 
            icon={<LayoutDashboard className="text-inherit" />} 
            label="Dashboard" 
            active={location.pathname === "/" || location.pathname === "/dashboard"} 
          />
          <NavItem 
            to="/dashboard-v2" 
            icon={<BarChart3 className="text-inherit" />} 
            label="Dashboard 2.0" 
            active={location.pathname === "/dashboard-v2"} 
          />
          <NavItem 
            to="/orders" 
            icon={<Package className="text-inherit" />} 
            label="Order List" 
            active={location.pathname === "/orders"} 
          />
          <NavItem 
            to="/cashflow" 
            icon={<Receipt className="text-inherit" />} 
            label="Cashflow Impact" 
            active={location.pathname === "/cashflow"} 
          />
          <NavItem 
            to="/impact" 
            icon={<TrendingUp className="text-inherit" />} 
            label="Business Impact" 
            active={location.pathname === "/impact"} 
          />
          <NavItem 
            to="/reports" 
            icon={<FileBarChart2 className="text-inherit" />} 
            label="Business Reports" 
            active={location.pathname === "/reports"} 
          />
          <NavItem 
            to="/communication" 
            icon={<MessageCircle className="text-inherit" />} 
            label="Communication" 
            active={location.pathname === "/communication"} 
          />
          <NavItem 
            to="/alerts" 
            icon={<AlertTriangle className="text-inherit" />} 
            label="Alert Center" 
            active={location.pathname === "/alerts"} 
          />
          <NavItem 
            to="/ask-ai" 
            icon={<MessageSquare className="text-inherit" />} 
            label="Ask AI" 
            active={location.pathname === "/ask-ai"} 
          />
          <NavItem 
            to="/pnl-record" 
            icon={<BadgeDollarSign className="text-inherit" />} 
            label="PnL Tracker" 
            active={location.pathname === "/pnl-record"} 
          />
          
          <div className="pt-4 mt-4 border-t border-slate-200">
            <NavItem 
              to="/integrations" 
              icon={<Link2 className="text-inherit" />} 
              label="Integrations" 
              active={location.pathname === "/integrations"} 
            />
            <NavItem 
              to="/billing" 
              icon={<Receipt className="text-inherit" />} 
              label="Billing" 
              active={location.pathname === "/billing"} 
            />
            <NavItem 
              to="/settings" 
              icon={<Settings className="text-inherit" />} 
              label="Settings" 
              active={location.pathname === "/settings"} 
            />
          </div>
        </nav>
      </aside>
      
      <main className="flex-grow overflow-auto bg-[#F5F8FF]">
        <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm border-b border-slate-100">
          <h2 className="text-xl font-semibold text-trackscore-text">{getPageTitle()}</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Link to="/alerts">
                <button className="p-1.5 rounded-full hover:bg-trackscore-gray transition-colors duration-200">
                  <Bell className="w-5 h-5 text-slate-600" />
                  {alertCount > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">{alertCount}</span>
                  )}
                </button>
              </Link>
            </div>
            
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button className="flex items-center gap-2 rounded-full">
                <div className="relative w-8 h-8 rounded-full bg-trackscore-gray/50 flex items-center justify-center border border-slate-200">
                  <UserCircle className="w-6 h-6 text-slate-600" />
                </div>
                <span className="text-sm font-medium">Company Name</span>
              </button>
            </div>
          </div>
        </header>
        
        <div className="p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
