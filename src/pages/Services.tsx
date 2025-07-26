
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Droplets, Waves, Settings, Wrench } from "lucide-react";

const Services = () => {
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
      icon: <Droplets className="h-12 w-12 text-water-blue" />,
      description: "Professional water borehole drilling using modern equipment including Hydra, DTH, and motorized drilling rigs.",
      features: [
        "Manual and machine drilling options",
        "Depth testing and water quality analysis",
        "Pump installation and maintenance",
        "Borehole rehabilitation services"
      ],
      pricing: "From ₦150,000"
    },
    {
      title: "Industrial Boreholes",
      icon: <Settings className="h-12 w-12 text-water-blue" />,
      description: "Large-scale borehole solutions for industrial and commercial applications with high-capacity water supply.",
      features: [
        "High-capacity drilling equipment",
        "Industrial-grade pump systems",
        "Water storage tank installation",
        "Ongoing maintenance contracts"
      ],
      pricing: "Quote on request"
    },
    {
      title: "Swimming Pool Construction",
      icon: <Waves className="h-12 w-12 text-water-blue" />,
      description: "Custom swimming pool design and construction for residential and commercial properties.",
      features: [
        "Custom pool design and planning",
        "Excavation and construction",
        "Filtration system installation",
        "Pool maintenance services"
      ],
      pricing: "From ₦2,500,000"
    },
    {
      title: "Water Fountain Installation",
      icon: <span className="text-4xl">⛲</span>,
      description: "Beautiful water fountain design and installation for gardens, courtyards, and commercial spaces.",
      features: [
        "Custom fountain design",
        "Pump and lighting systems",
        "Water circulation setup",
        "Maintenance and repair services"
      ],
      pricing: "From ₦200,000"
    },
    {
      title: "Water Treatment Systems",
      icon: <Wrench className="h-12 w-12 text-water-blue" />,
      description: "Advanced water filtration and treatment systems to ensure clean, safe drinking water.",
      features: [
        "Water quality testing and analysis",
        "Filtration system design",
        "Installation and commissioning",
        "Regular maintenance and filter replacement"
      ],
      pricing: "From ₦80,000"
    },
    {
      title: "Pump Installation & Repair",
      icon: <span className="text-4xl">⚙️</span>,
      description: "Professional pump installation, repair, and maintenance services for all water systems.",
      features: [
        "Submersible and surface pumps",
        "Pump sizing and selection",
        "Installation and commissioning",
        "Emergency repair services"
      ],
      pricing: "From ₦50,000"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Our Water Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive water solutions from borehole drilling to swimming pool construction. 
              Quality service backed by over 20 years of experience.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="animate-on-scroll hover:shadow-xl transition-all duration-300 group hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-water-blue rounded-full flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">Starting from</span>
                      <span className="text-lg font-semibold text-water-blue">
                        {service.pricing}
                      </span>
                    </div>
                    <Button asChild className="w-full gradient-water hover:opacity-90">
                      <Link to="/quote" className="flex items-center justify-center space-x-2">
                        <span>Get Quote</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your water project completed efficiently and professionally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", description: "Free site assessment and project consultation" },
              { step: "2", title: "Planning", description: "Detailed project planning and quote preparation" },
              { step: "3", title: "Execution", description: "Professional installation with quality materials" },
              { step: "4", title: "Support", description: "Ongoing maintenance and customer support" }
            ].map((item, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="w-16 h-16 bg-gradient-to-br from-water-blue to-water-dark text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and detailed quote for your water service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-water hover:opacity-90 text-lg px-8 py-3">
                <Link to="/quote" className="flex items-center space-x-2">
                  <span>Request Quote</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white text-lg px-8 py-3">
                <Link to="/contact">Contact Us</Link>
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

export default Services;
