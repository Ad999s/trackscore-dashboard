
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./pages/Layout";
import Index from "./pages/Index";
import Orders from "./pages/Orders";
import PnlRecord from "./pages/PnlRecord";
import CashflowCompanion from "./pages/CashflowCompanion";
import NotFound from "./pages/NotFound";
import Reports from "./pages/Reports";
import Integrations from "./pages/Integrations";
import AskAI from "./pages/AskAI";

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
            <Route path="orders" element={<Orders />} />
            <Route path="pnl-record" element={<PnlRecord />} />
            <Route path="cashflow" element={<CashflowCompanion />} />
            <Route path="reports" element={<Reports />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="ask-ai" element={<AskAI />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
