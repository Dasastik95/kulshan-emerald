import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const ClosedTransactions = () => {
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
          <h1 className="text-5xl font-bold mb-4">Closed Transactions</h1>
          <p className="text-xl text-muted-foreground">
            Explore our recent successful commercial real estate transactions
          </p>
        </div>

        {/* Transactions Section */}
        <div className="space-y-8">
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
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Similar Properties?</h2>
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

export default ClosedTransactions;

