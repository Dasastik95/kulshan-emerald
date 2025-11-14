import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Building2, DollarSign, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  id: string | number;
  title: string;
  location?: string;
  price?: any;
  askingPrice?: any;
  soldPrice?: any;
  type?: string;
  size?: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  status?: "available" | "sold" | "pending";
  [key: string]: any;
}

/**
 * Try many common field names used in different documents and format numbers.
 */
function formatPriceValue(val: any) {
  if (val === null || val === undefined || val === "") return null;

  // If it's already a number, format it
  if (typeof val === "number" && !Number.isNaN(val)) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);
  }

  // If string that looks like a number, parse and format
  if (typeof val === "string") {
    // handle things like "$6,750,000", "6,750,000", "6750000", "6.75M"
    // first try to parse normalized numeric strings
    let cleaned = val.replace(/\s+/g, "");
    // handle common abbreviated forms (e.g. 6.75M -> 6750000)
    const abbrevMatch = cleaned.match(/^([\d.,]+)\s*([kKmMbB])$/);
    if (abbrevMatch) {
      const num = Number(abbrevMatch[1].replace(/,/g, ""));
      const unit = abbrevMatch[2].toLowerCase();
      if (!Number.isNaN(num)) {
        const scale = unit === "k" ? 1e3 : unit === "m" ? 1e6 : unit === "b" ? 1e9 : 1;
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num * scale);
      }
    }

    // remove currency symbols and commas, keep digits and dot and minus
    cleaned = cleaned.replace(/[^0-9.\-]/g, "");
    if (cleaned === "") return val; // no digits — return original string
    const num = Number(cleaned);
    if (!Number.isNaN(num)) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(num);
    }
    // return original if it doesn't parse (maybe already formatted text)
    return val;
  }

  return String(val);
}

// scan object (shallow + one level deep) for price-like keys
function findPriceCandidate(obj: Record<string, any>, primaryProps: any[] = []) {
  const candidates: any[] = [];

  // include explicit primary props first (passed destructured)
  for (const p of primaryProps) {
    if (p !== null && p !== undefined && p !== "") candidates.push(p);
  }

  const re = /(price|asking|sold|sale|list|amount|ask)/i;
  const pushIfVal = (v: any) => {
    if (v === null || v === undefined || v === "") return;
    candidates.push(v);
  };

  // top-level keys
  for (const k of Object.keys(obj)) {
    if (re.test(k)) {
      pushIfVal(obj[k]);
    }
  }

  // also check values that are objects (one level)
  for (const v of Object.values(obj)) {
    if (typeof v === "object" && v !== null) {
      try {
        for (const [k2, v2] of Object.entries(v)) {
          if (re.test(k2)) pushIfVal(v2);
        }
      } catch {
        // ignore
      }
    }
  }

  // finally try any numeric-like standalone values
  for (const v of Object.values(obj)) {
    if (typeof v === "number") pushIfVal(v);
    if (typeof v === "string" && /[\d$,.]/.test(v)) pushIfVal(v);
  }

  return candidates.length ? candidates[0] : null;
}

const PropertyCard = ({
  id,
  title,
  location = "",
  price,
  askingPrice,
  soldPrice,
  type = "",
  size = "",
  image,
  images = [],
  featured = false,
  status = "available",
  ...rest
}: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);

  // primary props to prefer
  const primary = [price, askingPrice, soldPrice];
  // find candidate scanning the rest object too
  const rawPrice = findPriceCandidate(rest, primary);

  const formattedPrice = formatPriceValue(rawPrice);

  // fallback label
  const displayPrice = formattedPrice ?? "Price on request";

  const imgSrc = !imageError && (image || (Array.isArray(images) && images[0])) ? (image || images[0]) : undefined;

  const statusColors = {
    available: "bg-primary text-primary-foreground",
    sold: "bg-neutral-800 text-white",
    pending: "bg-yellow-500 text-white",
  };

  return (
    <Link to={`/listings/${id}`} className="block group">
      <Card
        className={cn(
          "overflow-hidden h-full transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-2xl",
          featured ? "border-2 border-primary/10 scale-100" : ""
        )}
      >
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          {imgSrc && !imageError ? (
            <img
              src={imgSrc}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 transform group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {featured && (
            <Badge className="absolute left-4 top-4 bg-primary/95 text-primary-foreground">
              Featured
            </Badge>
          )}

          <div className="absolute right-4 top-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
              {status === "available" ? "Available" : status === "sold" ? "Sold" : "Pending"}
            </span>
          </div>

          <div className="absolute left-4 bottom-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
            <div className="flex items-baseline gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">{displayPrice}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 text-foreground line-clamp-2">{title}</h3>

          <div className="flex items-center text-sm text-muted-foreground gap-3 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="truncate">{type}{type && size ? " • " : ""}{size}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {/* optional description if present */}
            {rest.description}
          </p>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="text-sm text-muted-foreground hidden sm:block">{type}</div>
            <div className="text-sm font-medium text-foreground">{displayPrice}</div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
