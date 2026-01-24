import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Home, Building2, Check, X } from "lucide-react";
import { mockAddresses, Address } from "@/data/mockAccountData";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AccountAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    label: 'home',
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryInstructions: ''
  });

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      setFormData(address);
    } else {
      setEditingAddress(null);
      setFormData({
        label: 'home',
        fullName: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        deliveryInstructions: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveAddress = () => {
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addr, ...formData } as Address
          : addr
      ));
      toast.success("Address updated successfully");
    } else {
      const newAddress: Address = {
        id: `addr-${Date.now()}`,
        ...formData as Omit<Address, 'id' | 'isDefault'>,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddress]);
      toast.success("Address added successfully");
    }
    setIsModalOpen(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast.success("Address deleted");
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    toast.success("Default address updated");
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'home':
        return Home;
      case 'office':
        return Building2;
      default:
        return MapPin;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl">Saved Addresses</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary text-sm py-2 px-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-16 bg-secondary rounded-lg">
          <MapPin className="w-16 h-16 mx-auto text-muted-foreground/20 mb-4" />
          <h3 className="font-serif text-lg mb-2">No Saved Addresses</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add an address for faster checkout
          </p>
          <button onClick={() => handleOpenModal()} className="btn-outline">
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address, index) => {
            const LabelIcon = getLabelIcon(address.label);
            
            return (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-5 border rounded-lg ${
                  address.isDefault 
                    ? 'border-accent bg-accent/5' 
                    : 'border-border bg-background'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <LabelIcon className="w-4 h-4 text-accent" />
                    <span className="font-medium capitalize">{address.label}</span>
                    {address.isDefault && (
                      <Badge variant="secondary" className="text-xs bg-accent/20 text-accent">
                        Default
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenModal(address)}
                      className="p-2 hover:bg-secondary rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Address Details */}
                <div className="space-y-1 text-sm">
                  <p className="font-medium">{address.fullName}</p>
                  <p className="text-muted-foreground">{address.phone}</p>
                  <p className="text-muted-foreground">{address.address}</p>
                  <p className="text-muted-foreground">{address.city}, {address.postalCode}</p>
                  {address.deliveryInstructions && (
                    <p className="text-xs text-accent mt-2 italic">
                      "{address.deliveryInstructions}"
                    </p>
                  )}
                </div>

                {/* Set Default Button */}
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="mt-4 text-xs text-accent hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Set as Default
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Address Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingAddress ? 'Edit Address' : 'Add New Address'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Label Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Address Label</label>
              <div className="flex gap-2">
                {['home', 'office', 'other'].map((label) => (
                  <button
                    key={label}
                    onClick={() => setFormData({ ...formData, label: label as Address['label'] })}
                    className={`flex-1 py-2 px-4 text-sm rounded-md border transition-colors capitalize ${
                      formData.label === label
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border hover:bg-secondary'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.fullName || ''}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                placeholder="+880 1XXX-XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address *</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md resize-none"
                placeholder="House no, Road, Area"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                  placeholder="Dhaka"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Postal Code</label>
                <input
                  type="text"
                  value={formData.postalCode || ''}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                  placeholder="1212"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Delivery Instructions (Optional)</label>
              <input
                type="text"
                value={formData.deliveryInstructions || ''}
                onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent rounded-md"
                placeholder="Ring the doorbell, call before delivery, etc."
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
                onClick={handleSaveAddress}
                className="flex-1 btn-primary"
              >
                {editingAddress ? 'Save Changes' : 'Add Address'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountAddresses;
