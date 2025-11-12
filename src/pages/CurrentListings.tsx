import { Link } from "react-router-dom";
import { Filter, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { useListings } from "@/hooks/useListings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CurrentListings = () => {
  const { data: currentListings = [], isLoading, isError, error } = useListings();

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading listings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error?.message || "Failed to load listings. Please try again later."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Current Listings</h1>
          <p className="text-xl text-muted-foreground">
            Browse our available commercial real estate properties
          </p>
        </div>

        {/* B2B Business Broker Listings Link */}
        <div className="mb-8 p-6 bg-accent rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2">Looking for Business Opportunities?</h3>
          <p className="text-muted-foreground mb-4">
            Explore our business brokerage listings and discover acquisition opportunities.
          </p>
          <Button variant="outline" asChild>
            <Link to="/business-brokerage">View Business Listings</Link>
          </Button>
        </div>

        {/* Listings Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {currentListings.length} {currentListings.length === 1 ? "property" : "properties"} available
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {currentListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No listings available at this time.</p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentListings.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Move?</h2>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Connect with our team to discuss your commercial real estate needs
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentListings;
