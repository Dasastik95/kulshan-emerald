import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Building2, Calendar, Users, X } from "lucide-react";
import { fetchPreviousDealById } from "@/lib/firestore";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

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

interface ClosedTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId: string | null;
  cachedTransaction?: any | null;
  allTransactions?: any[];
}

const ClosedTransactionModal = ({ isOpen, onClose, transactionId, cachedTransaction, allTransactions = [] }: ClosedTransactionModalProps) => {
  const [deal, setDeal] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !transactionId) {
      setDeal(null);
      setError(null);
      return;
    }

    // First, check if we have cached transaction data
    if (cachedTransaction) {
      console.log("ClosedTransactionModal: Using cached transaction", cachedTransaction);
      setDeal(cachedTransaction);
      setLoading(false);
      setError(null);
      return;
    }

    // Second, check in the allTransactions array
    if (allTransactions && allTransactions.length > 0) {
      const found = allTransactions.find((t: any) => {
        const tId = t.id || t._id || t.docId;
        const match = String(tId) === String(transactionId);
        if (match) {
          console.log("ClosedTransactionModal: Found in allTransactions", t);
        }
        return match;
      });
      if (found) {
        setDeal(found);
        setLoading(false);
        setError(null);
        return;
      }
    }

    console.log("ClosedTransactionModal: Not found in cache, fetching from Firestore", { transactionId, allTransactionsCount: allTransactions?.length });

    // If not in cache, fetch from Firestore
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        let doc = await fetchPreviousDealById(String(transactionId));
        if (!mounted) return;

        if (!doc) {
          try {
            const decoded = decodeURIComponent(String(transactionId));
            if (decoded !== transactionId) {
              doc = await fetchPreviousDealById(decoded);
              if (!mounted) return;
            }
          } catch (e) {
            // ignore
          }
        }

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
  }, [isOpen, transactionId, cachedTransaction, allTransactions]);

  if (!transactionId) return null;

  const images: string[] =
    (Array.isArray(deal?.images) && deal.images.length && deal.images) ||
    (Array.isArray(deal?.photos) && deal.photos.length && deal.photos) ||
    (deal?.gallery && Array.isArray(deal.gallery) && deal.gallery) ||
    (deal?.image ? [deal.image] : []);

  const priceCandidate = deal?.price ?? deal?.askingPrice ?? deal?.originalAskingPrice ?? deal?.soldPrice ?? deal?.listPrice ?? deal?.amount ?? deal?.salePrice ?? deal?.priceString ?? deal?.price_string;
  const price = formatPriceValue(priceCandidate);

  // Get highlights array
  const displayHighlights = deal?.keyHighlights?.length ? deal.keyHighlights : deal?.highlights;
  const highlightsArray = Array.isArray(displayHighlights)
    ? displayHighlights.map((h: any) => typeof h === "string" ? h : h?.text || h?.name || "")
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full w-screen h-screen max-h-screen overflow-hidden p-0 gap-0 m-0 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] rounded-none">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 z-[100] rounded-full bg-black/70 hover:bg-black/90 text-white p-2 transition-colors shadow-lg"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable content container */}
        <div className="overflow-y-auto h-full w-full bg-white">
          {loading && (
            <div className="flex items-center justify-center min-h-[100vh]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading transaction…</p>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="flex items-center justify-center min-h-[100vh] px-6">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">Transaction not found</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {deal && !loading && (
            <div className="min-h-screen bg-white">
              {/* Dark Header Section */}
              <header className="relative bg-[#2a2a2a] text-white pt-20 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                  {/* Breadcrumbs */}
                  <nav className="text-sm mb-6 opacity-90">
                    <Link to="/" className="hover:underline" onClick={(e) => e.stopPropagation()}>
                      Home
                    </Link>
                    <span className="mx-2 opacity-60">/</span>
                    <Link to="/listings/closed" className="hover:underline" onClick={(e) => e.stopPropagation()}>
                      Closed Transactions
                    </Link>
                    <span className="mx-2 opacity-60">/</span>
                    <span className="opacity-60">{deal.title}</span>
                  </nav>

                  {/* Title and Location */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-0">
                      {deal.title}
                    </h1>
                    <div className="flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5" />
                      <span>{deal.location}</span>
                    </div>
                  </div>

                  {/* Price and Category Badges */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20">
                      <DollarSign className="h-5 w-5" />
                      <span className="font-semibold text-lg">{price ?? "Price on request"}</span>
                    </div>
                    {deal.industry && (
                      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-md border border-white/20">
                        <Building2 className="h-5 w-5" />
                        <span className="capitalize">{deal.industry}</span>
                      </div>
                    )}
                  </div>

                  {/* Large Image Placeholder in Background */}
                  {images.length > 0 && images[0] ? (
                    <div
                      className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full overflow-hidden"
                      style={{
                        backgroundImage: `url(${images[0]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ) : (
                    <div className="absolute top-20 right-8 w-80 h-80 opacity-5">
                      <svg viewBox="0 0 200 200" className="w-full h-full">
                        <circle cx="100" cy="100" r="80" fill="currentColor" />
                        <path d="M60 100 L90 100 L100 90 L110 100 L140 100" stroke="white" strokeWidth="3" fill="none" />
                        <circle cx="100" cy="60" r="20" fill="white" />
                      </svg>
                    </div>
                  )}
                </div>
              </header>

              {/* Main Content Area - White Background */}
              <main className="bg-white min-h-[calc(100vh-400px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Images and Details */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Image Carousel Section */}
                      <section className="bg-white border border-gray-200 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                        {images.length > 0 ? (
                          <ImageCarousel images={images} />
                        ) : (
                          <p className="text-gray-400 text-lg">No images</p>
                        )}
                      </section>

                      {/* Overview Section */}
                      {deal.description && (
                        <section>
                          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Overview</h2>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {deal.description}
                          </p>
                        </section>
                      )}

                      {/* Highlights Section */}
                      {highlightsArray.length > 0 && (
                        <section>
                          <h3 className="text-xl font-semibold mb-4 text-gray-900">Highlights</h3>
                          <ul className="space-y-2">
                            {highlightsArray.map((h: string, i: number) => (
                              <li key={i} className="text-gray-700 flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-1">
                      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-4">
                        {/* Price */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                          <div className="text-sm text-gray-500 mb-1">Price</div>
                          <div className="text-3xl font-bold text-gray-900">{price ?? "Price on request"}</div>
                        </div>

                        {/* Status */}
                        <div className="mb-6 pb-6 border-b border-gray-200">
                          <div className="text-sm text-gray-500 mb-1">Status</div>
                          <div className="text-lg font-semibold text-gray-900">Available</div>
                        </div>

                        {/* Employees and Established Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <div className="text-sm text-gray-500">Employees</div>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">{deal.employees ?? "—"}</div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <div className="text-sm text-gray-500">Established</div>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">{deal.established ?? "—"}</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button
                            asChild
                            size="lg"
                            className="w-full bg-[#184703] hover:bg-[#35a501] text-white py-6 text-base font-semibold"
                          >
                            <Link to="/contact" onClick={(e) => e.stopPropagation()}>
                              Request Info
                            </Link>
                          </Button>

                          <Button
                            variant="outline"
                            asChild
                            size="lg"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-6 text-base font-semibold"
                          >
                            <Link to="/nda" onClick={(e) => e.stopPropagation()}>
                              Sign NDA
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </aside>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClosedTransactionModal;
