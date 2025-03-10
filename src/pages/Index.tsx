
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Car, Clock, Shield, CreditCard, Calendar, MapPin } from "lucide-react";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* How It Works Section (padding top for the booking panel) */}
      <section className="pt-32 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Renting a car with DriveEasy is simple and straightforward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Car</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our wide selection of vehicles and choose the perfect one for your needs.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in" style={{ animationDelay: "150ms" }}>
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Book Your Dates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your pickup and return dates to secure your reservation.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-scale-in" style={{ animationDelay: "300ms" }}>
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pick Up Your Car</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visit our location, complete the paperwork, and drive away in your rental.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <FeaturedCars />

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose DriveEasy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We offer more than just car rentals – we provide peace of mind and exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 glass-card rounded-xl animate-fade-in">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our customer support team is available around the clock to assist you with any issues.
              </p>
            </div>

            <div className="p-6 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "150ms" }}>
              <CreditCard className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transparent pricing with no surprise charges. What you see is what you pay.
              </p>
            </div>

            <div className="p-6 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Car className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Quality Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our fleet is regularly maintained and includes the latest models for your comfort.
              </p>
            </div>

            <div className="p-6 glass-card rounded-xl animate-fade-in" style={{ animationDelay: "450ms" }}>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fully Insured</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our vehicles come with comprehensive insurance for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511527844023-169bf3cc0253?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3" 
            alt="Driving experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready for Your Next Journey?</h2>
            <p className="text-lg text-white/90">
              Experience the freedom of the open road with our premium car rental service. Book your vehicle today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/cars">
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Cars
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto bg-white/10 border-white hover:bg-white hover:text-gray-900 text-white"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
