
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UploadCloud, X } from "lucide-react";
import { Label } from "./ui/label";

type ScreenshotUploadProps = {
  onFileSelect: (file: File | null) => void;
};

export function ScreenshotUpload({ onFileSelect }: ScreenshotUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full p-4 border-2 border-dashed rounded-lg text-center">
      {!preview ? (
        <>
          <Label htmlFor="screenshot-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <UploadCloud className="h-8 w-8" />
              <span className="font-semibold">Upload Payment Screenshot</span>
              <span className="text-xs">PNG, JPG, or WEBP</span>
            </div>
          </Label>
          <Input 
            id="screenshot-upload"
            type="file" 
            accept="image/png, image/jpeg, image/webp" 
            onChange={handleFileChange} 
            className="sr-only"
            ref={fileInputRef}
          />
        </>
      ) : (
        <div className="relative w-full max-w-xs mx-auto">
          <p className="font-semibold mb-2">Screenshot Preview:</p>
          <div className="relative aspect-video rounded-md overflow-hidden border">
            <Image src={preview} alt="Screenshot preview" layout="fill" objectFit="contain" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
