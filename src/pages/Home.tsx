import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Users, Loader2 } from "lucide-react";
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
import { useListings, usePreviousDeals } from "@/hooks/useListings";

const Home = () => {
  const { data: currentListings = [], isLoading: isLoadingListings } = useListings();
  const { data: closedTransactions = [], isLoading: isLoadingDeals } = usePreviousDeals();

  // Limit to first 8 listings for carousel display
  const displayedListings = currentListings.slice(0, 8);
  const displayedDeals = closedTransactions.slice(0, 8);

  const isLoading = isLoadingListings || isLoadingDeals;

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

          {isLoadingListings ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : displayedListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No listings available at this time.</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: displayedListings.length > 4,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {displayedListings.map((property) => (
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
          )}
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

          {isLoadingDeals ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : displayedDeals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No closed transactions to display at this time.</p>
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                loop: displayedDeals.length > 4,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {displayedDeals.map((property) => (
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
