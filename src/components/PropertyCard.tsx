import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, TrendingUp, Users, ArrowRight, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  id: string | number;
  title: string;
  location?: string;
  price?: any;
  askingPrice?: any;
  soldPrice?: any;
  type?: string;
  industry?: string;
  revenue?: any;
  cashFlow?: any;
  growth?: any;
  employees?: any;
  size?: string;
  image?: string;
  images?: string[];
  description?: string;
  highlights?: any[];
  keyHighlights?: any[];
  featured?: boolean;
  status?: "available" | "sold" | "pending";
  [key: string]: any;
}

/**
 * Format price value with proper currency formatting
 */
function formatPriceValue(val: any) {
  if (val === null || val === undefined || val === "") return "---";

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

const PropertyCard = ({
  id,
  title,
  location = "",
  price,
  askingPrice,
  soldPrice,
  type = "",
  industry = "",
  revenue,
  cashFlow,
  growth,
  employees,
  size = "",
  image,
  images = [],
  description = "",
  highlights = [],
  keyHighlights = [],
  featured = false,
  status = "available",
  ...rest
}: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

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
          subject: `Business Listing Inquiry: ${title}`,
          listing_name: title,
          listing_industry: displayIndustry,
          listing_price: displayPrice,
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

  // If this card represents a previous deal, route to closed listing paths
  const isPrevious = rest.previous === true || status === "sold";

  // Determine price to display
  const displayPrice = formatPriceValue(askingPrice || price || soldPrice);
  
  // Determine industry/type to display
  const displayIndustry = industry || type || "Commercial";
  
  // Format revenue
  const displayRevenue = formatPriceValue(revenue || cashFlow);
  
  // Format growth
  const displayGrowth = growth ? (typeof growth === "string" ? growth : `${growth}%`) : "---";
  
  // Format employees
  const displayEmployees = employees || "---";
  
  // Get highlights array
  const displayHighlights = keyHighlights?.length ? keyHighlights : highlights;
  const highlightsArray = Array.isArray(displayHighlights) 
    ? displayHighlights.map((h: any) => typeof h === "string" ? h : h?.text || h?.name || "")
    : [];

  // Render closed transaction card differently
  if (isPrevious) {
    return (
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300">
        <div className="p-6">
          {/* Title and Industry */}
          <h3 className="font-bold text-2xl mb-2 text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mb-1">{displayIndustry}</p>
          {rest.established && (
            <p className="text-sm text-muted-foreground mb-4">Established {rest.established}</p>
          )}

          {/* Price Boxes */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-primary/10 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{soldPrice ? formatPriceValue(soldPrice) : "N/A"}</div>
              <div className="text-sm text-muted-foreground">Final Sale Price</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{rest.timeToSale || "N/A"}</div>
              <div className="text-sm text-muted-foreground">Time to Sale</div>
            </div>
          </div>

          {/* Location and Employees */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{displayEmployees}</span>
            </div>
          </div>

          {/* Highlights */}
          {highlightsArray.length > 0 && (
            <div>
              <h4 className="font-semibold text-base mb-3 text-foreground">Highlights</h4>
              <ul className="space-y-2">
                {highlightsArray.map((highlight: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Render current listing card
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent hover:border-l-accent/80">
      <div className="p-6">
        {/* Title, Industry, and Price */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="font-bold text-xl mb-1 text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{displayIndustry}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-foreground">{displayPrice}</div>
            <div className="text-xs text-muted-foreground">Asking Price</div>
          </div>
        </div>

        {/* Stats with Icons */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{displayRevenue}</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{displayGrowth}</div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground">{displayEmployees}</div>
              <div className="text-xs text-muted-foreground">Employees</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div>
              <div className="text-sm font-medium text-foreground line-clamp-1">{location}</div>
              <div className="text-xs text-muted-foreground">Location</div>
            </div>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">{description}</p>
        )}

        {/* Key Highlights */}
        {highlightsArray.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold text-sm mb-3 text-foreground">Key Highlights</h4>
            <div className="space-y-0">
              {highlightsArray.slice(0, 5).map((highlight: string, idx: number) => (
                <div key={idx} className="text-sm text-muted-foreground py-0.5">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
          <Button 
            onClick={() => setIsOpen(true)}
            className="w-full bg-[#001f3f] hover:bg-[#001f3f]/90 text-white" 
            size="default"
          >
            Request Information
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {rest.flyerUrl ? (
            <Button variant="outline" asChild className="w-full border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f]/5" size="default">
              <a href={rest.flyerUrl} target="_blank" rel="noreferrer">
                <Download className="mr-2 h-4 w-4" />
                Download Flyer
              </a>
            </Button>
          ) : id ? (
            <Button variant="outline" asChild className="w-full border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f]/5" size="default">
              <Link to={`/listings/${id}`}>
                <Download className="mr-2 h-4 w-4" />
                Download Flyer
              </Link>
            </Button>
          ) : (
            <Button variant="outline" asChild className="w-full border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f]/5" size="default">
              <Link to="/contact">
                <Download className="mr-2 h-4 w-4" />
                Download Flyer
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Request Information</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button type="submit" className="btn-primary flex items-center justify-center mt-2">
                Submit
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PropertyCard;
