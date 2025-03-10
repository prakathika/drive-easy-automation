
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DateRangePicker from "./DateRangePicker";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { CreditCard, Calendar, Car } from "lucide-react";

interface BookingFormProps {
  carId: string;
  carName: string;
  pricePerDay: number;
  carImage: string;
}

const BookingForm = ({ carId, carName, pricePerDay, carImage }: BookingFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [additionalServices, setAdditionalServices] = useState({
    insurance: false,
    extraDriver: false,
    childSeat: false,
    gps: false,
  });

  // Calculate rental duration and total price
  const calculateDuration = () => {
    if (dateRange.from && dateRange.to) {
      const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays === 0 ? 1 : diffDays;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const duration = calculateDuration();
    let total = pricePerDay * duration;
    
    // Add additional services
    if (additionalServices.insurance) total += 15 * duration;
    if (additionalServices.extraDriver) total += 10 * duration;
    if (additionalServices.childSeat) total += 5 * duration;
    if (additionalServices.gps) total += 7 * duration;
    
    return total;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to book a car");
      navigate("/login", { state: { from: `/cars/${carId}/book` } });
      return;
    }
    
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select rental dates");
      return;
    }

    try {
      setLoading(true);
      
      const bookingData = {
        carId,
        carName,
        carImage,
        userId: user.uid,
        userEmail: user.email,
        startDate: dateRange.from,
        endDate: dateRange.to,
        duration: calculateDuration(),
        pricePerDay,
        totalAmount: calculateTotalPrice(),
        additionalServices,
        status: "pending",
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      
      toast.success("Booking submitted successfully!");
      navigate("/dashboard", { state: { bookingId: docRef.id } });
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (service: keyof typeof additionalServices) => {
    setAdditionalServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Booking Details</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Select your rental period and options
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Rental Period</Label>
            <DateRangePicker 
              onChange={setDateRange} 
              initialDateRange={dateRange}
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h4 className="text-sm font-medium mb-3">Additional Services</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="insurance"
                  checked={additionalServices.insurance}
                  onChange={() => handleServiceChange("insurance")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="insurance" className="text-sm font-medium">Insurance</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$15/day</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="extra-driver"
                  checked={additionalServices.extraDriver}
                  onChange={() => handleServiceChange("extraDriver")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="extra-driver" className="text-sm font-medium">Additional Driver</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$10/day</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="child-seat"
                  checked={additionalServices.childSeat}
                  onChange={() => handleServiceChange("childSeat")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="child-seat" className="text-sm font-medium">Child Seat</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$5/day</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="gps"
                  checked={additionalServices.gps}
                  onChange={() => handleServiceChange("gps")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="gps" className="text-sm font-medium">GPS Navigation</Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">$7/day</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Base price (${pricePerDay}/day)</span>
              <span>${pricePerDay * calculateDuration()}</span>
            </div>
            {additionalServices.insurance && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Insurance (${15}/day)</span>
                <span>${15 * calculateDuration()}</span>
              </div>
            )}
            {additionalServices.extraDriver && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Additional Driver (${10}/day)</span>
                <span>${10 * calculateDuration()}</span>
              </div>
            )}
            {additionalServices.childSeat && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Child Seat (${5}/day)</span>
                <span>${5 * calculateDuration()}</span>
              </div>
            )}
            {additionalServices.gps && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">GPS Navigation (${7}/day)</span>
                <span>${7 * calculateDuration()}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 text-base font-semibold">
              <span>Total</span>
              <span className="text-primary">${calculateTotalPrice()}</span>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || !dateRange.from || !dateRange.to}
        >
          {loading ? (
            <span className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </span>
          ) : (
            "Complete Booking"
          )}
        </Button>
        
        <div className="pt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-2 text-primary/70" />
            <span>Free cancellation up to 24 hours before pick-up</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CreditCard className="h-4 w-4 mr-2 text-primary/70" />
            <span>No credit card fees</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Car className="h-4 w-4 mr-2 text-primary/70" />
            <span>Unlimited mileage included</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
