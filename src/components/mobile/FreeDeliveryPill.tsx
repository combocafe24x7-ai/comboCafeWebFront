
import Image from 'next/image';
import React from 'react';

export default function FreeDeliveryPill() {
  return (
    <div className="px-4">
      <div className="relative aspect-[350/65] w-full overflow-hidden rounded-lg">
        <Image
          src="https://gpfocwgfedokhmfsbcpy.supabase.co/storage/v1/object/public/asset/image%20(3).png"
          alt="Free delivery banner"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}
