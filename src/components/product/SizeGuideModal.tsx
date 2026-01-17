import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ruler } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: "women" | "men" | "baby";
}

const SizeGuideModal = ({ isOpen, onClose, category }: SizeGuideModalProps) => {
  const [activeCategory, setActiveCategory] = useState<"women" | "men" | "baby">(category);

  const categories = [
    { id: "women" as const, label: "Women" },
    { id: "men" as const, label: "Men" },
    { id: "baby" as const, label: "Baby" },
  ];

  const sizeData = {
    women: {
      title: "Women's Size Guide",
      description: "All measurements are in centimeters (cm). For the best fit, measure over underwear.",
      headers: ["Size", "UK", "US", "Bust", "Waist", "Hips"],
      rows: [
        ["XS", "6", "2", "80-84", "60-64", "86-90"],
        ["S", "8", "4", "84-88", "64-68", "90-94"],
        ["M", "10", "6", "88-92", "68-72", "94-98"],
        ["L", "12", "8", "92-96", "72-76", "98-102"],
        ["XL", "14", "10", "96-100", "76-80", "102-106"],
      ],
      tips: [
        { label: "Bust", instruction: "Measure around the fullest part of your bust, keeping the tape horizontal." },
        { label: "Waist", instruction: "Measure around your natural waistline, the narrowest part of your torso." },
        { label: "Hips", instruction: "Measure around the fullest part of your hips, about 20cm below your waist." },
      ],
    },
    men: {
      title: "Men's Size Guide",
      description: "All measurements are in centimeters (cm). For shirts, measure over a light t-shirt.",
      headers: ["Size", "UK/US", "EU", "Chest", "Waist", "Collar"],
      rows: [
        ["S", "36", "46", "91-96", "76-81", "37-38"],
        ["M", "38", "48", "96-101", "81-86", "39-40"],
        ["L", "40", "50", "101-106", "86-91", "41-42"],
        ["XL", "42", "52", "106-111", "91-96", "43-44"],
        ["XXL", "44", "54", "111-116", "96-101", "45-46"],
      ],
      tips: [
        { label: "Chest", instruction: "Measure around the fullest part of your chest, under your arms." },
        { label: "Waist", instruction: "Measure around your waist at the level where you wear your trousers." },
        { label: "Collar", instruction: "Measure around the base of your neck, adding 1-2cm for comfort." },
      ],
    },
    baby: {
      title: "Baby Size Guide",
      description: "Sizes are based on age ranges. Height and weight are approximate guidelines.",
      headers: ["Size", "Age", "Height (cm)", "Weight (kg)", "Chest", "Waist"],
      rows: [
        ["0-3M", "0-3 months", "56-62", "3.5-6", "40-44", "40-44"],
        ["3-6M", "3-6 months", "62-68", "6-8", "44-46", "44-46"],
        ["6-12M", "6-12 months", "68-76", "8-10", "46-48", "46-48"],
        ["12-18M", "12-18 months", "76-83", "10-12", "48-50", "48-50"],
        ["18-24M", "18-24 months", "83-92", "12-14", "50-52", "50-52"],
      ],
      tips: [
        { label: "Height", instruction: "Measure your baby from head to toe while they lie flat." },
        { label: "Chest", instruction: "Measure around the fullest part of your baby's chest." },
        { label: "Tip", instruction: "If between sizes, we recommend sizing up for comfort and growth room." },
      ],
    },
  };

  const currentData = sizeData[activeCategory];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-background">
        <div className="sticky top-0 bg-background z-10 border-b border-border">
          <div className="flex items-center justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-full">
                <Ruler className="w-5 h-5 text-accent" />
              </div>
              <h2 className="font-serif text-xl">{currentData.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1 px-6 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-muted"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <p className="text-muted-foreground mb-6">{currentData.description}</p>

            {/* Size Chart Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary">
                    {currentData.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-3 text-left font-medium first:rounded-tl last:rounded-tr"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.rows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`border-b border-border ${
                        rowIndex % 2 === 0 ? "bg-background" : "bg-secondary/30"
                      }`}
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`px-4 py-3 ${cellIndex === 0 ? "font-medium" : ""}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="bg-secondary p-6 rounded-sm">
              <h3 className="font-serif text-lg mb-4">How to Measure</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentData.tips.map((tip, index) => (
                  <div key={index} className="bg-background p-4">
                    <h4 className="font-medium text-accent mb-2">{tip.label}</h4>
                    <p className="text-sm text-muted-foreground">{tip.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 border border-border bg-muted/30">
              <h4 className="font-medium mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                If you're between sizes or unsure about your measurements, our customer service team 
                is happy to help. Contact us at{" "}
                <a href="mailto:support@ekta.com" className="text-accent link-underline">
                  support@ekta.com
                </a>{" "}
                or call us at <span className="text-accent">+880 1234 567890</span>.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
