
"use client";
import { config } from '@/app/config';
import { Button } from '../ui/button';
import { ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function GiftFinder() {
  const { toast } = useToast();

  const handleFindGift = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "Our Gift Finder is being perfected and will be available shortly.",
    });
  };

  return (
    <div className="bg-card p-6 rounded-card shadow-card border border-primary-dark/10 h-full flex flex-col">
      <h3 className="text-xl font-semibold text-center">{config.giftFinder.title}</h3>
      <div className="mt-6 space-y-3 flex-grow">
        {config.giftFinder.options.map((option) => (
          <div key={option.type} onClick={handleFindGift} className="bg-background p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-accent transition-colors">
            <span className="font-sans font-semibold text-sm text-muted-foreground">{option.label}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        ))}
      </div>
      <Button onClick={handleFindGift} className="mt-6 w-full bg-primary hover:bg-primary-dark text-primary-foreground" size="lg" suppressHydrationWarning>
        {config.giftFinder.buttonText}
      </Button>
    </div>
  );
}
