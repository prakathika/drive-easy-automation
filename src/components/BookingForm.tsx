
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "./DateRangePicker";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { db } from "@/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { DateRange } from "react-day-picker";

const BookingForm = ({ carId, carName, pricePerDay }: { carId: string; carName: string; pricePerDay: number }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [location, setLocation] = useState("Mumbai");
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(pricePerDay);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Calculate total days and price whenever date range changes
  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalDays(diffDays || 1);
      setTotalPrice(diffDays * pricePerDay || pricePerDay);
    }
  }, [dateRange, pricePerDay]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please sign in to book a car");
      navigate("/login", { state: { from: `/cars/${carId}` } });
      return;
    }

    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select pickup and return dates");
      return;
    }

    try {
      setLoading(true);
      
      const bookingData = {
        carId,
        carName,
        userId: user.uid,
        userEmail: user.email,
        pickupDate: dateRange.from,
        returnDate: dateRange.to,
        location,
        totalDays,
        totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "bookings"), bookingData);
      
      toast.success("Booking successful! Check your dashboard for details.");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const indianLocations = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow"
  ];

  return (
    <Card className="p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book This Car</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="dates">Rental Period</Label>
          <DateRangePicker 
            value={dateRange}
            onChange={setDateRange} 
            className="mt-2"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Pickup Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location" className="mt-2">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {indianLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Price per day</span>
          <span>₹{pricePerDay.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total days</span>
          <span>{totalDays}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total Price</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>
      
      <Button 
        className="w-full mt-6" 
        onClick={handleBooking}
        disabled={loading || !dateRange?.from || !dateRange?.to}
      >
        {loading ? "Processing..." : "Book Now"}
      </Button>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        No payment will be charged now. Pay at the rental location.
      </p>
    </Card>
  );
};

export default BookingForm;
