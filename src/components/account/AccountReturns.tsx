import { useState } from "react";
import { motion } from "framer-motion";
import { 
  RotateCcw, 
  Package, 
  CheckCircle, 
  Truck, 
  CreditCard,
  HelpCircle,
  ChevronRight,
  ImagePlus,
  Calendar,
  Clock
} from "lucide-react";
import { mockReturns, mockOrders, ReturnRequest } from "@/data/mockAccountData";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AccountReturns = () => {
  const [returns, setReturns] = useState<ReturnRequest[]>(mockReturns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [returnReason, setReturnReason] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const eligibleOrders = mockOrders.filter(o => 
    o.status === 'delivered' && 
    !returns.some(r => r.orderId === o.id)
  );

  const getStatusConfig = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'requested':
        return { color: 'bg-yellow-500/10 text-yellow-600', label: 'Requested', step: 1 };
      case 'approved':
        return { color: 'bg-blue-500/10 text-blue-600', label: 'Approved', step: 2 };
      case 'picked':
        return { color: 'bg-purple-500/10 text-purple-600', label: 'Picked Up', step: 3 };
      case 'received':
        return { color: 'bg-indigo-500/10 text-indigo-600', label: 'Received', step: 4 };
      case 'refunded':
        return { color: 'bg-green-500/10 text-green-600', label: 'Refunded', step: 5 };
      default:
        return { color: 'bg-muted text-muted-foreground', label: status, step: 0 };
    }
  };

  const statusSteps = [
    { key: 'requested', label: 'Requested', icon: Clock },
    { key: 'approved', label: 'Approved', icon: CheckCircle },
    { key: 'picked', label: 'Picked Up', icon: Truck },
    { key: 'received', label: 'Received', icon: Package },
    { key: 'refunded', label: 'Refunded', icon: CreditCard },
  ];

  const returnReasons = [
    'Size too small',
    'Size too large',
    'Color different from image',
    'Product damaged',
    'Wrong product received',
    'Quality not as expected',
    'Changed my mind',
    'Other'
  ];

  const handleRequestReturn = () => {
    if (!selectedOrderId || !returnReason || !pickupDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const order = mockOrders.find(o => o.id === selectedOrderId);
    if (!order) return;

    const newReturn: ReturnRequest = {
      id: `RET-${Date.now()}`,
      orderId: selectedOrderId,
      productName: order.items[0].name,
      productImage: order.items[0].image,
      reason: returnReason,
      status: 'requested',
      requestDate: new Date().toISOString().split('T')[0]
    };

    setReturns([newReturn, ...returns]);
    setIsModalOpen(false);
    setSelectedOrderId('');
    setReturnReason('');
    setPickupDate('');
    toast.success("Return request submitted successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">Returns & Refunds</h2>
        {eligibleOrders.length > 0 && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-sm py-2 px-4"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Request Return
          </button>
        )}
      </div>

      {returns.length === 0 ? (
        <div className="text-center py-16 bg-secondary rounded-lg">
          <RotateCcw className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
          <h3 className="font-serif text-lg mb-2">No Return Requests</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't requested any returns yet
          </p>
          {eligibleOrders.length > 0 && (
            <button onClick={() => setIsModalOpen(true)} className="btn-outline">
              Request a Return
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {returns.map((returnReq, index) => {
            const statusConfig = getStatusConfig(returnReq.status);

            return (
              <motion.div
                key={returnReq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background border border-border rounded-lg p-5"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 bg-muted rounded overflow-hidden">
                      <img 
                        src={returnReq.productImage} 
                        alt={returnReq.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{returnReq.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        Order: {returnReq.orderId}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Requested: {returnReq.requestDate}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${statusConfig.color} border-none`}>
                    {statusConfig.label}
                  </Badge>
                </div>

                {/* Reason */}
                <div className="mb-4 p-3 bg-secondary rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Reason:</span> {returnReq.reason}
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, idx) => {
                      const isCompleted = statusSteps.findIndex(s => s.key === returnReq.status) >= idx;
                      const isCurrent = step.key === returnReq.status;

                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1">
                          <div className="flex items-center w-full">
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isCompleted 
                                  ? 'bg-accent text-accent-foreground' 
                                  : 'bg-muted text-muted-foreground'
                              }`}
                            >
                              <step.icon className="w-4 h-4" />
                            </div>
                            {idx < statusSteps.length - 1 && (
                              <div 
                                className={`flex-1 h-0.5 ${
                                  isCompleted && !isCurrent ? 'bg-accent' : 'bg-muted'
                                }`}
                              />
                            )}
                          </div>
                          <span className={`text-xs mt-1 ${
                            isCompleted ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Refund Details */}
                {returnReq.status === 'refunded' && (
                  <div className="p-4 bg-green-500/10 rounded-lg space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Refund Amount</span>
                      <span className="font-medium text-green-600">৳{returnReq.refundAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Refund Method</span>
                      <span>{returnReq.refundMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID</span>
                      <span className="font-mono text-xs">{returnReq.transactionId}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 bg-secondary rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-accent" />
            <div>
              <p className="font-medium text-sm">Need Help with Returns?</p>
              <p className="text-xs text-muted-foreground">
                Contact our support team for assistance
              </p>
            </div>
          </div>
          <button className="btn-outline text-sm py-2 px-4 flex items-center gap-2">
            Contact Support <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Request Return Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Request Return</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Order *</label>
              <select
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
              >
                <option value="">Choose an order...</option>
                {eligibleOrders.map(order => (
                  <option key={order.id} value={order.id}>
                    {order.id} - {order.items[0].name} (৳{order.total})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Reason for Return *</label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
              >
                <option value="">Select a reason...</option>
                {returnReasons.map(reason => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Images (Optional)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer">
                <ImagePlus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Preferred Pickup Date *
              </label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestReturn}
                className="flex-1 btn-primary"
              >
                Submit Request
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountReturns;
