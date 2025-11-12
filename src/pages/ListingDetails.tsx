import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import ImageCarousel from "@/components/ImageCarousel";

const ListingDetails = () => {
  const { id } = useParams();
  const { data: listings = [], isLoading, isError } = useListings();

  const listing = useMemo(() => {
    if (!id || !listings) return undefined;
    // try to match by numeric id or string id
    return listings.find((l: any) => String(l.id) === String(id) || String(l.id) === id);
  }, [id, listings]);

  if (isLoading) return <div className="min-h-screen py-12">Loading listing…</div>;
  if (isError) return <div className="min-h-screen py-12">Failed to load listing.</div>;
  if (!listing) return <div className="min-h-screen py-12">Listing not found.</div>;

  // collect images (support several common field names)
  const images: string[] =
    listing.images ||
    listing.photos ||
    (listing.image ? [listing.image] : []) ||
    (Array.isArray(listing.gallery) ? listing.gallery : []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
        <div className="mb-6">
          <ImageCarousel images={images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{listing.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Highlights</h3>
              {Array.isArray(listing.highlights) && listing.highlights.length ? (
                <ul className="list-disc pl-5 space-y-1">
                  {listing.highlights.map((h: string, i: number) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No highlights provided.</p>
              )}
            </div>
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
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;