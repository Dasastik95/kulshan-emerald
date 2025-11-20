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

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50">
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl mb-1 text-foreground line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{displayIndustry}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold text-foreground">{displayPrice}</div>
            <div className="text-xs text-muted-foreground">Asking Price</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <DollarSign className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">{displayRevenue}</div>
              <div className="text-xs text-muted-foreground">Revenue</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">{displayGrowth}</div>
              <div className="text-xs text-muted-foreground">Growth</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground">{displayEmployees}</div>
              <div className="text-xs text-muted-foreground">Employees</div>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground line-clamp-1">{location}</div>
              <div className="text-xs text-muted-foreground">Location</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="px-6 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        </div>
      )}

      {/* Key Highlights */}
      {highlightsArray.length > 0 && (
        <div className="px-6 pb-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">Key Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {highlightsArray.slice(0, 5).map((highlight: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs px-3 py-1">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-auto p-6 pt-4 grid grid-cols-2 gap-3 border-t border-border/50">
        <Button asChild className="w-full" size="default">
          <Link to={`/listings/${id}`}>
            <span>Request Information</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild className="w-full" size="default">
          <Link to={`/listings/${id}`}>
            <Download className="mr-2 h-4 w-4" />
            <span>Download Flyer</span>
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default PropertyCard;
