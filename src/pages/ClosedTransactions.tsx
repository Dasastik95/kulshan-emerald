import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/PropertyCard";
import { usePreviousDeals } from "@/hooks/useListings";

const ClosedTransactions = () => {
  const { data: closedTransactions = [], isLoading } = usePreviousDeals();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    if (!debouncedQuery) return closedTransactions;
    const terms = debouncedQuery.split(/\s+/).filter(Boolean);
    return closedTransactions.filter((item: any) => {
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
  }, [closedTransactions, debouncedQuery]);

  const displayed = filtered.slice(0, 20);

  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/50 to-background pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex-1">
              <div className="max-w-4xl">
                <Input
                  value={query}
                  onChange={(e: any) => setQuery(e.target.value)}
                  placeholder="Search by title, location, industry, tags..."
                  className="h-12 text-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-foreground font-medium">{filtered.length} properties</div>
              <button className="inline-flex items-center gap-2 border border-border rounded-md px-3 py-2 bg-white">
                <svg className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 5h18M6 12h12M10 19h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm text-muted-foreground">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No closed transactions to display at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayed.map((property: any) => (
              <div key={property.id} className="w-full">
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        )}

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
