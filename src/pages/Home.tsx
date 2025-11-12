import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImage from "@/assets/hero-image.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Home = () => {
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
      id: "3",
      title: "Industrial Warehouse",
      location: "Commerce Park",
      price: "3.5M",
      type: "Industrial",
      size: "50,000 SF",
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
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Real Estate <span className="text-primary">Elevated</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-neutral-100 max-w-3xl mx-auto">
            Premier commercial real estate and business brokerage services
          </p>
          <Button size="lg" className="text-lg h-14 px-8" asChild>
            <Link to="/contact">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-6 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <TrendingUp className="h-12 w-12 mx-auto" />
              <div className="text-4xl font-bold">$500M+</div>
              <div className="text-primary-foreground/90">Transactions Closed</div>
            </div>
            <div className="space-y-2">
              <Award className="h-12 w-12 mx-auto" />
              <div className="text-4xl font-bold">25+</div>
              <div className="text-primary-foreground/90">Years Experience</div>
            </div>
            <div className="space-y-2">
              <Users className="h-12 w-12 mx-auto" />
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-primary-foreground/90">Satisfied Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            What is your real estate worth today?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get a professional valuation and discover your property's true potential
          </p>
          <Button size="lg" className="text-lg h-14 px-8" asChild>
            <Link to="/contact">Let's Talk About It</Link>
          </Button>
        </div>
      </section>

      {/* Current Listings Slideshow */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Current Listings</h2>
              <p className="text-muted-foreground">
                Explore our available commercial properties
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/listings">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {currentListings.map((property) => (
                <CarouselItem key={property.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <PropertyCard {...property} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Closed Transactions Slideshow */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Closed Transactions</h2>
              <p className="text-muted-foreground">
                Recent successful deals we've completed
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/listings/closed">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {closedTransactions.map((property) => (
                <CarouselItem key={property.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <PropertyCard {...property} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Home;
