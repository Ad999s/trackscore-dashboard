
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart,
  ShoppingCart,
  PieChart,
  FileText,
  Settings,
  Package,
  MessageSquare,
  BellRing,
  CircleDollarSign,
  Sparkles,
  Link
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from '@/components/Logo';

// Navigation items with icons for sidebar
const navItems = [
  { title: 'Dashboard', path: '/', icon: BarChart },
  { title: 'Orders', path: '/orders', icon: ShoppingCart },
  { title: 'PnL Record', path: '/pnl-record', icon: PieChart },
  { title: 'Reports', path: '/reports', icon: FileText },
  { title: 'Integrations', path: '/integrations', icon: Link },
  { title: 'Ask AI', path: '/ask-ai', icon: Sparkles },
  { title: 'Communication', path: '/communication', icon: MessageSquare },
  { title: 'Alerts', path: '/alerts', icon: BellRing },
  { title: 'Cashflow Impact', path: '/cashflow', icon: CircleDollarSign },
  { title: 'Settings', path: '/settings', icon: Settings },
];

const SidebarNav = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 py-4">
            <Logo className="h-8 w-auto" />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "nav-item nav-item-active" : "nav-item"
                      }
                      end={item.path === '/'}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarNav;
