import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";

const Contact = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're looking to buy, sell, or learn more about our services, we're here to
            help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Forms */}
          <div className="space-y-8">
            <ContactForm
              title="Commercial Real Estate"
              subtitle="Inquiries about property sales, leasing, and investments"
            />
            <ContactForm
              title="Business Brokerage"
              subtitle="Questions about buying or selling a business"
            />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Commercial Real Estate Division</h3>
                <div className="space-y-4">
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
                        href="mailto:commercial@kulshan.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        commercial@kulshan.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Office Location</div>
                      <p className="text-muted-foreground">
                        123 Commercial Street
                        <br />
                        Suite 200
                        <br />
                        Bellingham, WA 98225
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Saturday: By Appointment
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">B2B Business Brokerage Division</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <a
                        href="tel:3605550200"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (360) 555-0200
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a
                        href="mailto:brokerage@kulshan.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        brokerage@kulshan.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Office Location</div>
                      <p className="text-muted-foreground">
                        123 Commercial Street
                        <br />
                        Suite 210
                        <br />
                        Bellingham, WA 98225
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Business Hours</div>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM
                        <br />
                        Consultations: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
