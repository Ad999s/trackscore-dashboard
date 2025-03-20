import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Index from '@/pages/Index';
import DashboardV2 from '@/pages/DashboardV2';
import Orders from '@/pages/Orders';
import CashflowGraph from '@/pages/CashflowGraph';
import Reports from '@/pages/Reports';
import Communication from '@/pages/Communication';
import Alerts from '@/pages/Alerts';
import CashflowImpact from '@/pages/CashflowImpact';
import Impact from '@/pages/Impact';
import AskAI from '@/pages/AskAI';
import PnlRecord from '@/pages/PnlRecord';
import Integrations from '@/pages/Integrations';
import Billing from '@/pages/Billing';
import Settings from '@/pages/Settings';
import Inventory from '@/pages/Inventory';
import HowAIWorks from '@/pages/HowAIWorks';
import WhatIsTrackScore from '@/pages/WhatIsTrackScore';
import Setup from '@/pages/Setup';
import HelpSetup from '@/pages/HelpSetup';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/dashboard-v2" element={<DashboardV2 />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cashflow-graph" element={<CashflowGraph />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/communication" element={<Communication />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/cashflow" element={<CashflowImpact />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/pnl-record" element={<PnlRecord />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/how-ai-works" element={<HowAIWorks />} />
          <Route path="/what-is-trackscore" element={<WhatIsTrackScore />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/help-setup" element={<HelpSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
