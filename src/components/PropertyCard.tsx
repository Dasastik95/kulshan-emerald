import { Link } from "react-router-dom";
import { MapPin, Building2, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  size: string;
  image: string;
  status?: "available" | "sold" | "pending";
}

const PropertyCard = ({
  id,
  title,
  location,
  price,
  type,
  size,
  image,
  status = "available",
}: PropertyCardProps) => {
  const statusColors = {
    available: "bg-primary text-primary-foreground",
    sold: "bg-neutral-800 text-white",
    pending: "bg-yellow-500 text-white",
  };

  return (
    <Link to={`/listings/${id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className={`absolute top-4 right-4 ${statusColors[status]}`}>
            {status === "available" ? "Available" : status === "sold" ? "Sold" : "Pending"}
          </Badge>
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-primary" />
              <span>{type} • {size}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold text-foreground">{price}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PropertyCard;
