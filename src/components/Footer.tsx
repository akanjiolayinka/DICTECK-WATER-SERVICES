
import { Link } from "react-router-dom";
import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-navy-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-water-blue p-2 rounded-lg">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold">Dicteck</div>
                <div className="text-sm text-gray-300">Water Services</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Over 20 years providing reliable water solutions across Nigeria. 
              From boreholes to swimming pools, we deliver quality with precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-water-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-water-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-water-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                Home
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                About Us
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                Services
              </Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                Gallery
              </Link>
              <Link to="/testimonials" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                Testimonials
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-water-blue transition-colors text-sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <div className="space-y-2">
              <div className="text-gray-300 text-sm">Borehole Drilling</div>
              <div className="text-gray-300 text-sm">Swimming Pool Construction</div>
              <div className="text-gray-300 text-sm">Water Fountain Installation</div>
              <div className="text-gray-300 text-sm">Water Treatment Systems</div>
              <div className="text-gray-300 text-sm">Industrial Boreholes</div>
              <div className="text-gray-300 text-sm">Pump Installation</div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-water-blue mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 text-sm">+234 803 332 9232</div>
                  <div className="text-gray-300 text-sm">+234 802 877 6193</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-water-blue mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-gray-300 text-sm">deleakanji84@gmail.com</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-water-blue mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  Oke Afa, Isolo,<br />
                  Lagos State, Nigeria
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Dicteck Water Services. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-water-blue transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-water-blue transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
