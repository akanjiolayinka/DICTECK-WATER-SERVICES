
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

const Gallery = () => {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<any>(null);

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

  const projects = [
    {
      id: 1,
      title: "Residential Borehole - Lagos",
      category: "borehole",
      location: "Lagos State",
      description: "150-meter deep borehole with submersible pump installation",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Swimming Pool Construction - Abuja",
      category: "pool",
      location: "Abuja FCT",
      description: "Olympic-size swimming pool with modern filtration system",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Garden Water Fountain - Ibadan",
      category: "fountain",
      location: "Oyo State",
      description: "Three-tier decorative fountain with LED lighting",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Industrial Borehole - Kano",
      category: "borehole",
      location: "Kano State",
      description: "High-capacity industrial borehole for manufacturing plant",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Resort Pool Complex - Port Harcourt",
      category: "pool",
      location: "Rivers State",
      description: "Multi-level pool complex with infinity edge design",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Commercial Water Treatment Plant",
      category: "treatment",
      location: "Lagos State",
      description: "Complete water treatment system for hotel complex",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=400&fit=crop"
    },
    {
      id: 7,
      title: "Residential Pool - Kaduna",
      category: "pool",
      location: "Kaduna State",
      description: "Custom kidney-shaped pool with spa features",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop"
    },
    {
      id: 8,
      title: "Corporate Office Fountain",
      category: "fountain",
      location: "Lagos State",
      description: "Modern architectural fountain for office building entrance",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop"
    }
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "borehole", name: "Boreholes" },
    { id: "pool", name: "Swimming Pools" },
    { id: "fountain", name: "Water Fountains" },
    { id: "treatment", name: "Water Treatment" }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-on-scroll">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Project Gallery
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our completed projects showcasing quality water solutions 
              across Nigeria. Each project represents our commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 animate-on-scroll">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={
                  filter === category.id 
                    ? "gradient-water hover:opacity-90" 
                    : "border-water-blue text-water-blue hover:bg-water-blue hover:text-white"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="animate-on-scroll hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden"
                onClick={() => setSelectedImage(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-lg font-semibold mb-1">View Details</div>
                      <div className="text-sm">Click to enlarge</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-water-blue font-medium mb-2 text-sm">
                    {project.location}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-water-blue transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                <p className="text-water-blue font-medium mb-2">{selectedImage.location}</p>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;
