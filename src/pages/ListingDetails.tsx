import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  DollarSign,
  Building2,
  Calendar,
  Users,
} from "lucide-react";
import { useListings } from "@/hooks/useListings";
import { fetchListingById } from "@/lib/firestore";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Lightweight formatter that accepts numbers or common string forms like
 * "$6,750,000", "6750000", "6.75M" and returns a USD formatted string.
 */
function formatPriceValue(val: any) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "number" && !Number.isNaN(val)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  }
  if (typeof val === "string") {
    let cleaned = val.replace(/\s+/g, "");
    const abbrevMatch = cleaned.match(/^([\d.,]+)\s*([kKmMbB])$/);
    if (abbrevMatch) {
      const num = Number(abbrevMatch[1].replace(/,/g, ""));
      const unit = abbrevMatch[2].toLowerCase();
      if (!Number.isNaN(num)) {
        const scale = unit === "k" ? 1e3 : unit === "m" ? 1e6 : unit === "b" ? 1e9 : 1;
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(num * scale);
      }
    }
    cleaned = cleaned.replace(/[^0-9.\-]/g, "");
    if (cleaned === "") return val;
    const num = Number(cleaned);
    if (!Number.isNaN(num)) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(num);
    }
    return val;
  }
  return String(val);
}

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: listings, isLoading: listLoading, isError: listError } = useListings();
  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Try cache first, otherwise fetch single doc (works if opened in new tab)
  useEffect(() => {
    if (!id) return;
    if (listings && listings.length) {
      const found = listings.find((l: any) => String(l.id) === String(id) || String(l.id) === id);
      if (found) {
        setListing(found);
        return;
      }
    }

    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await fetchListingById(String(id));
        if (!mounted) return;
        if (!doc) {
          setError("Listing not found.");
          setListing(null);
        } else {
          setListing(doc);
        }
      } catch (err: any) {
        console.error(err);
        if (!mounted) return;
        setError(err.message || "Failed to load listing.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id, listings]);

  // ensure page opens scrolled to top
  useEffect(() => {
    if (!listLoading && !loading) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [id, listLoading, loading, listing]);

  if (!id) return <div className="min-h-screen py-12">Invalid listing id.</div>;
  if (listLoading || loading) return <div className="min-h-screen py-12">Loading listing…</div>;
  if (listError) return <div className="min-h-screen py-12">Failed to load listings.</div>;
  if (error) return <div className="min-h-screen py-12">{error}</div>;
  if (!listing) return <div className="min-h-screen py-12">Listing not found.</div>;

  // images for carousel / hero
  const images: string[] =
    (Array.isArray(listing.images) && listing.images.length && listing.images) ||
    (Array.isArray(listing.photos) && listing.photos.length && listing.photos) ||
    (listing.gallery && Array.isArray(listing.gallery) && listing.gallery) ||
    (listing.image ? [listing.image] : []);

  // price detection (check common fields)
  const priceCandidate =
    listing.price ??
    listing.askingPrice ??
    listing.originalAskingPrice ??
    listing.soldPrice ??
    listing.listPrice ??
    listing.amount ??
    listing.salePrice ??
    listing.priceString ??
    listing.price_string;
  const price = formatPriceValue(priceCandidate);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header
        className="relative h-[44vh] md:h-[52vh] lg:h-[56vh] rounded-b-xl overflow-hidden"
        aria-hidden={false}
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-75"
          style={{
            backgroundImage: `url(${images[0] || "/placeholder.svg"})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <nav className="text-sm mb-2">
              <Link to="/" className="opacity-80 hover:underline">
                Home
              </Link>
              <span className="mx-2 opacity-60">/</span>
              <Link to="/listings/current" className="opacity-80 hover:underline">
                Listings
              </Link>
              <span className="mx-2 opacity-60">/</span>
              <span className="opacity-60 truncate max-w-[28ch]">{listing.title}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                {listing.title}
              </h1>

              <div className="mt-3 sm:mt-0 flex items-center gap-3">
                {listing.featured && <Badge className="bg-primary/95 text-primary-foreground">Featured</Badge>}
                <div className="flex items-center text-sm gap-2 opacity-90">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-white/95 text-foreground px-4 py-2 rounded-md shadow-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold">{price ?? "Price on request"}</span>
              </div>

              {listing.industry && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-sm rounded">
                  <Building2 className="h-4 w-4" />
                  <span className="capitalize">{listing.industry}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-card p-6 rounded-lg shadow">
            {/* Gallery */}
            <section>
              <ImageCarousel images={images} />
            </section>

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {listing.description}
              </p>
            </section>

            {/* Highlights */}
            <section>
              <h3 className="text-lg font-medium mb-2">Highlights</h3>
              {Array.isArray(listing.highlights) && listing.highlights.length ? (
                <div className="flex flex-wrap gap-2">
                  {listing.highlights.map((h: string, i: number) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No highlights provided.</p>
              )}
            </section>

            {/* Additional sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {listing.challenge && (
                <section>
                  <h4 className="font-medium mb-1">Challenge</h4>
                  <p className="text-sm text-muted-foreground">{listing.challenge}</p>
                </section>
              )}
              {listing.solution && (
                <section>
                  <h4 className="font-medium mb-1">Solution</h4>
                  <p className="text-sm text-muted-foreground">{listing.solution}</p>
                </section>
              )}
            </div>
          </div>

          {/* Sticky aside */}
          <aside className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-2xl font-bold">{price ?? "Price on request"}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium">
                    {listing.soldPrice || listing.sold ? "Sold" : "Available"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs">Employees</div>
                    <div className="font-medium">{listing.employees ?? "—"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs">Established</div>
                    <div className="font-medium">{listing.established ?? "—"}</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons - improved styling */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="md" className="w-full sm:w-auto px-6 py-3 rounded-md shadow">
                  <a href="/contact" className="block text-center font-semibold">
                    Request Info
                  </a>
                </Button>

                <Button variant="outline" asChild size="md" className="w-full sm:w-auto px-6 py-3 rounded-md">
                  <a href="/nda" className="block text-center font-semibold">
                    Sign NDA
                  </a>
                </Button>
              </div>
            </div>

            {listing.soldPrice && (
              <div className="bg-card p-4 rounded-lg border border-border text-sm">
                <div className="text-sm text-muted-foreground">Sold Price</div>
                <div className="font-medium">{formatPriceValue(listing.soldPrice)}</div>
                {listing.saleDate && <div className="text-muted-foreground text-xs mt-1">Sold on {listing.saleDate}</div>}
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ListingDetails;