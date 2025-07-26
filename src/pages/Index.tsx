
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, Users, Award, Clock, Phone, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    const animateElements = document.querySelectorAll(".animate-on-scroll");
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Borehole Drilling",
      description: "Professional water borehole drilling with modern equipment",
      icon: "🚰",
    },
    {
      title: "Swimming Pools",
      description: "Custom swimming pool construction and maintenance",
      icon: "🏊",
    },
    {
      title: "Water Fountains",
      description: "Beautiful water fountain design and installation",
      icon: "⛲",
    },
    {
      title: "Water Treatment",
      description: "Advanced water filtration and treatment systems",
      icon: "💧",
    },
  ];

  const stats = [
    { number: "20+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10" />
        
        {/* Animated water droplets */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-water-blue/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">Dicteck Water Services</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Reliable Water. Built with Precision.
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Over 20 years providing clean water solutions across Nigeria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-water hover:opacity-90 text-lg px-8 py-3">
                <Link to="/quote" className="flex items-center space-x-2">
                  <span>Request a Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white text-lg px-8 py-3">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="text-3xl md:text-4xl font-bold text-water-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Water Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From residential boreholes to commercial water treatment systems, 
              we provide comprehensive water solutions tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="animate-on-scroll hover:shadow-lg transition-all duration-300 group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <Button asChild variant="outline" size="lg" className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white">
              <Link to="/services" className="flex items-center space-x-2">
                <span>View All Services</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Why Choose Dicteck?
              </h2>
              <div className="space-y-4">
                {[
                  "Over 20 years of proven experience",
                  "Modern drilling equipment and technology",
                  "Licensed and insured professionals",
                  "100% satisfaction guarantee",
                  "24/7 customer support",
                  "Competitive pricing with transparent quotes"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-water-blue flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Droplets className="h-12 w-12 text-water-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality Water</h3>
                  <p className="text-sm text-muted-foreground">Clean, safe, and reliable water solutions</p>
                </Card>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Users className="h-12 w-12 text-water-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Expert Team</h3>
                  <p className="text-sm text-muted-foreground">Skilled professionals with years of experience</p>
                </Card>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Award className="h-12 w-12 text-water-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quality Assured</h3>
                  <p className="text-sm text-muted-foreground">Guaranteed satisfaction on every project</p>
                </Card>
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <Clock className="h-12 w-12 text-water-blue mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Quick Service</h3>
                  <p className="text-sm text-muted-foreground">Fast response times and efficient completion</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team is ready to help you with all your water service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-water hover:opacity-90 text-lg px-8 py-3">
                <Link to="/quote" className="flex items-center space-x-2">
                  <span>Get Free Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white text-lg px-8 py-3">
                <a href="tel:+2348123456789" className="flex items-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
