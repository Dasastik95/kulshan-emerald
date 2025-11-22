import React, { useEffect, useState } from "react";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useListings } from "@/hooks/useListings";
import PropertyCard from "@/components/PropertyCard";

const CurrentListings: React.FC = () => {
  const { data: listings = [], isLoading, isError, error } = useListings();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [allListings, setAllListings] = useState<any[]>([]);

  useEffect(() => {
    setAllListings(listings || []);
  }, [listings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "7479fcc1-3404-4173-8e61-6812306a7547",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Business Listing Inquiry: ${selectedListing?.title || "General Inquiry"}`,
          listing_name: selectedListing?.title || "N/A",
          listing_industry: selectedListing?.industry || "N/A",
          listing_price: selectedListing?.askingPrice || "N/A",
          redirect: "",
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Form submitted successfully!");
        setIsOpen(false);
        setFormData({ name: "", email: "", phone: "" });
      } else {
        alert("Failed to submit the form. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting the form.");
    }
  };

  const handleDownloadFlyer = async (listing: any) => {
    if (!listing?.flyerUrl) return;
    try {
      const response = await fetch(listing.flyerUrl);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = listing.title ? `${listing.title}-flyer.pdf` : "flyer.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error("Error downloading flyer:", err);
      window.open(listing.flyerUrl, "_blank");
    }
  };

  const industries = Array.from(new Set(allListings.map((l: any) => l.industry || ""))).filter(Boolean);
  const locations = Array.from(new Set(allListings.map((l: any) => l.location || ""))).filter(Boolean);

  const filteredListings = allListings.filter((listing: any) => {
    const matchesSearch =
      (listing.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.industry || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || listing.industry === selectedIndustry;
    const matchesLocation = selectedLocation === "all" || listing.location === selectedLocation;
    return matchesSearch && matchesIndustry && matchesLocation;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading listings...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-destructive">Failed to load listings</h2>
            <p className="text-muted-foreground mt-2">{(error as any)?.message || "Please try again later."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Current Business Listings</h1>
          <p className="text-lg text-muted-foreground mb-8">Explore opportunities to acquire established, profitable businesses across various industries. All listings are confidential and pre-qualified.</p>
        </div>
      </section>

      <section className="py-8 bg-muted border-b border-border">
        <div className="container-width flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input className="w-full pl-10 pr-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" type="text" placeholder="Search businesses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          <div className="flex gap-4">
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)} className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"><option value="all">All Industries</option>{industries.map((industry) => (<option key={industry} value={industry}>{industry}</option>))}</select>

            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"><option value="all">All Locations</option>{locations.map((location) => (<option key={location} value={location}>{location}</option>))}</select>
          </div>
        </div>

        <div className="mt-4 ml-10 text-muted-foreground">Showing {filteredListings.length} of {allListings.length} businesses</div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          {filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-4">No listings found</h3>
              <p className="text-muted-foreground mb-8 text-sm sm:text-base">Try adjusting your search criteria or browse all listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredListings.map((listing: any) => (
                <PropertyCard key={listing.id ?? listing._id ?? listing.docId} {...listing} id={listing.id ?? listing._id ?? listing.docId} />
              ))}
            </div>
          )}
        </div>
      </section>

  {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">✕</button>
            <h2 className="text-xl font-semibold mb-4">Request Information</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button type="submit" className="btn-primary flex items-center justify-center mt-2">Submit <ArrowRight className="ml-2 h-4 w-4" /></button>
            </form>
          </div>
        </div>
      )}
      
      <section className="mt-16">
        <div className="bg-primary text-white  py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">List your commercial property to get top dollar offers</h2>
            <p className="text-xl mb-6 text-primary-foreground/90">Connect with our experience team to discuss selling your commercial investment real estate property. We will help you sell it on the best terms available by generating multiple, competing offers</p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
    
  );
};

export default CurrentListings;
