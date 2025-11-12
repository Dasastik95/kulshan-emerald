import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { fetchListingById } from "@/lib/firestore";
import ImageCarousel from "@/components/ImageCarousel";

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: listings, isLoading: listLoading, isError: listError } = useListings();
  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Try to find listing in cache first
  useEffect(() => {
    if (!id) return;
    if (listings && listings.length) {
      const found = listings.find((l: any) => String(l.id) === String(id) || String(l.id) === id);
      if (found) {
        setListing(found);
        return;
      }
    }

    // Fallback: fetch single doc by id (works when opened in new tab)
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

  if (!id) return <div className="min-h-screen py-12">Invalid listing id.</div>;
  if (listLoading || loading) return <div className="min-h-screen py-12">Loading listing…</div>;
  if (listError) return <div className="min-h-screen py-12">Failed to load listings.</div>;
  if (error) return <div className="min-h-screen py-12">{error}</div>;
  if (!listing) return <div className="min-h-screen py-12">Listing not found.</div>;

  const images: string[] =
    (Array.isArray(listing.images) && listing.images.length && listing.images) ||
    (Array.isArray(listing.photos) && listing.photos.length && listing.photos) ||
    (listing.gallery && Array.isArray(listing.gallery) && listing.gallery) ||
    (listing.image ? [listing.image] : []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>

        <div className="mb-6">
          <ImageCarousel images={images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">{listing.description}</p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Highlights</h3>
              {Array.isArray(listing.highlights) && listing.highlights.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {listing.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No highlights provided.</p>
              )}
            </section>

            {/* Add any other long-form content here (growth, challenge, solution, testimonial, etc.) */}
            {listing.challenge && (
              <section>
                <h3 className="text-lg font-medium mb-2">Challenge</h3>
                <p className="text-muted-foreground">{listing.challenge}</p>
              </section>
            )}

            {listing.solution && (
              <section>
                <h3 className="text-lg font-medium mb-2">Solution</h3>
                <p className="text-muted-foreground">{listing.solution}</p>
              </section>
            )}
          </div>

          <aside className="space-y-4 bg-card p-4 rounded-md">
            <div>
              <div className="text-sm text-muted-foreground">Location</div>
              <div className="font-medium">{listing.location}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Price</div>
              <div className="text-xl font-semibold">{listing.price || listing.askingPrice || "Price on request"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Industry / Type</div>
              <div className="font-medium">{listing.industry || listing.type || "—"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Employees</div>
              <div className="font-medium">{listing.employees ?? "—"}</div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground">Established</div>
              <div className="font-medium">{listing.established ?? "—"}</div>
            </div>

            {listing.soldPrice && (
              <div>
                <div className="text-sm text-muted-foreground">Sold Price</div>
                <div className="font-medium">{listing.soldPrice}</div>
              </div>
            )}
            {listing.saleDate && (
              <div>
                <div className="text-sm text-muted-foreground">Sale Date</div>
                <div className="font-medium">{listing.saleDate}</div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;