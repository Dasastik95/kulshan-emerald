import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Award, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import CompactPropertyCard from "@/components/CompactPropertyCard";
import ClosedTransactionModal from "@/components/ClosedTransactionModal";
import CurrentListingModal from "@/components/CurrentListingModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import heroImage from "@/assets/hero-image.jpg";
import { 
  useKulshanCommercialCurrent,
  useB2BBusinessBrokersCurrent,
  useKulshanCommercialPrevious,
  useB2BBusinessBrokersPrevious
} from "@/hooks/useListings";

const Home = () => {
  // Fetch data from different collections
  const { data: kulshanCurrentListings = [], isLoading: isLoadingKulshanCurrent } = useKulshanCommercialCurrent();
  const { data: b2bCurrentListings = [], isLoading: isLoadingB2BCurrent } = useB2BBusinessBrokersCurrent();
  const { data: kulshanClosedTransactions = [], isLoading: isLoadingKulshanPrevious } = useKulshanCommercialPrevious();
  const { data: b2bClosedTransactions = [], isLoading: isLoadingB2BPrevious } = useB2BBusinessBrokersPrevious();
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<any | null>(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);

  // Limit to first 8 listings for carousel display
  const displayedKulshanCurrentListings = kulshanCurrentListings.slice(0, 8);
  const displayedB2BCurrentListings = b2bCurrentListings.slice(0, 8);
  const displayedKulshanClosedDeals = kulshanClosedTransactions.slice(0, 8);
  const displayedB2BClosedDeals = b2bClosedTransactions.slice(0, 8);

  const isLoadingKulshanListings = isLoadingKulshanCurrent;
  const isLoadingB2BListings = isLoadingB2BCurrent;
  const isLoadingKulshanDeals = isLoadingKulshanPrevious;
  const isLoadingB2BDeals = isLoadingB2BPrevious;

  const handleClosedTransactionClick = (property: any) => {
    const transactionId = property.id || property._id || property.docId;
    if (transactionId) {
      setSelectedTransaction(property);
      setSelectedTransactionId(String(transactionId));
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransactionId(null);
    setSelectedTransaction(null);
  };

  const handleCurrentListingClick = (property: any) => {
    const listingId = property.id || property._id || property.docId;
    if (listingId) {
      setSelectedListing(property);
      setSelectedListingId(String(listingId));
      setIsListingModalOpen(true);
    }
  };

  const handleCloseListingModal = () => {
    setIsListingModalOpen(false);
    setSelectedListingId(null);
    setSelectedListing(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/20 border border-primary/30 rounded-full">
              <span className="text-sm font-semibold text-primary-foreground">Serving the Pacific Northwest Since 2014</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Real Estate <span className="text-primary">Elevated</span>
            </h1>
          <p className="text-xl md:text-2xl mb-4 text-neutral-100 max-w-3xl mx-auto  leading-relaxed">
            Premier commercial real estate and business brokerage services delivering results that exceed expectations
          </p>
          <p className="text-lg md:text-xl mb-8  text-neutral-200/90 max-w-2xl mx-auto">
            Expert guidance • Local market knowledge • Proven track record
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg h-14 px-8" asChild>
              <Link to="/contact">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-white/10 border-white/30 text-white" asChild>
              <Link to="/listings/current">
                View Properties
              </Link>
            </Button>
          </div>
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
              <div className="text-4xl font-bold">40+</div>
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

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-background via-accent/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Kulshan Commercial</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We combine local expertise with proven strategies to deliver exceptional results for our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Local Expertise</h3>
              <p className="text-muted-foreground">Deep knowledge of the Pacific Northwest commercial real estate market with 40+ years of experience</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Client-Focused</h3>
              <p className="text-muted-foreground">Personalized service tailored to your unique goals with dedicated support throughout the process</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">$500M+ in successful transactions with a track record of maximizing value for clients</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Full-Service</h3>
              <p className="text-muted-foreground">From valuation to closing, we handle every aspect of your commercial real estate transaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What is your real estate worth today?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Get a professional valuation and discover your property's true potential. Our experienced team will provide you with a comprehensive market analysis and strategic guidance.
          </p>
          <Button size="lg" variant="secondary" className="text-lg h-14 px-8" asChild>
            <Link to="/contact">Schedule a Free Consultation</Link>
          </Button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive commercial real estate solutions tailored to your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Investment Property Sales</h3>
              <p className="text-muted-foreground mb-6">
                Expert representation for buyers and sellers of commercial investment properties including apartments, retail, office, and industrial assets.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Market analysis & valuation</li>
                <li>• Strategic marketing campaigns</li>
                <li>• Buyer/seller representation</li>
                <li>• Transaction coordination</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Business Brokerage</h3>
              <p className="text-muted-foreground mb-6">
                Confidential business sales services helping owners maximize value and ensuring smooth transitions for both buyers and sellers.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Business valuation services</li>
                <li>• Confidential marketing</li>
                <li>• Buyer qualification & vetting</li>
                <li>• Deal structuring & negotiation</li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-lg border-2 border-border hover:border-primary/50 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Advisory Services</h3>
              <p className="text-muted-foreground mb-6">
                Strategic guidance and market insights to help you make informed decisions about your commercial real estate investments.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Market research & analysis</li>
                <li>• Investment strategy consulting</li>
                <li>• Portfolio optimization</li>
                <li>• Development feasibility</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Current Listings & B2B Listings Side by Side */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Listings */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Current Listings</h2>
                  <p className="text-muted-foreground">
                    Explore our available commercial properties
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/listings">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {isLoadingKulshanListings ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : displayedKulshanCurrentListings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No listings available at this time.</p>
                </div>
              ) : (
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {displayedKulshanCurrentListings.map((property) => {
                      const listingId = property.id || property._id || property.docId;
                      return (
                        <CarouselItem key={listingId} className="basis-full">
                          <div className="p-1">
                            <CompactPropertyCard
                              {...property}
                              onClick={(e) => {
                                e.preventDefault();
                                handleCurrentListingClick(property);
                              }}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              )}
            </div>

            {/* B2B Listings */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">B2B Listings</h2>
                  <p className="text-muted-foreground">
                    Business opportunities available
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://b2bbusinessbrokers.com/listings" target="_blank" rel="noopener noreferrer">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {isLoadingB2BListings ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : displayedB2BCurrentListings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No listings available at this time.</p>
                </div>
              ) : (
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {displayedB2BCurrentListings.map((property) => {
                      const listingId = property.id || property._id || property.docId;
                      return (
                        <CarouselItem key={listingId} className="basis-full">
                          <div className="p-1">
                            <CompactPropertyCard
                              {...property}
                              onClick={(e) => {
                                e.preventDefault();
                                handleCurrentListingClick(property);
                              }}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Closed Transactions & B2B Closed Transactions Side by Side */}
      <section className="py-16 bg-gradient-to-br from-secondary via-accent/20 to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Closed Transactions */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Closed Transactions</h2>
                  <p className="text-muted-foreground">
                    Recent successful deals completed
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/listings/closed">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {isLoadingKulshanDeals ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : displayedKulshanClosedDeals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No closed transactions to display at this time.</p>
                </div>
              ) : (
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {displayedKulshanClosedDeals.map((property) => {
                      const transactionId = property.id || property._id || property.docId;
                      return (
                        <CarouselItem key={transactionId} className="basis-full">
                          <div className="p-1">
                            <CompactPropertyCard
                              {...property}
                              previous
                              onClick={(e) => {
                                e.preventDefault();
                                handleClosedTransactionClick(property);
                              }}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              )}
            </div>

            {/* B2B Closed Transactions */}
            <div>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">B2B Closed Transactions</h2>
                  <p className="text-muted-foreground">
                    Successful business sales completed
                  </p>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <a href="https://b2bbusinessbrokers.com/Representative-Transactions" target="_blank" rel="noopener noreferrer">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              {isLoadingB2BDeals ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : displayedB2BClosedDeals.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No closed transactions to display at this time.</p>
                </div>
              ) : (
                <Carousel
                  opts={{
                    align: "center",
                    loop: true,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {displayedB2BClosedDeals.map((property) => {
                      const transactionId = property.id || property._id || property.docId;
                      return (
                        <CarouselItem key={transactionId} className="basis-full">
                          <div className="p-1">
                            <CompactPropertyCard
                              {...property}
                              previous
                              onClick={(e) => {
                                e.preventDefault();
                                handleClosedTransactionClick(property);
                              }}
                            />
                          </div>
                        </CarouselItem>
                      );
                    })}
                  </CarouselContent>
                </Carousel>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Closed Transaction Modal */}
      <ClosedTransactionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transactionId={selectedTransactionId}
        cachedTransaction={selectedTransaction}
        allTransactions={[...kulshanClosedTransactions, ...b2bClosedTransactions]}
      />

      {/* Current Listing Modal */}
      <CurrentListingModal
        isOpen={isListingModalOpen}
        onClose={handleCloseListingModal}
        listingId={selectedListingId}
        cachedListing={selectedListing}
        allListings={[...kulshanCurrentListings, ...b2bCurrentListings]}
      />
    </div>
  );
};

export default Home;
