import { Link } from "react-router-dom";
import { CheckCircle2, TrendingUp, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import businessBrokerImage from "@/assets/business-broker.jpg";

const BusinessBrokerage = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Business Valuation",
      description:
        "Professional assessment of your business value using industry-standard methodologies.",
    },
    {
      icon: Shield,
      title: "Confidential Marketing",
      description:
        "Discreet marketing strategies to protect your business identity during the sales process.",
    },
    {
      icon: Users,
      title: "Buyer Qualification",
      description:
        "Thorough vetting of potential buyers to ensure they're serious and financially capable.",
    },
  ];

  const benefits = [
    "Maximize your business sale price",
    "Access to qualified buyers nationwide",
    "Professional transaction management",
    "Tax and legal guidance coordination",
    "Smooth transition planning",
    "Confidentiality maintained throughout",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[hsl(var(--red-primary))] to-[hsl(var(--red-dark))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Business Brokerage Services</h1>
            <p className="text-xl text-white/90 mb-8">
              Expert guidance for business owners looking to sell and entrepreneurs seeking
              acquisition opportunities
            </p>
            <Button size="lg" className="bg-white text-[hsl(var(--red-primary))] hover:bg-neutral-50" asChild>
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Your Trusted B2B Business Brokers
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Selling a business is one of the most significant decisions you'll make as an
                owner. Our experienced team specializes in helping business owners navigate this
                complex process with confidence and discretion.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Whether you're planning to retire, pursue new opportunities, or simply ready for
                a change, we provide the expertise and resources needed to maximize your business
                value and ensure a successful transition.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-[hsl(var(--red-primary))] flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={businessBrokerImage}
                alt="Business Brokerage"
                className="rounded-lg shadow-xl w-full border-4 border-[hsl(var(--red-primary))]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support throughout your business transition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-2 border-[hsl(var(--red-light))] hover:border-[hsl(var(--red-primary))] transition-colors">
                <CardContent className="p-6 text-center">
                  <service.icon className="h-12 w-12 text-[hsl(var(--red-primary))] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning Ahead Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900">
            Plan Ahead to Sell Your Business
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            The best time to start planning your business exit is well before you're ready to
            sell. Strategic preparation can significantly increase your business value and ensure
            a smoother transition when the time comes.
          </p>
          <div className="bg-[hsl(var(--red-light))] border-2 border-[hsl(var(--red-primary))] p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Ready to Start the Conversation?</h3>
            <p className="text-muted-foreground mb-6">
              Whether you're planning to sell in 6 months or 5 years, we can help you prepare
              and position your business for maximum value.
            </p>
            <Button size="lg" className="bg-[hsl(var(--red-primary))] text-white hover:bg-[hsl(var(--red-dark))]" asChild>
              <Link to="/contact">Let's Talk About It</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* B2B Listings Link */}
      <section className="py-12 bg-[hsl(var(--red-primary))] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Explore Available Business Opportunities
          </h3>
          <p className="text-xl text-white/90 mb-6">
            Browse our current portfolio of businesses for sale
          </p>
          <Button size="lg" className="bg-white text-[hsl(var(--red-primary))] hover:bg-neutral-50" asChild>
            <Link to="/listings">View Business Listings</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BusinessBrokerage;
