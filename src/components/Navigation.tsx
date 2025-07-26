
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Droplets, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-water-blue to-water-dark p-2 rounded-lg group-hover:scale-105 transition-transform">
                <Droplets className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gradient">Dicteck</span>
                <div className="text-sm text-muted-foreground">Water Services</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-water-blue relative ${
                    isActive(item.path)
                      ? "text-water-blue"
                      : "text-foreground/80"
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-water-blue rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="hover:bg-water-light dark:hover:bg-water-dark/20"
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white"
              >
                <Link to="/quote">Get Quote</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="gradient-water hover:opacity-90"
              >
                <a href="tel:+2348033329232" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-water-blue"
                      : "text-foreground hover:text-water-blue"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3">
                <Link to="/quote" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full border-water-blue text-water-blue hover:bg-water-blue hover:text-white"
                  >
                    Get Quote
                  </Button>
                </Link>
                <a href="tel:+2348033329232">
                  <Button className="w-full gradient-water hover:opacity-90">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2348033329232"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.04 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.5 13.5c-.25.69-.98 1.23-1.68 1.31-.48.06-.88-.12-2.93-1.25-1.75-.96-2.87-2.74-2.96-2.87-.09-.13-.72-.96-.72-1.83s.45-1.29.61-1.47c.16-.18.35-.22.47-.22.12 0 .24.01.34.01.11 0 .26-.04.4.31.16.37.54 1.32.59 1.42.05.1.08.21.02.34-.07.13-.1.21-.2.32-.1.11-.21.25-.3.33-.1.09-.2.19-.09.37.11.18.5.82 1.07 1.33.73.65 1.34.85 1.53.95.19.1.3.08.41-.05.11-.13.47-.55.59-.74.12-.19.25-.16.42-.09.17.07 1.1.52 1.29.61.19.09.32.14.37.22.05.08.05.47-.2 1.16z"/>
        </svg>
      </a>
    </>
  );
};

export default Navigation;
