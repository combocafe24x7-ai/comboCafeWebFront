
import Image from 'next/image';
import React from 'react';

export default function FreeDeliveryPill() {
  return (
    <div className="relative aspect-[2.5/1] w-full overflow-hidden">
      <Image
        src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/hero%20images/ChatGPT%20Image%20Jan%2016,%202026,%2012_05_00%20AM.png"
        alt="Free delivery banner"
        layout="fill"
        objectFit="cover"
        priority
      />
    </div>
  );
}
