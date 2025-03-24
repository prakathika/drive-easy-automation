
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { toast } from "sonner";
import { db } from "@/firebase/config";
import { collection, query, where, getDocs, orderBy, updateDoc, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { Car, Calendar, MapPin, IndianRupee, CheckCircle, XCircle, Clock } from "lucide-react";

interface Booking {
  id: string;
  carId: string;
  carName: string;
  pickupDate: Timestamp | Date;
  returnDate: Timestamp | Date;
  location: string;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: Timestamp | Date;
  userId: string;
  userEmail: string;
  userName?: string;
  currency?: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      fetchBookings();
    }
  }, [user, authLoading, navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookingsRef = collection(db, "bookings");
      const q = query(
        bookingsRef,
        where("userId", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      
      const fetchedBookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        fetchedBookings.push({
          id: doc.id,
          ...doc.data()
        } as Booking);
      });
      
      console.log("Fetched bookings:", fetchedBookings);
      setBookings(fetchedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      if (!window.confirm("Are you sure you want to cancel this booking?")) {
        return;
      }
      
      await updateDoc(doc(db, "bookings", bookingId), {
        status: "cancelled"
      });
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: "cancelled" } : booking
      ));
      
      toast.success("Booking cancelled successfully");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-green-600 bg-green-100 dark:bg-green-900/20";
      case "completed": return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
      case "cancelled": return "text-red-600 bg-red-100 dark:bg-red-900/20";
      default: return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "cancelled": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Timestamp | Date) => {
    if (date instanceof Timestamp) {
      return format(date.toDate(), "dd MMM yyyy");
    } else if (date instanceof Date) {
      return format(date, "dd MMM yyyy");
    }
    return "Invalid date";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-24 pb-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Welcome back, {user?.displayName || user?.email}
          </p>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-6">
              {renderBookingsList(bookings, loading)}
            </TabsContent>
            
            <TabsContent value="active" className="mt-6">
              {renderBookingsList(
                bookings.filter(b => b.status === "pending" || b.status === "confirmed"),
                loading
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              {renderBookingsList(
                bookings.filter(b => b.status === "completed"),
                loading
              )}
            </TabsContent>
            
            <TabsContent value="cancelled" className="mt-6">
              {renderBookingsList(
                bookings.filter(b => b.status === "cancelled"),
                loading
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );

  function renderBookingsList(bookingsList: Booking[], isLoading: boolean) {
    if (isLoading) {
      return (
        <div className="flex justify-center p-8">
          <div className="animate-pulse">Loading your bookings...</div>
        </div>
      );
    }
    
    if (bookingsList.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-6">You don't have any bookings in this category yet.</p>
          <Button onClick={() => navigate("/cars")}>Browse Cars</Button>
        </div>
      );
    }
    
    return (
      <div className="grid gap-6">
        {bookingsList.map((booking) => (
          <Card key={booking.id} className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Car className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{booking.carName}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Pickup Date</p>
                      <p>{booking.pickupDate ? formatDate(booking.pickupDate) : "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Return Date</p>
                      <p>{booking.returnDate ? formatDate(booking.returnDate) : "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{booking.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">Total Price</p>
                      <p>₹{booking.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {booking.createdAt && formatDate(booking.createdAt)}
                  </p>
                </div>
                
                {(booking.status === "pending" || booking.status === "confirmed") && (
                  <Button 
                    variant="destructive" 
                    className="mt-4"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                )}
                
                {booking.status === "completed" && (
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate(`/cars/${booking.carId}`)}
                  >
                    Book Again
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};

export default Dashboard;
