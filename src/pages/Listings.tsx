import { useState } from "react";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PropertyCard from "@/components/PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Listings = () => {
  const currentListings = [
    {
      id: "1",
      title: "Premium Office Building",
      location: "Downtown District",
      price: "4.2M",
      type: "Office",
      size: "25,000 SF",
      image: property1,
      status: "available" as const,
    },
    {
      id: "2",
      title: "Retail Shopping Center",
      location: "Main Street",
      price: "6.8M",
      type: "Retail",
      size: "45,000 SF",
      image: property2,
      status: "available" as const,
    },
    {
      id: "3",
      title: "Industrial Warehouse",
      location: "Commerce Park",
      price: "3.5M",
      type: "Industrial",
      size: "50,000 SF",
      image: property3,
      status: "available" as const,
    },
    {
      id: "7",
      title: "Mixed-Use Development",
      location: "Urban Center",
      price: "12.5M",
      type: "Mixed-Use",
      size: "75,000 SF",
      image: property1,
      status: "available" as const,
    },
    {
      id: "8",
      title: "Restaurant Space",
      location: "Entertainment District",
      price: "1.8M",
      type: "Retail",
      size: "8,500 SF",
      image: property2,
      status: "available" as const,
    },
    {
      id: "9",
      title: "Logistics Facility",
      location: "Airport Corridor",
      price: "9.2M",
      type: "Industrial",
      size: "120,000 SF",
      image: property3,
      status: "available" as const,
    },
  ];

  const closedTransactions = [
    {
      id: "4",
      title: "Corporate Headquarters",
      location: "Business District",
      price: "8.5M",
      type: "Office",
      size: "60,000 SF",
      image: property1,
      status: "sold" as const,
    },
    {
      id: "5",
      title: "Medical Office Complex",
      location: "Healthcare District",
      price: "5.2M",
      type: "Medical",
      size: "35,000 SF",
      image: property2,
      status: "sold" as const,
    },
    {
      id: "6",
      title: "Distribution Center",
      location: "Industrial Zone",
      price: "7.8M",
      type: "Industrial",
      size: "85,000 SF",
      image: property3,
      status: "sold" as const,
    },
    {
      id: "10",
      title: "Office Tower",
      location: "Financial District",
      price: "22.5M",
      type: "Office",
      size: "150,000 SF",
      image: property1,
      status: "sold" as const,
    },
    {
      id: "11",
      title: "Specialty Retail",
      location: "Shopping District",
      price: "4.3M",
      type: "Retail",
      size: "18,000 SF",
      image: property2,
      status: "sold" as const,
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Property Listings</h1>
          <p className="text-xl text-muted-foreground">
            Browse our commercial real estate portfolio
          </p>
        </div>

        {/* B2B Business Broker Listings Link */}
        <div className="mb-8 p-6 bg-accent rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2">Looking for Business Opportunities?</h3>
          <p className="text-muted-foreground mb-4">
            Explore our business brokerage listings and discover acquisition opportunities.
          </p>
          <Button variant="outline" asChild>
            <Link to="/business-brokerage">View Business Listings</Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current">Current Listings</TabsTrigger>
            <TabsTrigger value="closed">Closed Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {currentListings.length} properties available
              </p>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentListings.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="closed" className="space-y-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground">
                {closedTransactions.length} recent transactions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {closedTransactions.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Move?</h2>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Connect with our team to discuss your commercial real estate needs
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Listings;
