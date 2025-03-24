
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Car, Users, Fuel, Gauge, Settings, Filter, IndianRupee } from "lucide-react";
import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "sonner";

interface CarType {
  id: string;
  name: string;
  brand: string;
  type: string;
  year: number;
  price: number; // per day in INR
  seats: number;
  fuel: string;
  transmission: string;
  mileage: string;
  images: string[];
  features: string[];
  available: boolean;
}

const DUMMY_CARS: CarType[] = [
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
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Central Locking"],
    available: true
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
    ],
    features: ["AC", "Bluetooth", "Sunroof", "Cruise Control", "Rear Camera"],
    available: true
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
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Airbags", "ABS"],
    available: true
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
    ],
    features: ["AC", "Bluetooth", "Power Windows", "Central Locking"],
    available: true
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
    ],
    features: ["AC", "Bluetooth", "Leather Seats", "Sunroof", "Premium Sound"],
    available: true
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
    ],
    features: ["AC", "Bluetooth", "Power Steering", "Airbags"],
    available: true
  }
];

const Cars = () => {
  const [cars, setCars] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState<CarType[]>([]);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 15000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedFuel, setSelectedFuel] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("price-low");
  
  // Filter options
  const carTypes = ["Hatchback", "Sedan", "SUV", "MPV", "Compact SUV", "Luxury Sedan"];
  const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissionTypes = ["Manual", "Automatic"];
  const seatOptions = [5, 7];

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [cars, searchTerm, priceRange, selectedTypes, selectedTransmission, selectedFuel, selectedSeats, sortBy]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      // In a real app, this would fetch from Firestore
      // For now, using dummy data
      setCars(DUMMY_CARS);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...cars];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(car => 
        car.name.toLowerCase().includes(term) || 
        car.brand.toLowerCase().includes(term)
      );
    }

    // Apply price range filter
    result = result.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    // Apply car type filter
    if (selectedTypes.length > 0) {
      result = result.filter(car => selectedTypes.includes(car.type));
    }

    // Apply transmission filter
    if (selectedTransmission) {
      result = result.filter(car => car.transmission === selectedTransmission);
    }

    // Apply fuel type filter
    if (selectedFuel) {
      result = result.filter(car => car.fuel === selectedFuel);
    }

    // Apply seats filter
    if (selectedSeats) {
      result = result.filter(car => car.seats === selectedSeats);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.year - a.year);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredCars(result);
  };

  const handleTypeChange = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([500, 15000]);
    setSelectedTypes([]);
    setSelectedTransmission("");
    setSelectedFuel("");
    setSelectedSeats(null);
    setSortBy("price-low");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-8">Browse Our Cars</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by car or brand"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Price Range (₹ per day)</Label>
                  <Slider
                    defaultValue={[500, 15000]}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    min={500}
                    max={15000}
                    step={100}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Car Type */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Car Type</Label>
                  <div className="space-y-2">
                    {carTypes.map((type) => (
                      <div key={type} className="flex items-center">
                        <Checkbox
                          id={`type-${type}`}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => handleTypeChange(type)}
                        />
                        <Label htmlFor={`type-${type}`} className="ml-2 text-sm font-normal">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                {/* Transmission */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Transmission</Label>
                  <Select value={selectedTransmission} onValueChange={setSelectedTransmission}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Transmission" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Transmission</SelectItem>
                      {transmissionTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Fuel Type */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Fuel Type</Label>
                  <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Fuel Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Fuel Type</SelectItem>
                      {fuelTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Seats */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-2 block">Seats</Label>
                  <Select 
                    value={selectedSeats ? selectedSeats.toString() : ""} 
                    onValueChange={(value) => setSelectedSeats(value ? parseInt(value) : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Number of Seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Number of Seats</SelectItem>
                      {seatOptions.map((option) => (
                        <SelectItem key={option} value={option.toString()}>{option} Seats</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Car Listings */}
            <div className="lg:col-span-3">
              {/* Sort and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <p className="text-gray-600 dark:text-gray-400 mb-3 sm:mb-0">
                  {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"} found
                </p>
                
                <div className="flex items-center">
                  <Label htmlFor="sort" className="mr-2 text-sm">Sort by:</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort" className="w-[180px]">
                      <SelectValue placeholder="Price: Low to High" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Car Grid */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-pulse">Loading cars...</div>
                </div>
              ) : filteredCars.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <Car className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No Cars Found</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Try adjusting your filters to see more results.
                  </p>
                  <Button onClick={resetFilters} className="mt-4">
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCars.map((car) => (
                    <Card key={car.id} className="overflow-hidden transition-all hover:shadow-md">
                      <div className="relative h-48">
                        <img
                          src={car.images[0]}
                          alt={car.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {car.year}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold">{car.name}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{car.brand} • {car.type}</p>
                          </div>
                          <div className="flex items-center text-primary">
                            <IndianRupee className="h-4 w-4" />
                            <span className="font-semibold">{car.price}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">/day</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mt-4">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{car.seats} seats</span>
                          </div>
                          <div className="flex items-center">
                            <Fuel className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{car.fuel}</span>
                          </div>
                          <div className="flex items-center">
                            <Settings className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{car.transmission}</span>
                          </div>
                          <div className="flex items-center">
                            <Gauge className="h-4 w-4 text-gray-500 mr-2" />
                            <span className="text-sm">{car.mileage}</span>
                          </div>
                        </div>
                        
                        <Link to={`/cars/${car.id}`}>
                          <Button className="w-full mt-4">View Details</Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cars;
