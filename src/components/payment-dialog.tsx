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
import { ScreenshotUpload } from "./screenshot-upload";
import { useState } from "react";

type PaymentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function PaymentDialog({ isOpen, onClose, onConfirm }: PaymentDialogProps) {
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);

  const handleConfirm = () => {
    if (screenshotFile) {
      onConfirm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Scan the QR code to pay. Upload a screenshot to confirm your order.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
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
          
          <ScreenshotUpload onFileSelect={setScreenshotFile} />

          <p className="text-xs text-muted-foreground text-center">After paying, upload the screenshot and click below. You will be asked to send the screenshot in the WhatsApp chat.</p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            onClick={handleConfirm}
            disabled={!screenshotFile}
          >
            Place Order on WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
