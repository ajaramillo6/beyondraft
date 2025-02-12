"use client";

import { ReactNode, Suspense } from "react";
import Image from "next/image";

export function Loader({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="flex flex-col gap-6 h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-5 items-center relative">
        <div className="absolute inset-0 bg-[url('/1.svg')] bg-cover bg-no-repeat opacity-50 animate-speed" />
        <Image
          className="animate-speed"
          src="/1.svg"
          alt="Beyondraft logo"
          height={150}
          width={150}
          priority
        />
        <span className="text-lg font-bold">Beyondraft</span>
      </div>
    </div>
  );
}
