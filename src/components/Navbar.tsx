import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    {
      to: "/listings",
      label: "Listings",
      children: [
        { to: "/listings/current", label: "Current Listings" },
        { to: "/listings/closed", label: "Closed Transactions" },
      ],
    },
    { to: "/business-brokerage", label: "Business Brokerage" },
    { to: "/team", label: "Team" },
    { to: "/nda", label: "NDA" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">

      {/* Logo - flush left corner */}
      <div className="absolute left-0 top-0 h-14 flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="Kulshan Commercial logo" className="h-14 sm:h-20 w-auto object-contain" />
        </Link>
      </div>

      {/* Actions - flush right corner (CTA + mobile menu) */}
      <div className="absolute right-0 top-0 h-14 flex items-center">
        <div className="hidden md:block mr-2">
          <Button asChild size="sm">
            <Link to="/contact">Get Started</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 justify-center px-4 md:px-20 lg:px-28">
          {/* Center: Navigation links */}
          <div className="hidden md:flex justify-center items-center space-x-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.to} className="relative group">
                  <NavLink
                    to={link.to}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent inline-flex items-center"
                    activeClassName="text-primary bg-accent"
                  >
                    {link.label}
                  </NavLink>

                  {/* Dropdown (shows on hover via group) */}
                  <div className="absolute right-0 top-full -mt-1 w-48 pt-3 z-50">
                    <div className="bg-background border border-border rounded-md shadow-lg py-1 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out transform origin-top-right">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                          activeClassName="text-primary bg-accent"
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent"
                  activeClassName="text-primary bg-accent"
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          </div>
        </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    activeClassName="text-primary bg-accent"
                  >
                    {link.label}
                  </NavLink>
                  <div className="pl-4 mt-1 space-y-1">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                        activeClassName="text-primary bg-accent"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                  activeClassName="text-primary bg-accent"
                >
                  {link.label}
                </NavLink>
              )
            )}
            <Button asChild className="w-full mt-4">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
