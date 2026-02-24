import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface SuggestPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuggestPlaceModal = ({ isOpen, onClose }: SuggestPlaceModalProps) => {
  const [placeName, setPlaceName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Thanks for your suggestion!',
      description: 'Our team will review your hidden gem and get back to you soon.',
    });
    setPlaceName('');
    setLocation('');
    setDescription('');
    setReason('');
    setImageUrl('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div 
              className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl font-bold">Suggest a Hidden Gem</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="placeName">Place Name *</Label>
                    <Input
                      id="placeName"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      placeholder="e.g., Secret Waterfall"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="What makes this place special?"
                      required
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Why is it a hidden gem? *</Label>
                    <Textarea
                      id="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="Tell us why it's not overcrowded and worth visiting"
                      required
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL (optional)</Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Suggestion
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SuggestPlaceModal;