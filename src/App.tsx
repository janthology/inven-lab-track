import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Inventory from "./pages/Inventory";
import Laboratories from "./pages/Laboratories";
import Movements from "./pages/Movements";
import Stocks from "./pages/Stocks";
import Suppliers from "./pages/Suppliers";
import Batches from "./pages/Batches";
import Categories from "./pages/Categories";
import Units from "./pages/Units";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/inventory" element={
            <Layout>
              <Inventory />
            </Layout>
          } />
          <Route path="/laboratories" element={
            <Layout>
              <Laboratories />
            </Layout>
          } />
          <Route path="/movements" element={
            <Layout>
              <Movements />
            </Layout>
          } />
          <Route path="/stocks" element={
            <Layout>
              <Stocks />
            </Layout>
          } />
          <Route path="/suppliers" element={
            <Layout>
              <Suppliers />
            </Layout>
          } />
          <Route path="/batches" element={
            <Layout>
              <Batches />
            </Layout>
          } />
          <Route path="/categories" element={
            <Layout>
              <Categories />
            </Layout>
          } />
          <Route path="/units" element={
            <Layout>
              <Units />
            </Layout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
