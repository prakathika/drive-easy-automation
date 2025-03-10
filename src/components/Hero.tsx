
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Check } from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slides data with beautiful car images
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Premium Car Rental Experience",
      subtitle: "Drive in style with our luxury fleet",
    },
    {
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Affordable Luxury Cars",
      subtitle: "Experience luxury without breaking the bank",
    },
    {
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      title: "Seamless Booking Process",
      subtitle: "Book your dream car in minutes",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual slide navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center pt-16">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          {/* Hero Caption */}
          <div className="slide-content space-y-4">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  currentSlide === index
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-8 absolute"
                }`}
              >
                {currentSlide === index && (
                  <>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mt-4">
                      {slide.subtitle}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex items-center text-white">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>24/7 Customer Support</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex items-center text-white">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>Free Cancellation</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex items-center text-white">
              <Check className="h-5 w-5 text-primary mr-2" />
              <span>No Hidden Fees</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
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

        {/* Quick Booking Panel */}
        <div className="absolute -bottom-16 left-0 right-0 mx-auto w-full max-w-5xl px-4">
          <div className="glass-card rounded-xl shadow-lg p-6 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pick-up Location</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white/50 dark:bg-gray-800/50">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2" />
                  <select className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white">
                    <option>New York City</option>
                    <option>Los Angeles</option>
                    <option>Chicago</option>
                    <option>Miami</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Pick-up Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white/50 dark:bg-gray-800/50">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Return Date</label>
                <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white/50 dark:bg-gray-800/50">
                  <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                  <input 
                    type="date" 
                    className="bg-transparent w-full focus:outline-none text-gray-900 dark:text-white"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="px-6">
                Search Available Cars
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
