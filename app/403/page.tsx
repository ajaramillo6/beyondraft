"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotAllowed: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center 
    text-center bg-neutral-100 dark:bg-neutral-950">
      <Image
        src="/elements3.svg"
        alt="No files"
        height={200}
        width={200}
        className="object-contain"
      />
      <h1 className="mt-6 text-3xl font-semibold text-gray-800 dark:text-gray-100">
        Page Not Available
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        The page you are looking for is not published.
      </p>
      <Link href="/" passHref>
        <Button className="mt-6 px-6 py-2 bg-blue-700 text-white 
        rounded-lg shadow-md hover:bg-blue-700">
          Go Home
        </Button>
      </Link>
    </div>
  );
};

export default NotAllowed;
