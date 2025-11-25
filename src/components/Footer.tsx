import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img 
              src="/KCIREElevatedLogo.png" 
              alt="Kulshan Commercial - Real Estate Elevated" 
              className="h-16 w-auto"
            />
            <p className="text-neutral-100 text-sm">
              Real Estate Elevated
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/listings" className="text-neutral-100 hover:text-primary transition-colors">
                  Current Listings
                </Link>
              </li>
              <li>
                <Link to="/listings/closed" className="text-neutral-100 hover:text-primary transition-colors">
                  Closed Transactions
                </Link>
              </li>
              <li>
                <Link to="/business-brokerage" className="text-neutral-100 hover:text-primary transition-colors">
                  Business Brokerage
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-neutral-100 hover:text-primary transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Commercial Division */}
          <div>
            <h4 className="font-semibold mb-4">Commercial Real Estate</h4>
            <ul className="space-y-2 text-sm text-neutral-100">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(360) 555-0100</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:commercial@kulshan.com" className="hover:text-primary transition-colors">
                  commercial@kulshan.com
                </a>
              </li>
            </ul>
          </div>

          {/* B2B Division */}
          <div>
            <h4 className="font-semibold mb-4">Business Brokerage</h4>
            <ul className="space-y-2 text-sm text-neutral-100">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>(360) 555-0200</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:brokerage@kulshan.com" className="hover:text-primary transition-colors">
                  brokerage@kulshan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-sm text-center text-neutral-100">
          <p>&copy; {new Date().getFullYear()} Kulshan Commercial. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
