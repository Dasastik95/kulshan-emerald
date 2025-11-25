import { Navigate } from "react-router-dom";

const Listings = () => {
  // Redirect to current listings page when clicking on "Listings" in navbar
  return <Navigate to="/listings/current" replace />;
};

export default Listings;