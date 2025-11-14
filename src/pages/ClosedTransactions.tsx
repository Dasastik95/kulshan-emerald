import { Link } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { usePreviousDeals } from "@/hooks/useListings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ClosedTransactions = () => {
  const { data: closedTransactions = [], isLoading, isError, error } = usePreviousDeals();

  if (isLoading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading transactions...</p>
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
              {error?.message || "Failed to load transactions. Please try again later."}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/50 to-background pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-semibold text-primary">Proven Success</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Closed Transactions</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Discover our track record of successful commercial real estate deals across the region
            </p>
          </div>
          
          {/* Success Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">$500M+</div>
              <div className="text-sm text-muted-foreground">Total Transaction Value</div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Properties Sold</div>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border text-center">
              <div className="text-3xl font-bold text-primary mb-1">25+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Transactions Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {closedTransactions.length} {closedTransactions.length === 1 ? "transaction" : "recent transactions"}
            </p>
          </div>

          {closedTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No closed transactions to display at this time.</p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {closedTransactions.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Similar Properties?</h2>
          <p className="text-xl mb-6 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Our team has the expertise and market knowledge to help you achieve similar success with your commercial real estate investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Discuss Your Goals</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/listings/current">View Current Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedTransactions;
