
import { useState } from "react";
import { Link } from "react-router-dom";
import { Car, Users, Fuel, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CarCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  seats: number;
  transmission: "Automatic" | "Manual";
  fuelType: string;
  year: number;
  featured?: boolean;
}

const CarCard = ({
  id,
  name,
  image,
  price,
  category,
  seats,
  transmission,
  fuelType,
  year,
  featured,
}: CarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group rounded-xl overflow-hidden transition-all duration-300 glass-card ${
        featured ? "border-primary/30" : "border-gray-200 dark:border-gray-800"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative overflow-hidden h-48 md:h-52">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {featured && (
          <Badge className="absolute top-3 left-3 bg-primary/90 hover:bg-primary text-white">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/80 dark:bg-black/50">
            {category}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">${price}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 block">per day</span>
          </div>
        </div>

        {/* Car Specifications */}
        <div className="grid grid-cols-2 gap-3 py-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary/70" />
            {seats} Seats
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-2 text-primary/70" />
            {transmission}
          </div>
          <div className="flex items-center">
            <Fuel className="h-4 w-4 mr-2 text-primary/70" />
            {fuelType}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary/70" />
            {year}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center gap-2">
          <Link to={`/cars/${id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Link to={`/cars/${id}/book`} className="w-full">
            <Button className="w-full">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
