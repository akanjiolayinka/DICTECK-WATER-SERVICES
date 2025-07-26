
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Send, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service: "",
    message: ""
  });
  const { toast } = useToast();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.service) {
      toast({
        title: "Please fill in all required fields",
        description: "All marked fields are required to submit your quote request.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Quote request submitted successfully!",
      description: "Thank you for your request. We'll contact you within 24 hours with a detailed quote.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      service: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      service: value
    });
  };

  const services = [
    "Borehole Drilling (Manual)",
    "Borehole Drilling (Machine)",
    "Industrial Borehole",
    "Swimming Pool Construction",
    "Water Fountain Installation",
    "Water Treatment System",
    "Pump Installation & Repair",
    "Borehole Rehabilitation",
    "Multiple Services"
  ];

  const benefits = [
    "Free site assessment and consultation",
    "Detailed project timeline and cost breakdown",
    "Quality materials and equipment guarantee",
    "Professional installation and testing",
    "One-year warranty on all work",
    "24/7 customer support after completion"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Request a Quote
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get a free, detailed quote for your water service project. 
              Our experts will provide a comprehensive assessment and competitive pricing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Project Details</CardTitle>
                  <p className="text-muted-foreground">
                    Please provide detailed information about your project to help us give you an accurate quote.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number *
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="w-full"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium mb-2">
                          Project Location *
                        </label>
                        <Input
                          id="location"
                          name="location"
                          type="text"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="City, State"
                          className="w-full"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2">
                        Service Required *
                      </label>
                      <Select onValueChange={handleSelectChange} value={formData.service}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select the service you need" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Project Description
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please provide additional details about your project, specific requirements, timeline, etc."
                        className="w-full min-h-[120px] resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gradient-water hover:opacity-90 text-lg py-3"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Submit Quote Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* What's Included */}
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">What's Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-water-blue flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    For urgent projects or immediate assistance, call us directly.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      asChild 
                      className="w-full gradient-water hover:opacity-90"
                    >
                      <a href="tel:+2348033329232" className="flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Call: +234 803 332 9232</span>
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    >
                      <a href="https://wa.me/2348033329232" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.04 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.5 13.5c-.25.69-.98 1.23-1.68 1.31-.48.06-.88-.12-2.93-1.25-1.75-.96-2.87-2.74-2.96-2.87-.09-.13-.72-.96-.72-1.83s.45-1.29.61-1.47c.16-.18.35-.22.47-.22.12 0 .24.01.34.01.11 0 .26-.04.4.31.16.37.54 1.32.59 1.42.05.1.08.21.02.34-.07.13-.1.21-.2.32-.1.11-.21.25-.3.33-.1.09-.2.19-.09.37.11.18.5.82 1.07 1.33.73.65 1.34.85 1.53.95.19.1.3.08.41-.05.11-.13.47-.55.59-.74.12-.19.25-.16.42-.09.17.07 1.1.52 1.29.61.19.09.32.14.37.22.05.08.05.47-.2 1.16z"/>
                        </svg>
                        <span>WhatsApp Chat</span>
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Response time: Within 2 hours during business hours
                  </p>
                </CardContent>
              </Card>

              {/* Service Areas */}
              <Card className="animate-on-scroll">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Service Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Lagos State</div>
                    <div>• Oyo State (Ibadan)</div>
                    <div>• Ogun State</div>
                    <div>• Osun State</div>
                    <div>• Kwara State</div>
                    <div>• And surrounding areas</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Don't see your location? Contact us - we may still be able to help!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Quote;
