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
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Closed Transactions</h1>
          <p className="text-xl text-muted-foreground">
            Explore our recent successful commercial real estate transactions
          </p>
        </div>

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
                <Link key={property.id} to={`/listings/${property.id}`}>
                  <PropertyCard {...property} />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Similar Properties?</h2>
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

export default ClosedTransactions;