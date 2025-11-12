import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ImageCarousel from "@/components/ImageCarousel";
import { useListing } from "@/hooks/useListing";

const PropertyDetails = () => {
  const { id } = useParams();
  const { data: property, isLoading, isError, error } = useListing(id);
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen py-12">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message || "Failed to load property details. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-4">{property.title}</h1>
        <ImageCarousel images={property.images} />
        <div className="mt-8">
          <h2 className="text-3xl font-semibold">Description</h2>
          <p className="mt-4 text-lg text-muted-foreground">{property.description}</p>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold">Details</h2>
          <ul className="mt-4">
            <li><strong>Price:</strong> ${property.price}</li>
            <li><strong>Location:</strong> {property.location}</li>
            <li><strong>Size:</strong> {property.size} sqft</li>
            {/* Add more details as necessary */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;