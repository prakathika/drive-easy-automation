
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Shield, Clock, Trophy, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="py-12 md:py-16 text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              About DriveEasy
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg">
              India's premier car rental service, making travel simple, accessible, and enjoyable for everyone.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="py-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Our Story</h2>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Founded in 2018 in Mumbai, DriveEasy began with a simple mission: to transform car rentals in India by combining affordability with exceptional service. We started with just 15 cars and a passionate team of 5 people.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Today, we've grown to serve over 25 cities across India with a fleet of 1,200+ vehicles ranging from economy cars to luxury sedans. Our success comes from our customer-first approach and our commitment to innovation in the car rental industry.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                At DriveEasy, we understand that a car rental is more than just transportation – it's an essential part of your journey, whether for business or leisure. That's why we continuously strive to provide reliable, convenient, and personalized car rental experiences that exceed expectations.
              </p>
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-center mb-12">Why Choose DriveEasy</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Premium Fleet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We maintain a diverse range of well-serviced, clean vehicles to meet every need and budget.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our customer service team is available around the clock to assist with any inquiries or concerns.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Safety First</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All our vehicles undergo rigorous safety checks and are fully insured for your peace of mind.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our streamlined booking process makes renting a car simple and hassle-free.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  No hidden fees or charges - what you see is what you pay.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Local Expertise</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team knows India inside out, providing invaluable local knowledge for travelers.
                </p>
              </div>
            </div>
          </div>
          
          {/* Our Numbers */}
          <div className="py-12">
            <h2 className="text-2xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                <p className="text-gray-600 dark:text-gray-400">Cities Served</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">1,200+</div>
                <p className="text-gray-600 dark:text-gray-400">Vehicles</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">150,000+</div>
                <p className="text-gray-600 dark:text-gray-400">Happy Customers</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
                <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
                <p className="text-gray-600 dark:text-gray-400">Customer Rating</p>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="py-12">
            <div className="bg-gradient-to-r from-primary/80 to-blue-600/80 p-8 md:p-12 rounded-xl text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Experience the DriveEasy Difference?</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                Whether you're planning a business trip or a family vacation, we have the perfect car for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/cars">
                  <Button variant="secondary" size="lg">Browse Cars</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
