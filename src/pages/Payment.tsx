import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Calendar, Tag, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const offer = location.state?.offer;
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!offer) {
    // No offer data, redirect to offers
    navigate("/offers");
    return null;
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast({
        title: "Payment Successful!",
        description: `You've booked ${offer.title}. Confirmation sent to your email.`,
      });
      // Redirect back to offers after a short delay
      setTimeout(() => navigate("/offers"), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Offers
            </Button>

            <div className="bg-card rounded-2xl p-8 border shadow-lg">
              <h1 className="text-2xl font-bold mb-6">Complete Your Booking</h1>

              {/* Offer Summary */}
              <div className="bg-muted/30 p-4 rounded-lg mb-8">
                <h2 className="font-semibold text-lg mb-2">{offer.title}</h2>
                <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" /> Code: {offer.code}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> Valid until {offer.validUntil}
                  </span>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card">Card Number</Label>
                  <Input
                    id="card"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                      maxLength={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      required
                      maxLength={3}
                      type="password"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" /> Pay Now
                    </span>
                  )}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-4">
                This is a demo – no real payment will be processed.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;