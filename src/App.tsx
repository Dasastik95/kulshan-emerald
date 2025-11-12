import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
// use named import because sonner.tsx does not export default
import { Sonner } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Home from "@/pages/Home";
import Listings from "@/pages/Listings";
import CurrentListings from "@/pages/CurrentListings";
import ClosedTransactions from "@/pages/ClosedTransactions";
const ListingDetails = () => {
  return <div>Listing details page is not available.</div>;
};
import Contact from "@/pages/Contact";
import NDA from "@/pages/NDA";
import Team from "@/pages/Team";
import BusinessBrokerage from "@/pages/BusinessBrokerage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/current" element={<CurrentListings />} />
              <Route path="/listings/closed" element={<ClosedTransactions />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/nda" element={<NDA />} />
              <Route path="/team" element={<Team />} />
              <Route path="/business-brokerage" element={<BusinessBrokerage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
