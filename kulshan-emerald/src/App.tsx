import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentListings from "./pages/CurrentListings";
import ClosedTransactions from "./pages/ClosedTransactions";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/current" element={<CurrentListings />} />
        <Route path="/transactions/closed" element={<ClosedTransactions />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;