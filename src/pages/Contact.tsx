import { Mail, Phone, MapPin, Clock, Building2, Briefcase, Send, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Contact = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/50 to-background pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
              Get in Touch
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Let's Start a Conversation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to buy, sell, or learn more about our services, 
              we're here to help you achieve your commercial real estate goals.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Forms Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Commercial Real Estate Form */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Commercial Real Estate</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Inquiries about property sales, leasing, and investments
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ContactForm hideHeader={true} />
              </CardContent>
            </Card>

            {/* Business Brokerage Form */}
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl shadow-lg">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent border-b">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Business Brokerage</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Questions about buying or selling a business
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <ContactForm hideHeader={true} />
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Commercial Real Estate Division */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 shadow-lg bg-gradient-to-br from-background to-accent/20">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2.5 bg-primary rounded-lg">
                    <Building2 className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">Commercial Real Estate</CardTitle>
                </div>
                <CardDescription>Division Contact Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Phone</div>
                    <a
                      href="tel:3605550100"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors block"
                    >
                      (360) 555-0100
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Email</div>
                    <a
                      href="mailto:commercial@kulshan.com"
                      className="text-base font-medium text-foreground hover:text-primary transition-colors break-all"
                    >
                      commercial@kulshan.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Office Location</div>
                    <p className="text-base text-foreground leading-relaxed">
                      123 Commercial Street
                      <br />
                      Suite 200
                      <br />
                      Bellingham, WA 98225
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Business Hours</div>
                    <p className="text-base text-foreground leading-relaxed">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Saturday: By Appointment
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* B2B Business Brokerage Division */}
            <Card className="border-2 hover:shadow-xl transition-all duration-300 shadow-lg bg-gradient-to-br from-background to-accent/20">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2.5 bg-primary rounded-lg">
                    <Briefcase className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-xl">Business Brokerage</CardTitle>
                </div>
                <CardDescription>Division Contact Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Phone</div>
                    <a
                      href="tel:3605550200"
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors block"
                    >
                      (360) 555-0200
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Email</div>
                    <a
                      href="mailto:brokerage@kulshan.com"
                      className="text-base font-medium text-foreground hover:text-primary transition-colors break-all"
                    >
                      brokerage@kulshan.com
                    </a>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Office Location</div>
                    <p className="text-base text-foreground leading-relaxed">
                      123 Commercial Street
                      <br />
                      Suite 210
                      <br />
                      Bellingham, WA 98225
                    </p>
                  </div>
                </div>

                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-muted-foreground mb-1">Business Hours</div>
                    <p className="text-base text-foreground leading-relaxed">
                      Monday - Friday: 9:00 AM - 5:00 PM
                      <br />
                      Consultations: By Appointment Only
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Response</h3>
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Get professional advice from our experienced team
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl cursor-pointer group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Book appointments that work with your schedule
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="relative bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 text-center text-white overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your commercial real estate goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100 shadow-lg" asChild>
                <a href="tel:3605550100">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Us Now
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10" asChild>
                <a href="mailto:commercial@kulshan.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Send an Email
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
