
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
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

  const testimonials = [
    {
      name: "Mrs. Adebayo Johnson",
      location: "Lagos State",
      service: "Residential Borehole",
      rating: 5,
      text: "Dicteck Water Services exceeded our expectations! They drilled a 120-meter borehole for our family compound, and the water quality is excellent. The team was professional, punctual, and completed the work within the promised timeframe. Highly recommended!",
      date: "March 2024"
    },
    {
      name: "Chief Emeka Okafor",
      location: "Anambra State",
      service: "Swimming Pool Construction",
      rating: 5,
      text: "Outstanding work on our swimming pool project! The design was exactly what we wanted, and the construction quality is top-notch. The filtration system works perfectly, and maintenance has been minimal. Thank you, Dicteck team!",
      date: "February 2024"
    },
    {
      name: "Dr. Fatima Ahmed",
      location: "Kano State",
      service: "Industrial Borehole",
      rating: 5,
      text: "We needed a high-capacity borehole for our manufacturing facility, and Dicteck delivered beyond expectations. The project was completed on schedule, and the water output meets our industrial requirements perfectly. Excellent service!",
      date: "January 2024"
    },
    {
      name: "Mr. Peter Okwu",
      location: "Rivers State",
      service: "Water Treatment System",
      rating: 5,
      text: "The water treatment system installed by Dicteck has transformed our water quality. The installation was seamless, and their team provided excellent training on system maintenance. Our family now enjoys clean, safe drinking water daily.",
      date: "December 2023"
    },
    {
      name: "Alhaji Musa Ibrahim",
      location: "Kaduna State",
      service: "Water Fountain Installation",
      rating: 5,
      text: "Beautiful water fountain installation at our mosque compound. The design is elegant, and the LED lighting creates a stunning effect at night. The Dicteck team was respectful and professional throughout the project.",
      date: "November 2023"
    },
    {
      name: "Mrs. Grace Okonkwo",
      location: "Enugu State",
      service: "Borehole Rehabilitation",
      rating: 5,
      text: "Our old borehole had been producing muddy water for months. Dicteck's team rehabilitated it perfectly - the water is now crystal clear and the flow rate has improved significantly. Great value for money!",
      date: "October 2023"
    },
    {
      name: "Engr. Tunde Afolabi",
      location: "Ogun State",
      service: "Swimming Pool + Borehole",
      rating: 5,
      text: "Dicteck handled our complete water project - both borehole drilling and swimming pool construction. Their coordination between both services was excellent, and we saved costs on the combined project. Truly professional!",
      date: "September 2023"
    },
    {
      name: "Pastor David Adeyemi",
      location: "Osun State",
      service: "Church Borehole Project",
      rating: 5,
      text: "Our church community now has access to clean water thanks to Dicteck. They completed the borehole project at a very reasonable cost and even provided free maintenance for the first year. God bless this team!",
      date: "August 2023"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Customer Testimonials
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Read what our satisfied customers say about our water services. 
              Their success stories drive our commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-on-scroll">
              <div className="text-3xl md:text-4xl font-bold text-water-blue mb-2">500+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-3xl md:text-4xl font-bold text-water-blue mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-3xl md:text-4xl font-bold text-water-blue mb-2">5.0</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-3xl md:text-4xl font-bold text-water-blue mb-2">20+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="animate-on-scroll hover:shadow-xl transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-water-blue/30 mr-2" />
                    <div className="flex space-x-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="border-t pt-4">
                    <div className="font-semibold text-foreground mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-water-blue mb-1">
                      {testimonial.location}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Service: {testimonial.service}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Join Our Happy Customers
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the same quality service that has made our customers happy. 
              Contact us today to start your water project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-water-blue to-water-dark rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Your Quote
              </a>
              <a
                href="tel:+2348123456789"
                className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-water-blue border border-water-blue rounded-lg hover:bg-water-blue hover:text-white transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Testimonials;
