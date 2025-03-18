
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import DashboardV2 from './pages/DashboardV2';
import Setup from './pages/Setup';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import CashflowImpact from './pages/CashflowImpact';
import Impact from './pages/Impact';
import Reports from './pages/Reports';
import Communication from './pages/Communication';
import Alerts from './pages/Alerts';
import AskAI from './pages/AskAI';
import PnlRecord from './pages/PnlRecord';
import Integrations from './pages/Integrations';
import Billing from './pages/Billing';
import Settings from './pages/Settings';
import WhatIsTrackScore from './pages/WhatIsTrackScore';
import NotFound from './pages/NotFound';
import SecondBrain from './pages/SecondBrain';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard-v2" element={<DashboardV2 />} />
          <Route path="setup" element={<Setup />} />
          <Route path="orders" element={<Orders />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="second-brain" element={<SecondBrain />} />
          <Route path="cashflow" element={<CashflowImpact />} />
          <Route path="impact" element={<Impact />} />
          <Route path="reports" element={<Reports />} />
          <Route path="communication" element={<Communication />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="ask-ai" element={<AskAI />} />
          <Route path="pnl-record" element={<PnlRecord />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="billing" element={<Billing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="what-is-trackscore" element={<WhatIsTrackScore />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
