
"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

type PaymentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transactionId: string) => void;
};

export function PaymentDialog({ isOpen, onClose, onConfirm }: PaymentDialogProps) {
  const [transactionId, setTransactionId] = useState("");

  const handleConfirm = () => {
    if (transactionId.trim()) {
      onConfirm(transactionId.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Scan the QR code, then enter the Transaction ID below to confirm your order.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="overflow-y-auto">
          <div className="flex flex-col items-center gap-6 p-6">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56">
              <Image
                src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/qr/WhatsApp%20Image%202026-01-09%20at%2010.03.14.jpeg"
                alt="Payment QR Code"
                fill
                className="object-contain rounded-md border"
              />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-foreground">Scan and pay using any UPI app.</p>
              <Badge variant="destructive" className="mt-2">Payment is mandatory</Badge>
            </div>
            
            <div className="w-full space-y-2">
                <Label htmlFor="transactionId" className="font-semibold">Enter Transaction ID</Label>
                <Input 
                    id="transactionId"
                    placeholder="e.g. T1234567890"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                />
            </div>

            <p className="text-xs text-muted-foreground text-center">After paying, enter the transaction ID from your UPI app and click below to place your order on WhatsApp.</p>
          </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-0 border-t">
          <Button
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handleConfirm}
            disabled={!transactionId.trim()}
          >
            Place Order on WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
