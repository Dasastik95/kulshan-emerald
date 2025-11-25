import { Link } from "react-router-dom";
import { FileText, Shield, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";

const NDA = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Non-Disclosure Agreement (NDA)</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Protecting confidential information in commercial real estate and business transactions
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Information Cards */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <CardTitle>Why an NDA is Required</CardTitle>
                </div>
                <CardDescription>
                  Understanding the importance of confidentiality in our business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  At Kulshan Commercial, we handle sensitive financial, operational, and proprietary
                  information for both commercial real estate transactions and business brokerage
                  services. To protect all parties involved, we require a Non-Disclosure Agreement
                  (NDA) before sharing detailed property information, financial data, or business
                  details.
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold">What information is protected:</h4>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li>Financial statements and operating data</li>
                    <li>Property details and due diligence materials</li>
                    <li>Business operations and proprietary information</li>
                    <li>Tenant information and lease terms</li>
                    <li>Strategic plans and market analyses</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <CardTitle>How to Request an NDA</CardTitle>
                </div>
                <CardDescription>
                  Simple steps to access confidential information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Contact Our Team</h4>
                      <p className="text-muted-foreground">
                        Reach out to us through the form below or contact us directly to express
                        your interest in a property or business opportunity.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Complete the NDA</h4>
                      <p className="text-muted-foreground">
                        We'll send you our standard NDA form. Review and sign it electronically or
                        return a signed copy to our office.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Access Information</h4>
                      <p className="text-muted-foreground">
                        Once the NDA is executed, we'll provide you with detailed information about
                        the property or business opportunity you're interested in.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">How long does it take to execute an NDA?</h4>
                  <p className="text-muted-foreground">
                    Typically, NDAs can be executed within 1-2 business days. We offer electronic
                    signing for your convenience.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Is the NDA mutual?</h4>
                  <p className="text-muted-foreground">
                    Yes, our standard NDA is mutual, meaning both parties agree to protect each
                    other's confidential information.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I review properties without an NDA?</h4>
                  <p className="text-muted-foreground">
                    Basic property information is available publicly. However, detailed financial
                    data, operating statements, and proprietary business information require a
                    signed NDA.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What if I'm working with multiple properties?</h4>
                  <p className="text-muted-foreground">
                    One NDA covers all properties and opportunities you may be interested in
                    exploring with us.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Sidebar */}
          <div className="space-y-6">
            <ContactForm
              title="Request an NDA"
              subtitle="Fill out the form to get started with the NDA process. We'll send you the NDA form and guide you through it."
            />

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <a
                      href="tel:3605550100"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (360) 555-0100
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Email</div>
                    <a
                      href="mailto:nda@kulshan.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      nda@kulshan.com
                    </a>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-4">
                    For urgent NDA requests or questions, please call our office during business
                    hours.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-primary text-white rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Opportunities?</h2>
          <p className="text-xl mb-6 text-primary-foreground/90">
            Start the process by requesting an NDA today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/listings/current">View Current Listings</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NDA;

