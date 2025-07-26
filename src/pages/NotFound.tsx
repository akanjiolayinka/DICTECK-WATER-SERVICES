
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-water-blue/10 via-background to-water-light/20 dark:from-water-dark/20 dark:via-background dark:to-navy-deep/10">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="gradient-water hover:opacity-90">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-water-blue text-water-blue hover:bg-water-blue hover:text-white">
            <button onClick={() => window.history.back()} className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </Button>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Need help? <Link to="/contact" className="text-water-blue hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
