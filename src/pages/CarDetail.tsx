
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ChevronLeft, Users, Fuel, Settings, Gauge, Star, Check, Car, MapPin, IndianRupee } from "lucide-react";

// This would be fetched from Firestore in a real app
const DUMMY_CARS = [
  {
    id: "car1",
    name: "Swift Dzire",
    brand: "Maruti Suzuki",
    type: "Sedan",
    year: 2022,
    price: 1800,
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "22 km/l",
    images: [
      "https://images.unsplash.com/photo-1617469868774-53d637a4222e?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&q=80&w=2665&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Central Locking", "ABS", "Airbags", "FM Radio"],
    description: "The Maruti Suzuki Swift Dzire is a popular compact sedan known for its fuel efficiency and reliability. Perfect for city commutes and short trips.",
    available: true,
    reviews: [
      { id: "r1", user: "Rajesh", rating: 4.5, comment: "Great car for city driving, very fuel efficient", date: "2023-10-15" },
      { id: "r2", user: "Priya", rating: 5, comment: "Very comfortable and smooth ride", date: "2023-09-22" },
    ]
  },
  {
    id: "car2",
    name: "Creta",
    brand: "Hyundai",
    type: "SUV",
    year: 2023,
    price: 3200,
    seats: 5,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "18 km/l",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=2667&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2156&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=2526&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Sunroof", "Cruise Control", "Rear Camera", "ABS", "Airbags", "Touchscreen Infotainment"],
    description: "The Hyundai Creta is a popular compact SUV offering a comfortable ride, premium interiors, and modern features. Ideal for both city and highway journeys.",
    available: true,
    reviews: [
      { id: "r1", user: "Vikram", rating: 5, comment: "Best SUV in this price range, very comfortable for long drives", date: "2023-11-05" },
      { id: "r2", user: "Sneha", rating: 4, comment: "Good performance but mileage could be better", date: "2023-10-12" },
    ]
  },
  {
    id: "car3",
    name: "Innova Crysta",
    brand: "Toyota",
    type: "MPV",
    year: 2022,
    price: 4500,
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "14 km/l",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1609752348379-a57315e90c74?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Airbags", "ABS", "Rear AC Vents", "Captain Seats", "Parking Sensors"],
    description: "The Toyota Innova Crysta is a premium MPV with spacious interiors and comfortable seating for 7 passengers. Perfect for family trips and group travel.",
    available: true,
    reviews: [
      { id: "r1", user: "Anand", rating: 5, comment: "The best family car, extremely comfortable for long journeys", date: "2023-09-18" },
      { id: "r2", user: "Meera", rating: 4.5, comment: "Smooth ride and excellent build quality, slightly expensive though", date: "2023-08-27" },
    ]
  },
  {
    id: "car4",
    name: "i20",
    brand: "Hyundai",
    type: "Hatchback",
    year: 2023,
    price: 2000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "20 km/l",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1594199922592-91d42367347b?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Power Windows", "Central Locking", "ABS", "Airbags", "Touchscreen"],
    description: "The Hyundai i20 is a premium hatchback with stylish design and modern features. Great for city driving with its compact size and good fuel efficiency.",
    available: true,
    reviews: [
      { id: "r1", user: "Rahul", rating: 4, comment: "Great little car for city driving, good features for the price", date: "2023-10-02" },
      { id: "r2", user: "Nisha", rating: 4.5, comment: "Stylish design and comfortable interiors", date: "2023-09-15" },
    ]
  },
  {
    id: "car5",
    name: "Audi A4",
    brand: "Audi",
    type: "Luxury Sedan",
    year: 2023,
    price: 12000,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "12 km/l",
    images: [
      "https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&q=80&w=2664&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1549519220-f04950f60fe1?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1554424518-36782c35ad05?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Leather Seats", "Sunroof", "Premium Sound", "Advanced Driver Assistance", "Navigation", "Ambient Lighting"],
    description: "The Audi A4 is a luxury sedan offering premium features, sophisticated styling, and exceptional driving dynamics. Experience German engineering at its finest.",
    available: true,
    reviews: [
      { id: "r1", user: "Arjun", rating: 5, comment: "True luxury experience, worth every penny", date: "2023-11-10" },
      { id: "r2", user: "Kiran", rating: 5, comment: "Outstanding performance and features", date: "2023-10-25" },
    ]
  },
  {
    id: "car6",
    name: "Nexon",
    brand: "Tata",
    type: "Compact SUV",
    year: 2022,
    price: 2500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "17 km/l",
    images: [
      "https://images.unsplash.com/photo-1619405399517-a7a9a71b9e42?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1619405399517-a7a9a71b9e42?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Airbags", "ABS", "Touchscreen", "Reverse Camera"],
    description: "The Tata Nexon is a stylish compact SUV with excellent safety ratings and modern features. Ideal for urban driving with its compact dimensions and good ground clearance.",
    available: true,
    reviews: [
      { id: "r1", user: "Deepak", rating: 4.5, comment: "Great value for money, excellent safety features", date: "2023-09-28" },
      { id: "r2", user: "Anita", rating: 4, comment: "Good build quality and comfortable ride", date: "2023-08-15" },
    ]
  }
];

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    // In a real app, fetch car details from Firestore
    // Using dummy data for now
    setLoading(true);
    const foundCar = DUMMY_CARS.find(c => c.id === id);
    
    if (foundCar) {
      setCar(foundCar);
    } else {
      toast.error("Car not found");
      navigate("/cars");
    }
    
    setLoading(false);
  }, [id, navigate]);

  if (loading || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const averageRating = car.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (car.reviews?.length || 1);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            onClick={() => navigate("/cars")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Button>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Car Images */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <div className="relative h-80 md:h-96">
                  <img
                    src={car.images[activeImage]}
                    alt={car.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Car year badge */}
                  <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 font-medium">
                    {car.year}
                  </Badge>
                </div>
                
                {/* Thumbnail navigation */}
                {car.images.length > 1 && (
                  <div className="flex p-4 gap-2 overflow-x-auto">
                    {car.images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`flex-shrink-0 h-20 w-20 rounded-md overflow-hidden ${
                          activeImage === index ? "ring-2 ring-primary" : "opacity-70"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${car.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Car Details */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold">{car.brand} {car.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{car.type}</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <IndianRupee className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold">{car.price.toLocaleString()}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">/day</span>
                  </div>
                </div>
                
                {/* Car Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Users className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Seats</span>
                    <span className="font-medium">{car.seats}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Fuel className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Fuel</span>
                    <span className="font-medium">{car.fuel}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Settings className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <Gauge className="h-5 w-5 text-primary mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mileage</span>
                    <span className="font-medium">{car.mileage}</span>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">About this car</h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {car.description}
                  </p>
                </div>
                
                {/* Features */}
                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Features</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                    {car.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reviews */}
                {car.reviews && car.reviews.length > 0 && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex items-center mr-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(averageRating)
                                  ? "text-yellow-500 fill-yellow-500"
                                  : i < averageRating
                                  ? "text-yellow-500 fill-yellow-500 opacity-50"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          ({car.reviews.length} {car.reviews.length === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {car.reviews.map((review: any) => (
                        <div key={review.id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{review.user}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${
                                    i < review.rating
                                      ? "text-yellow-500 fill-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                          <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Booking Column */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <BookingForm carId={car.id} carName={`${car.brand} ${car.name}`} pricePerDay={car.price} />
                
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Available Pickup Locations</h3>
                  <div className="space-y-3">
                    {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"].map((location, index) => (
                      <div key={index} className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                        <div>
                          <p className="font-medium">{location}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            DriveEasy Center, {location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
