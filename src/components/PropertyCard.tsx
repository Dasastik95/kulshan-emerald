import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Building2, DollarSign, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string | number;
  title: string;
  location: string;
  price?: string;
  askingPrice?: string;
  type?: string;
  size?: string;
  image?: string;
  status?: "available" | "sold" | "pending";
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  askingPrice,
  type = "",
  size = "",
  image,
  status = "available",
}: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false);
  const displayPrice = price || askingPrice || "Price on request";

  return (
    <Link to={`/listings/${id}`} target="_blank" rel="noopener noreferrer" className="block">
      <div className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full border rounded-md">
        <div className="relative overflow-hidden aspect-[4/3] bg-muted">
          {!image || imageError ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          ) : (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{location}</p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">{type} • {size}</div>
            <div className="text-lg font-bold">{displayPrice}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
