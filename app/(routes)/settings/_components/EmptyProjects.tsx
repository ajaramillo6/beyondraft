import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const EmptyProjects = () => {
  return (
    <div className="flex flex-col items-center mt-28 mx-auto max-w-3xl text-center">
      {/* Header */}
      <h1 className="font-bold mb-5 text-lg">
        No Files Found
      </h1>

      {/* Image */}
      <Image
        src="/elements3.svg"
        alt="No files"
        height={200}
        width={200}
        className="object-contain"
      />

      {/* Redirect Button */}
      <Link href="/projects/create">
        <Button
          className="flex items-center gap-1 h-8 px-4 border border-gray-300 dark:border-gray-800 
                     hover:border-blue-700 dark:hover:border-blue-700 
                     bg-gray-200 dark:bg-gray-900 hover:bg-blue-700 dark:hover:bg-blue-700 
                     text-black hover:text-white dark:text-white"
        >
          Create First Project
        </Button>
      </Link>
    </div>
  );
};

export default EmptyProjects;
