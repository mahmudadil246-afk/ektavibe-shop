import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      toast.success("Order placed successfully! Thank you for shopping with ektA.");
      clearCart();
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="heading-section mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some items to your cart to checkout.</p>
          <Link to="/shop/all" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Progress */}
      <section className="border-b border-border">
        <div className="container-wide px-4 md:px-8 py-6">
          <div className="flex items-center justify-center gap-4 text-sm">
            {["Shipping", "Payment", "Review"].map((label, index) => (
              <div key={label} className="flex items-center gap-4">
                <button
                  onClick={() => setStep(index + 1)}
                  className={`flex items-center gap-2 ${
                    step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      step >= index + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
                {index < 2 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.form
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmit}
              >
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="heading-section mb-6">Shipping Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">District</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label className="block text-sm font-medium mb-2">Postal Code</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-secondary border-none px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="heading-section mb-6">Payment Method</h2>
                    <div className="space-y-4">
                      {["Cash on Delivery", "bKash", "Nagad", "Card Payment"].map((method) => (
                        <label
                          key={method}
                          className="flex items-center gap-4 p-4 border border-border cursor-pointer hover:border-accent transition-colors"
                        >
                          <input type="radio" name="payment" className="accent-accent" defaultChecked={method === "Cash on Delivery"} />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="heading-section mb-6">Review Order</h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={`${item.product.id}-${item.size}-${item.color}`}
                          className="flex gap-4 p-4 bg-secondary"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-20 h-24 object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium">{item.product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.size} / {item.color} × {item.quantity}
                            </p>
                            <p className="font-medium mt-2">
                              ৳{(item.product.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="btn-outline"
                    >
                      Back
                    </button>
                  )}
                  <button type="submit" className="btn-primary flex-1">
                    {step === 3 ? "Place Order" : "Continue"}
                  </button>
                </div>
              </motion.form>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-secondary p-6 sticky top-32">
                <h3 className="font-serif text-xl mb-6">Order Summary</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice >= 5000 ? "Free" : "৳100"}</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>৳{(totalPrice + (totalPrice >= 5000 ? 0 : 100)).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
