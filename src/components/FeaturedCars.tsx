
import { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import CarCard from "./CarCard";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedCars = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const q = query(
          collection(db, "cars"),
          where("featured", "==", true),
          limit(4)
        );
        
        const querySnapshot = await getDocs(q);
        const carsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setCars(carsData);
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCars();
  }, []);

  // Fallback data if no featured cars are available in Firestore
  const fallbackCars = [
    {
      id: "1",
      name: "Tesla Model 3",
      image: "https://images.unsplash.com/photo-1561580125-028ee3bd62eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 89,
      category: "Electric",
      seats: 5,
      transmission: "Automatic",
      fuelType: "Electric",
      year: 2023,
      featured: true
    },
    {
      id: "2",
      name: "BMW X5",
      image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 110,
      category: "SUV",
      seats: 5,
      transmission: "Automatic",
      fuelType: "Gasoline",
      year: 2022,
      featured: true
    },
    {
      id: "3",
      name: "Mercedes-Benz E-Class",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 120,
      category: "Luxury",
      seats: 5,
      transmission: "Automatic",
      fuelType: "Diesel",
      year: 2023,
      featured: true
    },
    {
      id: "4",
      name: "Porsche 911",
      image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      price: 199,
      category: "Sports",
      seats: 2,
      transmission: "Automatic",
      fuelType: "Gasoline",
      year: 2021,
      featured: true
    }
  ];

  const displayCars = cars.length > 0 ? cars : fallbackCars;

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Vehicles</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our handpicked selection of premium vehicles that provide the perfect 
            balance of comfort, style, and performance.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCars.map((car) => (
              <CarCard 
                key={car.id}
                id={car.id}
                name={car.name}
                image={car.image}
                price={car.price}
                category={car.category}
                seats={car.seats}
                transmission={car.transmission}
                fuelType={car.fuelType}
                year={car.year}
                featured={car.featured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
