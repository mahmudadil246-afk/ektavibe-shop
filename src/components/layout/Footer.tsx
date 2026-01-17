import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-serif text-3xl font-medium mb-4">
              ekt<span className="text-accent">A</span>
            </h2>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Timeless fashion for the modern family. Crafted with care, designed to last.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link to="/shop/women" className="hover:text-accent transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/shop/men" className="hover:text-accent transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/shop/baby" className="hover:text-accent transition-colors">
                  Baby
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-accent transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/sale" className="hover:text-accent transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Subscribe for exclusive offers and 10% off your first order.
            </p>
            <form className="flex gap-2">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 pl-10 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
                />
              </div>
              <button
                type="submit"
                className="bg-accent text-accent-foreground px-4 py-2.5 text-sm font-medium tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2026 ektA. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
