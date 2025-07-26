
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your message.",
        variant: "destructive",
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message sent successfully!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-water-blue" />,
      title: "Phone Numbers",
      details: ["+234 812 345 6789", "+234 901 234 5678"],
      action: "tel:+2348123456789"
    },
    {
      icon: <Mail className="h-6 w-6 text-water-blue" />,
      title: "Email Addresses",
      details: ["info@dicteckwater.com", "services@dicteckwater.com"],
      action: "mailto:info@dicteckwater.com"
    },
    {
      icon: <MapPin className="h-6 w-6 text-water-blue" />,
      title: "Office Address",
      details: ["123 Water Street", "Ibadan, Oyo State, Nigeria"],
      action: "https://maps.google.com"
    },
    {
      icon: <Clock className="h-6 w-6 text-water-blue" />,
      title: "Business Hours",
      details: ["Monday - Friday: 8:00 AM - 6:00 PM", "Saturday: 9:00 AM - 4:00 PM"],
      action: null
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
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our water services experts. We're here to help with 
              all your water-related needs across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="animate-on-scroll text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="font-semibold mb-3 text-foreground">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <div key={idx} className="text-muted-foreground text-sm">
                        {info.action && idx === 0 ? (
                          <a href={info.action} className="hover:text-water-blue transition-colors">
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="animate-on-scroll">
              <CardHeader>
                <CardTitle className="text-2xl text-gradient">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry"
                      className="w-full min-h-[120px] resize-none"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-water hover:opacity-90 text-lg py-3"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map and Additional Info */}
            <div className="animate-on-scroll space-y-6">
              {/* Map */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gradient">Our Location</h3>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-4 text-water-blue" />
                      <p className="text-lg font-medium">Interactive Map</p>
                      <p className="text-sm">123 Water Street, Ibadan, Oyo State</p>
                      <Button 
                        asChild 
                        variant="outline" 
                        className="mt-4 border-water-blue text-water-blue hover:bg-water-blue hover:text-white"
                      >
                        <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                          View on Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-gradient">Quick Contact</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <Button 
                        asChild 
                        className="flex-1 gradient-water hover:opacity-90"
                      >
                        <a href="tel:+2348123456789" className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>Call Now</span>
                        </a>
                      </Button>
                      <Button 
                        asChild 
                        variant="outline"
                        className="flex-1 border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      >
                        <a href="https://wa.me/2348123456789" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3.04 1.05 4.35L2 22l5.65-1.05C9.04 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.5 13.5c-.25.69-.98 1.23-1.68 1.31-.48.06-.88-.12-2.93-1.25-1.75-.96-2.87-2.74-2.96-2.87-.09-.13-.72-.96-.72-1.83s.45-1.29.61-1.47c.16-.18.35-.22.47-.22.12 0 .24.01.34.01.11 0 .26-.04.4.31.16.37.54 1.32.59 1.42.05.1.08.21.02.34-.07.13-.1.21-.2.32-.1.11-.21.25-.3.33-.1.09-.2.19-.09.37.11.18.5.82 1.07 1.33.73.65 1.34.85 1.53.95.19.1.3.08.41-.05.11-.13.47-.55.59-.74.12-.19.25-.16.42-.09.17.07 1.1.52 1.29.61.19.09.32.14.37.22.05.08.05.47-.2 1.16z"/>
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Available 24/7 for emergency water services
                    </p>
                  </div>
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

export default Contact;
