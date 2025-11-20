import { Link } from "react-router-dom";
import { Filter, Loader2, AlertCircle, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/PropertyCard";
import { useListings } from "@/hooks/useListings";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useMemo, useState } from "react";

const CurrentListings = () => {
  const { data: currentListings = [], isLoading, isError, error } = useListings();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // debounce query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return currentListings;
    const terms = debouncedQuery.split(/\s+/).filter(Boolean);
    return currentListings.filter((item: any) => {
      const searchable = [
        item.title,
        item.name,
        item.location,
        item.address,
        item.description,
        item.industry,
        item.type,
        item.tags && Array.isArray(item.tags) ? item.tags.join(" ") : item.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return terms.every((t) => searchable.includes(t));
    });
  }, [currentListings, debouncedQuery]);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/50 to-background pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-sm font-semibold text-primary">Investment Opportunities</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Current Listings</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Explore our curated selection of commercial investment properties across the Pacific Northwest
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search + Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 w-full sm:max-w-lg">
            <div className="relative w-full">
              <Input
                value={query}
                onChange={(e: any) => setQuery(e.target.value)}
                placeholder="Search by title, location, industry, tags..."
                className="pr-10"
              />
              <Search className="absolute right-10 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {query && (
                <button
                  aria-label="clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-muted-foreground font-bold text-black/70">
              {filtered.length} {filtered.length === 1 ? "property" : "properties"}
            </p>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No listings match your search.</p>
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filtered.map((property: any) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-12 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Make a Move?</h2>
          <p className="text-xl mb-6 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            Connect with our experienced team to discuss your commercial real estate investment goals. We're here to help you find the perfect property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link to="/team">Meet Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentListings;
