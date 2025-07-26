
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, Clock, Target, Heart, Shield } from "lucide-react";

const About = () => {
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

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-water-blue" />,
      title: "Reliability",
      description: "Consistent quality and dependable service you can trust"
    },
    {
      icon: <Heart className="h-8 w-8 text-water-blue" />,
      title: "Care",
      description: "We care about our customers and their water needs"
    },
    {
      icon: <Award className="h-8 w-8 text-water-blue" />,
      title: "Excellence",
      description: "Committed to delivering the highest quality work"
    },
    {
      icon: <Target className="h-8 w-8 text-water-blue" />,
      title: "Precision",
      description: "Accurate work with attention to every detail"
    }
  ];

  const team = [
    {
      name: "Chief Engineer",
      role: "Lead Drilling Specialist",
      experience: "15+ years experience",
    },
    {
      name: "Project Manager",
      role: "Construction Supervisor",
      experience: "12+ years experience",
    },
    {
      name: "Technical Lead",
      role: "Water Treatment Expert",
      experience: "10+ years experience",
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
              About Dicteck Water Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A family-owned business dedicated to providing reliable water solutions 
              across Nigeria for over two decades.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2004, Dicteck Water Services began as a small family business 
                  with a simple mission: to provide clean, reliable water access to communities 
                  across Nigeria. What started with a single borehole drilling rig has grown 
                  into a comprehensive water services company.
                </p>
                <p>
                  Over the years, we've expanded our services to include swimming pool construction, 
                  water fountain installations, and advanced water treatment systems. Our commitment 
                  to quality and customer satisfaction has made us a trusted name in the industry.
                </p>
                <p>
                  Today, we're proud to have completed over 500 projects, from residential 
                  boreholes to large-scale industrial water systems. Every project reflects 
                  our dedication to excellence and our passion for providing life-essential water services.
                </p>
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="bg-gradient-to-br from-water-blue/10 to-water-light/30 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-water-blue mb-2">2004</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-water-blue mb-2">500+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-water-blue mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-water-blue mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="animate-on-scroll">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-water-blue">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide reliable, affordable, and sustainable water solutions that 
                  improve the quality of life for our customers. We strive to deliver 
                  exceptional service with integrity, innovation, and a commitment to 
                  environmental responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-on-scroll">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-water-blue">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be Nigeria's leading water services company, recognized for our 
                  technical expertise, customer service excellence, and positive impact 
                  on communities. We envision a future where clean water access is 
                  universal and sustainable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Dicteck Water Services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="animate-on-scroll text-center hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
              Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Skilled professionals with decades of combined experience in water services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="animate-on-scroll text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-water-blue to-water-dark rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-water-blue font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
