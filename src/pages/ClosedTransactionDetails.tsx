import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapPin, DollarSign, Building2, Calendar, Users } from "lucide-react";
import { fetchPreviousDealById } from "@/lib/firestore";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatPriceValue(val: any) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "number" && !Number.isNaN(val)) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  }
  if (typeof val === "string") {
    let cleaned = val.replace(/\s+/g, "");
    const abbrevMatch = cleaned.match(/^([\d.,]+)\s*([kKmMbB])$/);
    if (abbrevMatch) {
      const num = Number(abbrevMatch[1].replace(/,/g, ""));
      const unit = abbrevMatch[2].toLowerCase();
      if (!Number.isNaN(num)) {
        const scale = unit === "k" ? 1e3 : unit === "m" ? 1e6 : unit === "b" ? 1e9 : 1;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num * scale);
      }
    }
    cleaned = cleaned.replace(/[^0-9.\-]/g, "");
    if (cleaned === "") return val;
    const num = Number(cleaned);
    if (!Number.isNaN(num)) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
    }
    return val;
  }
  return String(val);
}

const ClosedTransactionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [deal, setDeal] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await fetchPreviousDealById(String(id));
        if (!mounted) return;
        if (!doc) {
          setError("Transaction not found.");
          setDeal(null);
        } else {
          setDeal(doc);
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err.message || "Failed to load transaction.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!id) return <div className="min-h-screen py-12">Invalid transaction id.</div>;
  if (loading) return <div className="min-h-screen py-12">Loading transaction…</div>;
  if (error) return <div className="min-h-screen py-12">{error}</div>;
  if (!deal) return <div className="min-h-screen py-12">Transaction not found.</div>;

  const images: string[] =
    (Array.isArray(deal.images) && deal.images.length && deal.images) ||
    (Array.isArray(deal.photos) && deal.photos.length && deal.photos) ||
    (deal.gallery && Array.isArray(deal.gallery) && deal.gallery) ||
    (deal.image ? [deal.image] : []);

  const priceCandidate = deal.price ?? deal.askingPrice ?? deal.originalAskingPrice ?? deal.soldPrice ?? deal.listPrice ?? deal.amount ?? deal.salePrice ?? deal.priceString ?? deal.price_string;
  const price = formatPriceValue(priceCandidate);

  return (
    <div className="min-h-screen bg-background">
      <header className="relative h-[44vh] md:h-[52vh] lg:h-[56vh] rounded-b-xl overflow-hidden" aria-hidden={false}>
        <div className="absolute inset-0 bg-cover bg-center filter brightness-75" style={{ backgroundImage: `url(${images[0] || "/placeholder.svg"})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <nav className="text-sm mb-2">
              <Link to="/" className="opacity-80 hover:underline">Home</Link>
              <span className="mx-2 opacity-60">/</span>
              <Link to="/listings/closed" className="opacity-80 hover:underline">Closed Transactions</Link>
              <span className="mx-2 opacity-60">/</span>
              <span className="opacity-60 truncate max-w-[28ch]">{deal.title}</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">{deal.title}</h1>

              <div className="mt-3 sm:mt-0 flex items-center gap-3">
                {deal.featured && <Badge className="bg-primary/95 text-primary-foreground">Featured</Badge>}
                <div className="flex items-center text-sm gap-2 opacity-90"><MapPin className="h-4 w-4" /><span>{deal.location}</span></div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="inline-flex items-center gap-2 bg-white/95 text-foreground px-4 py-2 rounded-md shadow-sm">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold">{price ?? "Price on request"}</span>
              </div>

              {deal.industry && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-white text-sm rounded"><Building2 className="h-4 w-4" /><span className="capitalize">{deal.industry}</span></div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 bg-card p-6 rounded-lg shadow">
            <section>
              <ImageCarousel images={images} />
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Overview</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{deal.description}</p>
            </section>

            <section>
              <h3 className="text-lg font-medium mb-2">Highlights</h3>
              {Array.isArray(deal.highlights) && deal.highlights.length ? (
                <div className="flex flex-wrap gap-2">{deal.highlights.map((h: string, i: number) => (<span key={i} className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">{h}</span>))}</div>
              ) : (
                <p className="text-sm text-muted-foreground">No highlights provided.</p>
              )}
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{deal.challenge && (<section><h4 className="font-medium mb-1">Challenge</h4><p className="text-sm text-muted-foreground">{deal.challenge}</p></section>)}{deal.solution && (<section><h4 className="font-medium mb-1">Solution</h4><p className="text-sm text-muted-foreground">{deal.solution}</p></section>)}</div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Sold Price</div>
                  <div className="text-2xl font-bold">{price ?? "Price on request"}</div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium">Sold</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs">Employees</div><div className="font-medium">{deal.employees ?? "—"}</div></div></div>

                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><div><div className="text-xs">Sold On</div><div className="font-medium">{deal.saleDate ?? "—"}</div></div></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="default" className="w-full sm:w-auto px-6 py-3 rounded-md shadow"><a href="/contact" className="block text-center font-semibold">Request Info</a></Button>
                <Button variant="outline" asChild size="default" className="w-full sm:w-auto px-6 py-3 rounded-md"><a href="/nda" className="block text-center font-semibold">Sign NDA</a></Button>
              </div>
            </div>

            {deal.soldPrice && (<div className="bg-card p-4 rounded-lg border border-border text-sm"><div className="text-sm text-muted-foreground">Sold Price</div><div className="font-medium">{formatPriceValue(deal.soldPrice)}</div>{deal.saleDate && <div className="text-muted-foreground text-xs mt-1">Sold on {deal.saleDate}</div>}</div>)}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ClosedTransactionDetails;
