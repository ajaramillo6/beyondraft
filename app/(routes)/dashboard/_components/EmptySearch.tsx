import Image from "next/image";
import React from "react";

interface EmptySearchProps {
  query: {
    search?: string;
    archive?: string;
  };
}

const EmptySearch = ({ query }: EmptySearchProps) => {
  return (
    <div className="flex flex-col items-center mt-28 mx-auto max-w-3xl text-center">
      {/* Header */}
      <h1 className="font-bold mb-5 text-lg">
        Sorry, we couldn't find any results
      </h1>

      {/* Image */}
      <Image
        src="/elements3.svg"
        alt="No files"
        height={200}
        width={200}
        className="object-contain"
      />

      {/* Searched Term */}
      <p className="font-bold">"{query.search}"</p>

      {/* Suggestion */}
      <p className="mx-auto mt-4 text-sm text-gray-400">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
