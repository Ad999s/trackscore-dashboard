
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/Layout";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import PnlRecord from "./pages/PnlRecord";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import AskAI from "./pages/AskAI";
import Playground from "./pages/Playground";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import CashflowImpact from "./pages/CashflowImpact";
import CashflowGraph from "./pages/CashflowGraph";
import Communication from "./pages/Communication";
import Alerts from "./pages/Alerts";
import DashboardV2 from "./pages/DashboardV2";
import Impact from "./pages/Impact";
import Setup from "./pages/Setup";
import WhatIsTrackScore from "./pages/WhatIsTrackScore";
import Inventory from "./pages/Inventory";
import HowAIWorks from "./pages/HowAIWorks";
import HelpAndSetup from "./pages/HelpAndSetup";
import Overview from "./pages/Overview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="setup" element={<Setup />} />
            <Route path="dashboard" element={<Index />} />
            <Route path="overview" element={<Overview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cashflow-graph" element={<CashflowGraph />} />
            <Route path="pnl-record" element={<PnlRecord />} />
            <Route path="reports" element={<Reports />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="ask-ai" element={<AskAI />} />
            <Route path="playground" element={<Playground />} />
            <Route path="communication" element={<Communication />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help-and-setup" element={<HelpAndSetup />} />
            <Route path="cashflow" element={<CashflowImpact />} />
            <Route path="dashboard-v2" element={<DashboardV2 />} />
            <Route path="impact" element={<Impact />} />
            <Route path="what-is-trackscore" element={<WhatIsTrackScore />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="how-ai-works" element={<HowAIWorks />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
